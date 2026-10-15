import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BodyCategory, ChassisSpec, ConfigurationState } from '../types';
import { MOCK_CHASSIS } from '../data/mockChassis';
import { calculateDetailedEstimate, DetailedEstimateResult } from '../utils/calculators';

const initialEstimate = calculateDetailedEstimate({
  domain: 'Bus',
  category: 'Tourist & Luxury Coach',
  chassis: MOCK_CHASSIS[0],
  targetBudgetINR: 1600000,
  materialTier: 'Standard',
  seatingCapacity: 36,
  seatType: 'semi-deluxe-highback',
  windowType: 'sliding-tinted',
  doorType: 'pneumatic-outward',
  acType: 'non-ac-blowers',
  budgetIncludesGST: false,
  budgetScope: 'body-only'
});

const defaultInitialConfig: ConfigurationState = {
  id: `cfg-${Date.now()}`,
  title: 'Tamil Nadu Superfast Coach 36',
  domain: 'Bus',
  category: 'Tourist & Luxury Coach',
  chassis: MOCK_CHASSIS[0],
  chassisStatus: 'have-chassis',
  buildType: 'new-build',
  targetBudgetINR: 1600000,
  budgetIncludesGST: false,
  budgetScope: 'body-only',
  contingencyPercentage: 5,
  timeframeWeeks: 6,
  seatingCapacity: 36,
  seatingLayout: '2+2',
  seatType: 'semi-deluxe-highback',
  windowType: 'sliding-tinted',
  doorType: 'pneumatic-outward',
  acType: 'non-ac-blowers',
  interiorFlooring: 'chequered-rubber-mat',
  amenities: ['USB Chargers', 'Reverse Camera & CCTV'],
  materialTier: 'Standard',
  costBreakdown: {
    baseFabricationINR: initialEstimate.baseFabricationINR,
    structuralMaterialsINR: initialEstimate.structuralMaterialsINR,
    panelingAndFinishINR: initialEstimate.panelingAndFinishINR,
    interiorAndSeatingINR: initialEstimate.interiorAndSeatingINR,
    electricalAndAmenitiesINR: initialEstimate.electricalAndAmenitiesINR,
    specializedEquipmentINR: initialEstimate.specializedEquipmentINR,
    labourChargesINR: initialEstimate.labourChargesINR,
    contingencyINR: initialEstimate.contingencyINR,
    subtotalINR: initialEstimate.subtotalINR,
    taxGST18INR: initialEstimate.taxGST18INR,
    chassisCostINR: initialEstimate.chassisCostINR,
    totalEstimatedINR: initialEstimate.totalEstimatedINR
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

interface ConfiguratorContextType {
  currentStep: number;
  config: ConfigurationState;
  estimate: DetailedEstimateResult;
  selectedWorkshopIds: string[];
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateConfig: (updates: Partial<ConfigurationState>) => void;
  toggleTargetWorkshop: (workshopId: string) => void;
  applyOptimization: (actionKey: string) => void;
  resetConfig: (domain?: 'Bus' | 'Lorry') => void;
  loadConfig: (loaded: ConfigurationState) => void;
}

const ConfiguratorContext = createContext<ConfiguratorContextType | undefined>(undefined);

export const ConfiguratorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [config, setConfig] = useState<ConfigurationState>(defaultInitialConfig);
  const [selectedWorkshopIds, setSelectedWorkshopIds] = useState<string[]>(['ws-karur-01']);

  const estimate = calculateDetailedEstimate(config);

  const updateConfig = (updates: Partial<ConfigurationState>) => {
    setConfig(prev => {
      const merged = { ...prev, ...updates };
      const newEst = calculateDetailedEstimate(merged);
      return {
        ...merged,
        costBreakdown: {
          baseFabricationINR: newEst.baseFabricationINR,
          structuralMaterialsINR: newEst.structuralMaterialsINR,
          panelingAndFinishINR: newEst.panelingAndFinishINR,
          interiorAndSeatingINR: newEst.interiorAndSeatingINR,
          electricalAndAmenitiesINR: newEst.electricalAndAmenitiesINR,
          specializedEquipmentINR: newEst.specializedEquipmentINR,
          labourChargesINR: newEst.labourChargesINR,
          contingencyINR: newEst.contingencyINR,
          subtotalINR: newEst.subtotalINR,
          taxGST18INR: newEst.taxGST18INR,
          chassisCostINR: newEst.chassisCostINR,
          totalEstimatedINR: newEst.totalEstimatedINR
        },
        updatedAt: new Date().toISOString()
      };
    });
  };

  const setStep = (step: number) => setCurrentStep(Math.max(1, Math.min(8, step)));
  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 8));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const toggleTargetWorkshop = (workshopId: string) => {
    setSelectedWorkshopIds(prev => 
      prev.includes(workshopId) 
        ? prev.filter(id => id !== workshopId) 
        : [...prev, workshopId]
    );
  };

  const applyOptimization = (actionKey: string) => {
    switch (actionKey) {
      case 'SEATS_SEMI_DELUXE':
        updateConfig({ seatType: 'semi-deluxe-highback' });
        break;
      case 'WINDOWS_SLIDING':
        updateConfig({ windowType: 'sliding-tinted' });
        break;
      case 'TIER_STANDARD':
        updateConfig({ materialTier: 'Standard' });
        break;
      case 'AC_ENGINE_DRIVEN':
        updateConfig({ acType: 'engine-driven-12kw' });
        break;
      case 'DEFER_OPTIONAL_AMENITIES':
        updateConfig({ amenities: ['USB Chargers'] });
        break;
      case 'FLOOR_STANDARD_CHEQUERED':
        updateConfig({ floorPlateType: '3.2mm-chequered' });
        break;
      case 'EPOXY_PRIMER':
        updateConfig({ corrosionTreatment: 'high-build-epoxy-primer-2k' });
        break;
      default:
        break;
    }
  };

  const resetConfig = (domain: 'Bus' | 'Lorry' = 'Bus') => {
    const chassis = domain === 'Bus' ? MOCK_CHASSIS[0] : MOCK_CHASSIS[4];
    const category: BodyCategory = domain === 'Bus' ? 'Tourist & Luxury Coach' : 'Tipper & Dumper Body';
    const newConfig: ConfigurationState = {
      ...defaultInitialConfig,
      id: `cfg-${Date.now()}`,
      title: domain === 'Bus' ? 'Tamil Nadu Express Coach' : 'Kongu Heavy Cargo Body',
      domain,
      category,
      chassis,
      targetBudgetINR: domain === 'Bus' ? 1600000 : 900000,
      cargoLengthFeet: domain === 'Lorry' ? 22 : undefined,
      sidePanelMaterial: domain === 'Lorry' ? 'tata-steel-flat-sheet' : undefined,
      floorPlateType: domain === 'Lorry' ? '3.2mm-chequered' : undefined,
      rearDoorType: domain === 'Lorry' ? 'top-hinged-tailgate' : undefined,
      tipperHydraulics: domain === 'Lorry' && category === 'Tipper & Dumper Body'
    };
    setConfig(newConfig);
    setCurrentStep(1);
    setSelectedWorkshopIds(domain === 'Bus' ? ['ws-karur-01'] : ['ws-namakkal-01']);
  };

  const loadConfig = (loaded: ConfigurationState) => {
    setConfig(loaded);
    setCurrentStep(1);
  };

  return (
    <ConfiguratorContext.Provider value={{
      currentStep,
      config,
      estimate,
      selectedWorkshopIds,
      setStep,
      nextStep,
      prevStep,
      updateConfig,
      toggleTargetWorkshop,
      applyOptimization,
      resetConfig,
      loadConfig
    }}>
      {children}
    </ConfiguratorContext.Provider>
  );
};

export const useConfigurator = () => {
  const context = useContext(ConfiguratorContext);
  if (!context) {
    throw new Error('useConfigurator must be used within a ConfiguratorProvider');
  }
  return context;
};
