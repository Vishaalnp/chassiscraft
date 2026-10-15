import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  ChassisSpec, 
  ConfigurationState, 
  Workshop, 
  Review, 
  Quotation, 
  QuoteRequest, 
  Project,
  StageStatus,
  MaterialItem
} from '../types';
import { MOCK_CHASSIS } from '../data/mockChassis';
import { MOCK_MATERIALS } from '../data/mockMaterials';
import { MOCK_WORKSHOPS, MOCK_REVIEWS } from '../data/mockWorkshops';
import { MOCK_QUOTATIONS, MOCK_QUOTE_REQUESTS } from '../data/mockQuotations';
import { MOCK_PROJECTS, createInitial15Stages } from '../data/mockProjects';

interface AppContextType {
  workshopsList: Workshop[];
  reviewsList: Review[];
  chassisList: ChassisSpec[];
  materialsList: MaterialItem[];
  quoteRequestsList: QuoteRequest[];
  quotationsList: Quotation[];
  projectsList: Project[];
  savedDesigns: ConfigurationState[];
  comparisonWorkshopIds: string[];

  // Comparison actions
  toggleCompareWorkshop: (workshopId: string) => void;
  clearComparison: () => void;

  // Workshop actions
  verifyWorkshop: (workshopId: string, status: 'verified' | 'rejected') => void;
  updateWorkshopProfile: (workshopId: string, data: Partial<Workshop>) => void;

  // Chassis actions
  addChassis: (chassis: ChassisSpec) => void;
  updateChassis: (id: string, data: Partial<ChassisSpec>) => void;
  deleteChassis: (id: string) => void;

  // Material actions
  updateMaterialStock: (id: string, newStock: number) => void;

  // Review actions
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
  replyToReview: (reviewId: string, reply: string) => void;

  // Design actions
  saveDesign: (config: ConfigurationState) => void;
  deleteSavedDesign: (id: string) => void;

  // Quotation & RFQ actions
  createQuoteRequest: (rfqData: Omit<QuoteRequest, 'id' | 'rfqNumber' | 'createdAt' | 'updatedAt' | 'status'>) => QuoteRequest;
  createWorkshopQuotation: (quoteData: Omit<Quotation, 'id' | 'quoteNumber' | 'createdAt' | 'updatedAt' | 'revisionNumber'>) => Quotation;
  acceptQuotation: (quotationId: string) => Project;
  rejectQuotation: (quotationId: string, reason?: string) => void;
  requestQuotationRevision: (quotationId: string, notes: string) => void;
  updateQuotationStatus: (quotationId: string, status: any, finalPriceINR?: number, notes?: string) => void;
  convertQuotationToProject: (quotationId: string) => Project;

  // Manufacturing tracking actions
  updateProjectStage: (
    projectId: string, 
    stageNumber: number, 
    status: StageStatus, 
    notes?: string, 
    delayReason?: string, 
    photoUrl?: string
  ) => void;
  updateProjectProgress: (
    projectId: string,
    stageNameOrNumber: string | number,
    percentage: number,
    notes?: string
  ) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [workshopsList, setWorkshopsList] = useState<Workshop[]>(() => {
    const stored = localStorage.getItem('bodycraft_tn_workshops');
    return stored ? JSON.parse(stored) : MOCK_WORKSHOPS;
  });

  const [reviewsList, setReviewsList] = useState<Review[]>(() => {
    const stored = localStorage.getItem('bodycraft_tn_reviews');
    return stored ? JSON.parse(stored) : MOCK_REVIEWS;
  });

  const [chassisList, setChassisList] = useState<ChassisSpec[]>(() => {
    const stored = localStorage.getItem('bodycraft_tn_chassis');
    return stored ? JSON.parse(stored) : MOCK_CHASSIS;
  });

  const [materialsList, setMaterialsList] = useState<MaterialItem[]>(() => {
    const stored = localStorage.getItem('bodycraft_tn_materials');
    return stored ? JSON.parse(stored) : MOCK_MATERIALS;
  });

  const [quoteRequestsList, setQuoteRequestsList] = useState<QuoteRequest[]>(() => {
    const stored = localStorage.getItem('bodycraft_tn_rfqs');
    return stored ? JSON.parse(stored) : MOCK_QUOTE_REQUESTS;
  });

  const [quotationsList, setQuotationsList] = useState<Quotation[]>(() => {
    const stored = localStorage.getItem('bodycraft_tn_quotes');
    return stored ? JSON.parse(stored) : MOCK_QUOTATIONS;
  });

  const [projectsList, setProjectsList] = useState<Project[]>(() => {
    const stored = localStorage.getItem('bodycraft_tn_projects');
    return stored ? JSON.parse(stored) : MOCK_PROJECTS;
  });

  const [savedDesigns, setSavedDesigns] = useState<ConfigurationState[]>(() => {
    const stored = localStorage.getItem('bodycraft_tn_designs');
    return stored ? JSON.parse(stored) : [];
  });

  const [comparisonWorkshopIds, setComparisonWorkshopIds] = useState<string[]>([]);

  // Helpers to persist
  const persistWorkshops = (updated: Workshop[]) => {
    setWorkshopsList(updated);
    localStorage.setItem('bodycraft_tn_workshops', JSON.stringify(updated));
  };

  const persistQuotes = (updated: Quotation[]) => {
    setQuotationsList(updated);
    localStorage.setItem('bodycraft_tn_quotes', JSON.stringify(updated));
  };

  const persistRFQs = (updated: QuoteRequest[]) => {
    setQuoteRequestsList(updated);
    localStorage.setItem('bodycraft_tn_rfqs', JSON.stringify(updated));
  };

  const persistProjects = (updated: Project[]) => {
    setProjectsList(updated);
    localStorage.setItem('bodycraft_tn_projects', JSON.stringify(updated));
  };

  const persistReviews = (updated: Review[]) => {
    setReviewsList(updated);
    localStorage.setItem('bodycraft_tn_reviews', JSON.stringify(updated));
  };

  const persistChassis = (updated: ChassisSpec[]) => {
    setChassisList(updated);
    localStorage.setItem('bodycraft_tn_chassis', JSON.stringify(updated));
  };

  const persistMaterials = (updated: MaterialItem[]) => {
    setMaterialsList(updated);
    localStorage.setItem('bodycraft_tn_materials', JSON.stringify(updated));
  };

  // Chassis actions
  const addChassis = (chassis: ChassisSpec) => {
    const updated = [chassis, ...chassisList];
    persistChassis(updated);
  };

  const updateChassis = (id: string, data: Partial<ChassisSpec>) => {
    const updated = chassisList.map(c => c.id === id ? { ...c, ...data } : c);
    persistChassis(updated);
  };

  const deleteChassis = (id: string) => {
    const updated = chassisList.filter(c => c.id !== id);
    persistChassis(updated);
  };

  // Material actions
  const updateMaterialStock = (id: string, newStock: number) => {
    const updated = materialsList.map(m => m.id === id ? { ...m, inStock: newStock } : m);
    persistMaterials(updated);
  };

  // Workshop actions
  const verifyWorkshop = (workshopId: string, status: 'verified' | 'rejected') => {
    const updated = workshopsList.map(ws => 
      ws.id === workshopId ? { ...ws, verified: status === 'verified', kycStatus: status } : ws
    );
    persistWorkshops(updated);
  };

  const updateWorkshopProfile = (workshopId: string, data: Partial<Workshop>) => {
    const updated = workshopsList.map(ws => 
      ws.id === workshopId ? { ...ws, ...data } : ws
    );
    persistWorkshops(updated);
  };

  // Comparison actions
  const toggleCompareWorkshop = (workshopId: string) => {
    setComparisonWorkshopIds(prev => {
      if (prev.includes(workshopId)) {
        return prev.filter(id => id !== workshopId);
      }
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 workshops simultaneously.');
        return prev;
      }
      return [...prev, workshopId];
    });
  };

  const clearComparison = () => {
    setComparisonWorkshopIds([]);
  };

  // Reviews
  const addReview = (review: Omit<Review, 'id' | 'createdAt'>) => {
    const newRev: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    const updated = [newRev, ...reviewsList];
    persistReviews(updated);

    // Recalculate average workshop rating
    const wsReviews = updated.filter(r => r.workshopId === review.workshopId);
    if (wsReviews.length > 0) {
      const avg = Number((wsReviews.reduce((sum, r) => sum + r.overallRating, 0) / wsReviews.length).toFixed(1));
      const updatedWs = workshopsList.map(ws => 
        ws.id === review.workshopId ? { ...ws, rating: avg, reviewCount: wsReviews.length } : ws
      );
      persistWorkshops(updatedWs);
    }
  };

  const replyToReview = (reviewId: string, reply: string) => {
    const updated = reviewsList.map(r => r.id === reviewId ? { ...r, workshopReply: reply } : r);
    persistReviews(updated);
  };

  // Designs
  const saveDesign = (config: ConfigurationState) => {
    setSavedDesigns(prev => {
      const exists = prev.some(d => d.id === config.id);
      const updated = exists ? prev.map(d => d.id === config.id ? config : d) : [config, ...prev];
      localStorage.setItem('bodycraft_tn_designs', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteSavedDesign = (id: string) => {
    setSavedDesigns(prev => {
      const updated = prev.filter(d => d.id !== id);
      localStorage.setItem('bodycraft_tn_designs', JSON.stringify(updated));
      return updated;
    });
  };

  // RFQs & Quotations
  const createQuoteRequest = (rfqData: Omit<QuoteRequest, 'id' | 'rfqNumber' | 'createdAt' | 'updatedAt' | 'status'>): QuoteRequest => {
    const newRFQ: QuoteRequest = {
      ...rfqData,
      id: `rfq-${Date.now()}`,
      rfqNumber: `RFQ-TN-2026-${Math.floor(100 + Math.random() * 900)}`,
      status: 'Submitted',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    const updatedRFQs = [newRFQ, ...quoteRequestsList];
    persistRFQs(updatedRFQs);

    // Generate initial draft quotation from each target workshop
    const newQuotes: Quotation[] = rfqData.targetWorkshops.map(wsId => {
      const ws = workshopsList.find(w => w.id === wsId);
      const est = rfqData.configuration.costBreakdown;
      return {
        id: `qt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        quoteNumber: `QT-${(ws?.district.slice(0, 3) || 'TN').toUpperCase()}-2026-${Math.floor(100 + Math.random() * 900)}`,
        quoteRequestId: newRFQ.id,
        workshopId: wsId,
        workshopName: ws?.name || 'Selected Workshop',
        workshopDistrict: ws?.district || 'Karur',
        customerId: rfqData.customerId,
        customerName: rfqData.customerName,
        customerPhone: rfqData.customerPhone,
        customerCompany: rfqData.customerCompany,
        configuration: rfqData.configuration,
        status: 'Quotation Sent',
        baseBodyPriceINR: est.baseFabricationINR,
        materialsPriceINR: est.structuralMaterialsINR,
        interiorSeatsPriceINR: est.interiorAndSeatingINR,
        electricalPaintPriceINR: est.panelingAndFinishINR + est.electricalAndAmenitiesINR,
        labourPriceINR: est.labourChargesINR,
        discountINR: 35000,
        taxGST18INR: est.taxGST18INR,
        finalPriceINR: est.totalEstimatedINR - 35000,
        estimatedDeliveryWeeks: ws?.leadTimeWeeks || 6,
        warrantyMonths: ws?.warrantyMonths || 24,
        validityDays: 30,
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        inclusions: [
          'Certified Tata / Jindal structural tubular steel frame',
          'AIS-052 code of practice certification',
          'Automotive 2K baked polyurethane paint',
          'Front automatic door assembly'
        ],
        exclusions: [
          'Chassis ex-showroom vehicle invoice',
          'RTO road tax and registration charges'
        ],
        workshopNotes: `Official quotation generated by ${ws?.name}. Structural drawings available upon request.`,
        revisionNumber: 1,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
    });

    persistQuotes([...newQuotes, ...quotationsList]);
    return newRFQ;
  };

  const createWorkshopQuotation = (quoteData: Omit<Quotation, 'id' | 'quoteNumber' | 'createdAt' | 'updatedAt' | 'revisionNumber'>): Quotation => {
    const newQuote: Quotation = {
      ...quoteData,
      id: `qt-${Date.now()}`,
      quoteNumber: `QT-TN-2026-${Math.floor(100 + Math.random() * 900)}`,
      revisionNumber: 1,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    persistQuotes([newQuote, ...quotationsList]);
    return newQuote;
  };

  const acceptQuotation = (quotationId: string): Project => {
    const quote = quotationsList.find(q => q.id === quotationId);
    if (!quote) throw new Error('Quotation not found');

    const updatedQuotes = quotationsList.map(q => 
      q.id === quotationId ? { ...q, status: 'Accepted' as const } : q
    );
    persistQuotes(updatedQuotes);

    // Also update RFQ status
    const updatedRFQs = quoteRequestsList.map(rfq => 
      rfq.id === quote.quoteRequestId ? { ...rfq, status: 'Accepted' as const } : rfq
    );
    persistRFQs(updatedRFQs);

    // Create active confirmed project with 15 manufacturing stages
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      projectCode: `BC-TN-2026-${Math.floor(10 + Math.random() * 90)}`,
      quotationId: quote.id,
      workshopId: quote.workshopId,
      workshopName: quote.workshopName,
      customerId: quote.customerId,
      customerName: quote.customerName,
      customerPhone: quote.customerPhone,
      vehicleTitle: quote.configuration.title,
      domain: quote.configuration.domain || 'Bus',
      category: quote.configuration.category,
      chassisBrandModel: `${quote.configuration.chassis?.brand || 'Ashok Leyland'} ${quote.configuration.chassis?.model || 'Commercial Chassis'}`,
      chassisVin: `TN${new Date().getFullYear()}${Math.floor(10000000 + Math.random() * 90000000)}`,
      currentStageIndex: 0,
      overallProgressPercentage: 5,
      stages: createInitial15Stages(`Er. In-Charge (${quote.workshopName})`),
      startDate: new Date().toISOString().split('T')[0],
      targetDeliveryDate: new Date(Date.now() + (quote.estimatedDeliveryWeeks || 6) * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      contractAmountINR: quote.finalPriceINR,
      paymentMilestones: [
        { id: `mil-1`, title: 'Chassis Inward & Advance Booking (25%)', percentage: 25, amountINR: Math.round(quote.finalPriceINR * 0.25), status: 'Paid', paidDate: new Date().toISOString().split('T')[0] },
        { id: `mil-2`, title: 'Frame Skeleton Inspection (35%)', percentage: 35, amountINR: Math.round(quote.finalPriceINR * 0.35), status: 'Pending' },
        { id: `mil-3`, title: 'Paneling & Paint Booth Inflow (20%)', percentage: 20, amountINR: Math.round(quote.finalPriceINR * 0.20), status: 'Pending' },
        { id: `mil-4`, title: 'Final Handover & RTO Trial (20%)', percentage: 20, amountINR: Math.round(quote.finalPriceINR * 0.20), status: 'Pending' }
      ],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    // Mark stage 1 as in progress
    newProject.stages[0].status = 'in-progress';
    newProject.stages[0].startDate = new Date().toISOString().split('T')[0];

    persistProjects([newProject, ...projectsList]);
    return newProject;
  };

  const rejectQuotation = (quotationId: string, reason?: string) => {
    const updated = quotationsList.map(q => 
      q.id === quotationId ? { ...q, status: 'Rejected' as const, workshopNotes: reason ? `Rejected: ${reason}` : q.workshopNotes } : q
    );
    persistQuotes(updated);
  };

  const requestQuotationRevision = (quotationId: string, notes: string) => {
    const updated = quotationsList.map(q => 
      q.id === quotationId ? { ...q, status: 'Revision Requested' as const, workshopNotes: `Customer requested revision: ${notes}` } : q
    );
    persistQuotes(updated);
  };

  const updateQuotationStatus = (quotationId: string, status: any, finalPriceINR?: number, notes?: string) => {
    const updated = quotationsList.map(q => {
      if (q.id !== quotationId) return q;
      return {
        ...q,
        status: status,
        finalPriceINR: finalPriceINR !== undefined ? finalPriceINR : q.finalPriceINR,
        workshopNotes: notes !== undefined ? notes : q.workshopNotes,
        updatedAt: new Date().toISOString().split('T')[0]
      };
    });
    persistQuotes(updated);
  };

  const convertQuotationToProject = (quotationId: string): Project => {
    return acceptQuotation(quotationId);
  };

  // Manufacturing Project Tracking
  const updateProjectStage = (
    projectId: string, 
    stageNumber: number, 
    status: StageStatus, 
    notes?: string, 
    delayReason?: string, 
    photoUrl?: string
  ) => {
    const updated = projectsList.map(project => {
      if (project.id !== projectId) return project;

      const newStages = project.stages.map(stage => {
        if (stage.stageNumber !== stageNumber) return stage;

        const updatedPhotos = photoUrl && !stage.photos.includes(photoUrl) 
          ? [...stage.photos, photoUrl] 
          : stage.photos;

        return {
          ...stage,
          status,
          completionPercentage: status === 'completed' ? 100 : (status === 'in-progress' ? 50 : 0),
          notes: notes || stage.notes,
          delayReason: status === 'delayed' ? (delayReason || 'Material transit delay') : stage.delayReason,
          photos: updatedPhotos,
          completionDate: status === 'completed' ? new Date().toISOString().split('T')[0] : stage.completionDate
        };
      });

      // Calculate new overall progress
      const completedCount = newStages.filter(s => s.status === 'completed').length;
      const inProgressCount = newStages.filter(s => s.status === 'in-progress').length;
      const overall = Math.round(((completedCount * 100) + (inProgressCount * 50)) / newStages.length);

      // Find current active stage index
      let activeIndex = newStages.findIndex(s => s.status === 'in-progress');
      if (activeIndex === -1) {
        activeIndex = Math.min(completedCount, newStages.length - 1);
      }

      return {
        ...project,
        stages: newStages,
        overallProgressPercentage: overall,
        currentStageIndex: activeIndex,
        updatedAt: new Date().toISOString().split('T')[0]
      };
    });

    persistProjects(updated);
  };

  const updateProjectProgress = (
    projectId: string,
    stageNameOrNumber: string | number,
    percentage: number,
    notes?: string
  ) => {
    const status: StageStatus = percentage >= 100 ? 'completed' : percentage > 0 ? 'in-progress' : 'pending';
    const project = projectsList.find(p => p.id === projectId);
    if (!project) return;
    const stage = project.stages.find(s => 
      typeof stageNameOrNumber === 'number' 
        ? s.stageNumber === stageNameOrNumber 
        : (s.name === stageNameOrNumber || s.id === stageNameOrNumber)
    );
    if (stage) {
      updateProjectStage(projectId, stage.stageNumber, status, notes);
    }
  };

  return (
    <AppContext.Provider value={{
      workshopsList,
      reviewsList,
      chassisList,
      materialsList,
      quoteRequestsList,
      quotationsList,
      projectsList,
      savedDesigns,
      comparisonWorkshopIds,
      toggleCompareWorkshop,
      clearComparison,
      verifyWorkshop,
      updateWorkshopProfile,
      addChassis,
      updateChassis,
      deleteChassis,
      updateMaterialStock,
      addReview,
      replyToReview,
      saveDesign,
      deleteSavedDesign,
      createQuoteRequest,
      createWorkshopQuotation,
      acceptQuotation,
      rejectQuotation,
      requestQuotationRevision,
      updateQuotationStatus,
      convertQuotationToProject,
      updateProjectStage,
      updateProjectProgress
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
