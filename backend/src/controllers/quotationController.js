const QuoteRequest = require('../models/QuoteRequest');
const Quotation = require('../models/Quotation');
const Project = require('../models/Project');
const Workshop = require('../models/Workshop');

const DEFAULT_15_STAGES = [
  'Order & Specification Confirmation',
  'Chassis Receiving',
  'Chassis Inspection',
  'Design & Engineering Approval',
  'Material Procurement',
  'Frame Fabrication',
  'Sheet Metal Paneling',
  'Doors & Windows Fitment',
  'Anti-Corrosion Primer & Painting',
  'Electrical Installation',
  'Interior & Seating Fitment',
  'Safety & Quality Inspection',
  'Road Testing & Trial',
  'Final Approval & RTO Clearance',
  'Vehicle Handover & Delivery',
];

// @desc    Submit Customer RFQ
// @route   POST /api/quotations/rfq
// @access  Private (Customer / Admin)
const createQuoteRequest = async (req, res, next) => {
  try {
    const { targetWorkshops, configuration, targetBudgetINR, customerNotes } = req.body;

    const rfqNumber = `RFQ-TN-2026-${Math.floor(100 + Math.random() * 900)}`;

    const rfq = await QuoteRequest.create({
      rfqNumber,
      customerId: req.user.id,
      customerName: req.user.name,
      customerPhone: req.user.phone,
      customerEmail: req.user.email,
      customerCompany: req.user.companyName || '',
      targetWorkshops,
      configuration,
      targetBudgetINR,
      customerNotes: customerNotes || '',
      status: 'Submitted',
    });

    // Automatically generate initial indicative quotations from selected workshops
    const generatedQuotes = [];
    for (const wsId of targetWorkshops) {
      const ws = await Workshop.findById(wsId);
      if (ws) {
        const est = configuration.costBreakdown || {
          baseFabricationINR: 650000,
          structuralMaterialsINR: 280000,
          panelingAndFinishINR: 190000,
          interiorAndSeatingINR: 320000,
          electricalAndAmenitiesINR: 140000,
          labourChargesINR: 180000,
          taxGST18INR: 316800,
          totalEstimatedINR: 2076800,
        };

        const discountINR = 35000;
        const finalPriceINR = est.totalEstimatedINR - discountINR;

        const quote = await Quotation.create({
          quoteNumber: `QT-${ws.district.slice(0, 3).toUpperCase()}-2026-${Math.floor(100 + Math.random() * 900)}`,
          quoteRequestId: rfq._id,
          workshopId: ws._id,
          workshopName: ws.name,
          workshopDistrict: ws.district,
          customerId: req.user.id,
          customerName: req.user.name,
          customerPhone: req.user.phone,
          customerCompany: req.user.companyName || '',
          configuration,
          status: 'Quotation Sent',
          baseBodyPriceINR: est.baseFabricationINR,
          materialsPriceINR: est.structuralMaterialsINR,
          interiorSeatsPriceINR: est.interiorAndSeatingINR || 0,
          electricalPaintPriceINR: (est.panelingAndFinishINR || 0) + (est.electricalAndAmenitiesINR || 0),
          labourPriceINR: est.labourChargesINR,
          discountINR,
          taxGST18INR: est.taxGST18INR,
          finalPriceINR,
          estimatedDeliveryWeeks: ws.leadTimeWeeks || 6,
          warrantyMonths: ws.warrantyMonths || 24,
          validityDays: 30,
          validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          inclusions: [
            'AIS-052 Code of Practice compliant structure',
            'Certified Tata / Jindal high-tensile steel frame',
            'Automotive 2K polyurethane baked paint finish',
          ],
          exclusions: [
            'Chassis procurement ex-showroom invoice',
            'RTO registration and local road taxes',
          ],
          workshopNotes: `Official proposal prepared by ${ws.name}. CAD designs available on request.`,
        });
        generatedQuotes.push(quote);
      }
    }

    res.status(201).json({
      success: true,
      data: {
        rfq,
        quotations: generatedQuotes,
      },
      message: 'RFQ submitted and quotations generated.',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's quotations
// @route   GET /api/quotations
// @access  Private
const getQuotations = async (req, res, next) => {
  try {
    let query = {};
    if (req.user.role === 'CUSTOMER') {
      query.customerId = req.user.id;
    } else if (req.user.role === 'WORKSHOP_OWNER' && req.user.workshopId) {
      query.workshopId = req.user.workshopId;
    }

    const quotations = await Quotation.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: quotations.length,
      data: quotations,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Accept Quotation and launch manufacturing project
// @route   POST /api/quotations/:id/accept
// @access  Private (Customer / Admin)
const acceptQuotationAndLaunchProject = async (req, res, next) => {
  try {
    const quotation = await Quotation.findById(req.params.id);
    if (!quotation) {
      return res.status(404).json({
        success: false,
        message: 'Quotation not found.',
      });
    }

    quotation.status = 'Accepted';
    await quotation.save();

    await QuoteRequest.findByIdAndUpdate(quotation.quoteRequestId, { status: 'Accepted' });

    // Generate 15 manufacturing stages
    const stages = DEFAULT_15_STAGES.map((name, idx) => ({
      stageNumber: idx + 1,
      name,
      status: idx === 0 ? 'in-progress' : 'pending',
      completionPercentage: idx === 0 ? 50 : 0,
      startDate: idx === 0 ? new Date().toISOString().split('T')[0] : null,
      assignedStaff: `Er. In-Charge (${quotation.workshopName})`,
      photos: [],
    }));

    const finalAmount = quotation.finalPriceINR;

    const project = await Project.create({
      projectCode: `BC-TN-2026-${Math.floor(10 + Math.random() * 90)}`,
      quotationId: quotation._id,
      workshopId: quotation.workshopId,
      workshopName: quotation.workshopName,
      customerId: quotation.customerId,
      customerName: quotation.customerName,
      customerPhone: quotation.customerPhone,
      vehicleTitle: quotation.configuration.title || 'Commercial Build Order',
      domain: quotation.configuration.domain || 'Bus',
      category: quotation.configuration.category || 'Tourist & Luxury Coach',
      chassisBrandModel: `${quotation.configuration.chassis?.brand || 'Ashok Leyland'} ${quotation.configuration.chassis?.model || '12M Viking'}`,
      chassisVin: `TN2026${Math.floor(10000000 + Math.random() * 90000000)}`,
      currentStageIndex: 0,
      overallProgressPercentage: 5,
      stages,
      startDate: new Date().toISOString().split('T')[0],
      targetDeliveryDate: new Date(Date.now() + quotation.estimatedDeliveryWeeks * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      contractAmountINR: finalAmount,
      paymentMilestones: [
        { title: 'Chassis Inward & Advance Booking (25%)', percentage: 25, amountINR: Math.round(finalAmount * 0.25), status: 'Paid', paidDate: new Date().toISOString().split('T')[0] },
        { title: 'Frame Skeleton Inspection (35%)', percentage: 35, amountINR: Math.round(finalAmount * 0.35), status: 'Pending' },
        { title: 'Paneling & Paint Booth Inflow (20%)', percentage: 20, amountINR: Math.round(finalAmount * 0.20), status: 'Pending' },
        { title: 'Final Handover & RTO Trial (20%)', percentage: 20, amountINR: Math.round(finalAmount * 0.20), status: 'Pending' },
      ],
    });

    res.status(200).json({
      success: true,
      data: {
        quotation,
        project,
      },
      message: 'Quotation accepted and factory manufacturing project launched successfully!',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createQuoteRequest,
  getQuotations,
  acceptQuotationAndLaunchProject,
};
