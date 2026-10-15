import { ConfigurationState } from '../types';

export interface BudgetOptimizationSuggestion {
  id: string;
  title: string;
  description: string;
  savingsINR: number;
  category: 'Seats' | 'Materials' | 'Windows' | 'AC' | 'LorryFeatures' | 'Amenities';
  applyActionKey: string;
}

export interface DetailedEstimateResult {
  baseFabricationINR: number;
  structuralMaterialsINR: number;
  panelingAndFinishINR: number;
  interiorAndSeatingINR: number;
  electricalAndAmenitiesINR: number;
  specializedEquipmentINR: number;
  labourChargesINR: number;
  contingencyINR: number;
  subtotalINR: number;
  taxGST18INR: number;
  chassisCostINR: number;
  totalEstimatedINR: number;
  customerBudgetINR: number;
  budgetDifferenceINR: number; // positive = within budget, negative = over budget
  isOverBudget: boolean;
  suggestions: BudgetOptimizationSuggestion[];
}

/**
 * Calculates itemized pricing for Bus and Lorry bodies based on realistic Tamil Nadu body building costs.
 */
export function calculateDetailedEstimate(config: Partial<ConfigurationState>): DetailedEstimateResult {
  const isBus = config.domain === 'Bus' || (!config.domain && config.category?.includes('Bus'));
  const customerBudget = config.targetBudgetINR || 1500000;
  const includeChassisInTotal = config.budgetScope === 'chassis-and-body';
  const chassisCost = includeChassisInTotal ? (config.chassis?.basePriceINR || 2600000) : 0;
  const isRefurbishment = config.buildType === 'refurbishment';
  const refurbMultiplier = isRefurbishment ? 0.65 : 1.0;

  // Material Tier multiplier
  const tier = config.materialTier || 'Standard';
  let tierMultiplier = 1.0;
  if (tier === 'Basic') tierMultiplier = 0.85;
  if (tier === 'Premium') tierMultiplier = 1.30;

  let baseFabrication = 0;
  let structuralMaterials = 0;
  let panelingAndFinish = 0;
  let interiorAndSeating = 0;
  let electricalAndAmenities = 0;
  let specializedEquipment = 0;
  let labourCharges = 0;

  const suggestions: BudgetOptimizationSuggestion[] = [];

  if (isBus) {
    // BUS CALCULATIONS
    const capacity = config.seatingCapacity || 36;
    const isSleeper = config.category === 'Sleeper Coach (2+1)' || config.seatingLayout === '2+1 Sleeper';

    // Base Frame Fabrication (Tubular structure according to AIS-052)
    baseFabrication = Math.round((isSleeper ? 380000 : 310000) * refurbMultiplier);

    // Structural Materials (Steel sections)
    structuralMaterials = Math.round((isSleeper ? 340000 : 280000) * tierMultiplier * refurbMultiplier);

    // Paneling & Finish (FRP front/rear, side stretch panels, 2K paint)
    panelingAndFinish = Math.round(260000 * tierMultiplier);

    // Seating & Interior
    let seatUnitRate = 4200; // standard
    if (config.seatType === 'semi-deluxe-highback') seatUnitRate = 5800;
    if (config.seatType === 'harita-pushback') seatUnitRate = 9500;
    if (config.seatType === 'sleeper-berth' || isSleeper) seatUnitRate = 18500;

    let flooringCost = 35000;
    if (config.interiorFlooring === 'heavy-vinyl-fire-retardant') flooringCost = 65000;
    if (config.interiorFlooring === 'wooden-laminate') flooringCost = 90000;

    interiorAndSeating = Math.round((capacity * seatUnitRate) + flooringCost);

    // Windows & Doors
    let windowDoorCost = 75000;
    if (config.windowType === 'fixed-toughened-flush') windowDoorCost += 70000;
    if (config.windowType === 'double-glazed-thermal') windowDoorCost += 140000;
    if (config.doorType === 'pneumatic-outward') windowDoorCost += 45000;
    panelingAndFinish += windowDoorCost;

    // Electrical & Amenities
    electricalAndAmenities = 85000;
    if (config.amenities?.includes('LED Ambient Mood Lights')) electricalAndAmenities += 28000;
    if (config.amenities?.includes('32" Smart TV')) electricalAndAmenities += 38000;
    if (config.amenities?.includes('USB Chargers')) electricalAndAmenities += capacity * 450;
    if (config.amenities?.includes('Reverse Camera & CCTV')) electricalAndAmenities += 32000;

    // Air Conditioning
    if (config.acType === 'engine-driven-12kw') {
      specializedEquipment += 220000;
    } else if (config.acType === 'sub-engine-roof-24kw') {
      specializedEquipment += 450000;
    }

    // Labour charges for bus coachbuilding (skilled Karur artisans)
    labourCharges = Math.round(180000 * refurbMultiplier);

  } else {
    // LORRY / COMMERCIAL TRUCK CALCULATIONS
    const lengthFeet = config.cargoLengthFeet || 22;
    const isTipper = config.category === 'Tipper & Dumper Body' || config.tipperHydraulics;
    const isContainer = config.category === 'Container & Cargo Body' || config.category === 'Closed-Body Truck';
    const isReefer = config.category === 'Refrigerated & Insulated Body';

    // Base Frame & Cross-members (Heavy ISMC channel / Tata structural steel)
    baseFabrication = Math.round((lengthFeet * 12500 + (isTipper ? 90000 : 0)) * refurbMultiplier);

    // Side & Floor materials
    let floorCost = lengthFeet * 7500; // 3.2mm chequered
    if (config.floorPlateType === '4.5mm-heavy-duty-chequered') floorCost = lengthFeet * 11500;
    if (config.floorPlateType === 'hardwood-timber-reinforced') floorCost = lengthFeet * 14000;

    let sideCost = lengthFeet * 8500;
    if (config.sidePanelMaterial === 'tata-steel-flat-sheet') sideCost = lengthFeet * 11000;
    if (config.sidePanelMaterial === 'marine-aluminium') sideCost = lengthFeet * 16500;
    if (config.sidePanelMaterial === 'frp-composite') sideCost = lengthFeet * 18000;

    structuralMaterials = Math.round((floorCost + sideCost) * tierMultiplier * refurbMultiplier);

    // Corrosion protection & Paint
    let paintCost = 65000;
    if (config.corrosionTreatment === 'high-build-epoxy-primer-2k') paintCost = 110000;
    if (config.corrosionTreatment === 'zinc-galvanized-chassis') paintCost = 160000;
    panelingAndFinish = Math.round(paintCost * tierMultiplier);

    // Cargo doors, Tarpaulin, Cabin trim
    interiorAndSeating = 45000;
    if (config.canopyTarpaulin) interiorAndSeating += 25000;
    if (config.rearDoorType === '3-way-dropside-flaps') interiorAndSeating += 35000;

    // Electrical
    electricalAndAmenities = 35000;

    // Specialized equipment: Tipper hydraulics or Reefer compressor
    if (isTipper) {
      specializedEquipment += 210000; // Penta / Hyva hydraulic cylinder & PTO kit
    }
    if (isReefer) {
      specializedEquipment += 380000; // Carrier / Thermo King refrigeration unit + PUF insulation
    }

    // Labour charges for heavy lorry bodybuilding (Namakkal heavy fabrication)
    labourCharges = Math.round(110000 * refurbMultiplier);
  }

  // Contingency
  const contingencyPct = config.contingencyPercentage || 5;
  const preSubtotal = baseFabrication + structuralMaterials + panelingAndFinish + interiorAndSeating + electricalAndAmenities + specializedEquipment + labourCharges;
  const contingency = Math.round((preSubtotal * contingencyPct) / 100);

  const subtotal = preSubtotal + contingency;

  // Taxes: 18% GST (standard Indian GST for commercial bodybuilding)
  const gstRate = 0.18;
  const taxGST18 = Math.round(subtotal * gstRate);

  const totalEstimatedINR = (config.budgetIncludesGST ? subtotal : (subtotal + taxGST18)) + chassisCost;
  const budgetDifferenceINR = customerBudget - totalEstimatedINR;
  const isOverBudget = budgetDifferenceINR < 0;

  // Generate intelligent budget optimization suggestions if over-budget
  if (isOverBudget) {
    if (isBus) {
      if (config.seatType === 'harita-pushback') {
        const seatSavings = (config.seatingCapacity || 36) * (9500 - 5800);
        suggestions.push({
          id: 'opt-seats',
          title: 'Switch Harita Pushback to Semi-Deluxe Highback Seats',
          description: `Replace luxury pushback seats with comfortable high-back semi-deluxe seats (${config.seatingCapacity || 36} seats).`,
          savingsINR: seatSavings,
          category: 'Seats',
          applyActionKey: 'SEATS_SEMI_DELUXE'
        });
      }
      if (config.windowType === 'fixed-toughened-flush' || config.windowType === 'double-glazed-thermal') {
        suggestions.push({
          id: 'opt-windows',
          title: 'Switch to Standard Sliding Tinted Windows',
          description: 'Sliding tinted windows are durable, easy to maintain in Tamil Nadu conditions, and reduce glass framing costs.',
          savingsINR: 70000,
          category: 'Windows',
          applyActionKey: 'WINDOWS_SLIDING'
        });
      }
      if (tier === 'Premium') {
        suggestions.push({
          id: 'opt-tier',
          title: 'Switch Material Tier from Premium to Standard IS 2062',
          description: 'Standard package uses certified Tata structural steel and 2K PU paint with optimal cost-to-longevity ratio.',
          savingsINR: 125000,
          category: 'Materials',
          applyActionKey: 'TIER_STANDARD'
        });
      }
      if (config.acType === 'sub-engine-roof-24kw') {
        suggestions.push({
          id: 'opt-ac',
          title: 'Switch to Direct Engine-Driven AC System (12kW)',
          description: 'Saves upfront sub-engine installation cost while delivering reliable cabin cooling.',
          savingsINR: 230000,
          category: 'AC',
          applyActionKey: 'AC_ENGINE_DRIVEN'
        });
      }
      if (config.amenities && config.amenities.length > 2) {
        suggestions.push({
          id: 'opt-amenities',
          title: 'Defer Smart TV & RGB Mood Lighting to Post-Delivery Fitment',
          description: 'Keep core vehicle structure and install secondary infotainment accessories at a later stage.',
          savingsINR: 66000,
          category: 'Amenities',
          applyActionKey: 'DEFER_OPTIONAL_AMENITIES'
        });
      }
    } else {
      // Lorry suggestions
      if (tier === 'Premium') {
        suggestions.push({
          id: 'opt-lorry-tier',
          title: 'Switch from Premium to Standard Heavy-Duty Grade',
          description: 'Retain structural integrity with certified Tata Steel channels without luxury top-coat surcharges.',
          savingsINR: 75000,
          category: 'Materials',
          applyActionKey: 'TIER_STANDARD'
        });
      }
      if (config.floorPlateType === 'hardwood-timber-reinforced' || config.floorPlateType === '4.5mm-heavy-duty-chequered') {
        suggestions.push({
          id: 'opt-floor',
          title: 'Select Standard 3.2mm Chequered Floor Plate',
          description: 'High tensile strength suitable for regular freight with significant material weight and cost reduction.',
          savingsINR: 55000,
          category: 'LorryFeatures',
          applyActionKey: 'FLOOR_STANDARD_CHEQUERED'
        });
      }
      if (config.corrosionTreatment === 'zinc-galvanized-chassis') {
        suggestions.push({
          id: 'opt-paint',
          title: 'Switch Galvanizing to High-Build Epoxy Primer + 2K PU',
          description: 'Epoxy primer offers 5+ years corrosion resistance against Tamil Nadu monsoons at lower application cost.',
          savingsINR: 50000,
          category: 'Materials',
          applyActionKey: 'EPOXY_PRIMER'
        });
      }
    }
  }

  return {
    baseFabricationINR: baseFabrication,
    structuralMaterialsINR: structuralMaterials,
    panelingAndFinishINR: panelingAndFinish,
    interiorAndSeatingINR: interiorAndSeating,
    electricalAndAmenitiesINR: electricalAndAmenities,
    specializedEquipmentINR: specializedEquipment,
    labourChargesINR: labourCharges,
    contingencyINR: contingency,
    subtotalINR: subtotal,
    taxGST18INR: taxGST18,
    chassisCostINR: chassisCost,
    totalEstimatedINR: totalEstimatedINR,
    customerBudgetINR: customerBudget,
    budgetDifferenceINR: budgetDifferenceINR,
    isOverBudget: isOverBudget,
    suggestions: suggestions
  };
}

export interface OverhangValidation {
  isValid: boolean;
  rearOverhangPercentage: number;
  warnings: string[];
}

export function validateChassisDimensions(
  wheelbaseMm: number,
  overallLengthMm: number,
  frontOverhangMm: number,
  rearOverhangMm: number
): OverhangValidation {
  const warnings: string[] = [];
  const maxRearOverhangAllowed = wheelbaseMm * 0.60;
  const rearOverhangPercentage = (rearOverhangMm / wheelbaseMm) * 100;

  if (rearOverhangMm > maxRearOverhangAllowed) {
    warnings.push(
      `Rear overhang (${rearOverhangMm}mm) exceeds recommended 60% wheelbase limit (${Math.round(maxRearOverhangAllowed)}mm). May cause tail-swing instability.`
    );
  }

  const calculatedTotalLength = wheelbaseMm + frontOverhangMm + rearOverhangMm;
  if (Math.abs(calculatedTotalLength - overallLengthMm) > 200) {
    warnings.push(
      `Dimension mismatch: Wheelbase + Overhangs (${calculatedTotalLength}mm) differs from overall body length specified (${overallLengthMm}mm).`
    );
  }

  if (overallLengthMm > 13800) {
    warnings.push(`Overall length (${overallLengthMm}mm) exceeds maximum single-vehicle limit under AIS-052 (13.8M). Multi-axle chassis required.`);
  }

  return {
    isValid: warnings.length === 0,
    rearOverhangPercentage: Math.round(rearOverhangPercentage),
    warnings
  };
}
