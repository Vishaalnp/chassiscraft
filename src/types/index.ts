export const PLATFORM_NAME = "BODYCRAFT TN — Bus & Lorry Body Building Platform";
export const PLATFORM_SHORT_NAME = "BODYCRAFT TN";
export const PLATFORM_TAGLINE = "Your Vehicle. Your Budget. Your Build.";

export type UserRole = 'CUSTOMER' | 'WORKSHOP_OWNER' | 'ADMIN';

export type CustomerType = 'Individual' | 'Transport Operator' | 'Lorry Owner' | 'Fleet Manager' | 'School/College' | 'Logistics Business';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  role: UserRole;
  customerType?: CustomerType;
  workshopId?: string; // If WORKSHOP_OWNER
  avatar?: string;
  district?: string;
  gstNumber?: string;
  createdAt: string;
}

export type TamilNaduDistrict = 
  | 'Karur' 
  | 'Namakkal' 
  | 'Coimbatore' 
  | 'Salem' 
  | 'Chennai' 
  | 'Erode' 
  | 'Tiruchirappalli' 
  | 'Madurai' 
  | 'Tiruppur' 
  | 'Dindigul'
  | 'Vellore'
  | 'Thoothukudi';

export type VehicleDomain = 'Bus' | 'Lorry' | 'Both';

export type BodyCategory = 
  | 'Town & City Bus'
  | 'Mofussil & Route Bus'
  | 'School & College Bus'
  | 'Staff & Institutional Bus'
  | 'Tourist & Luxury Coach'
  | 'Sleeper Coach (2+1)'
  | 'Open-Body Goods Lorry'
  | 'Closed-Body Truck'
  | 'Container & Cargo Body'
  | 'Tipper & Dumper Body'
  | 'Refrigerated & Insulated Body';

export type ChassisBrand = 'Ashok Leyland' | 'Tata Motors' | 'BharatBenz' | 'Eicher' | 'Volvo' | 'Scania' | 'Force Motors';

export interface MaterialItem {
  id: string;
  category: 'Steel' | 'Aluminium' | 'FRP' | 'Glass' | 'Flooring' | 'Upholstery' | 'Insulation' | 'Paint' | 'Electrical';
  name: string;
  grade: string;
  manufacturer: string;
  unitCostINR: number;
  unit: string;
  weightKgPerUnit: number;
  durabilityRatingYears: number;
  inStock: number;
  description: string;
}

export interface ChassisSpec {
  id: string;
  brand: ChassisBrand;
  model: string;
  domain: VehicleDomain;
  wheelbaseMm: number;
  gvwKg: number;
  enginePowerHp: number;
  fuelType: 'Diesel' | 'CNG' | 'Electric' | 'LNG';
  overallLengthMm: number;
  overallWidthMm: number;
  frontOverhangMm: number;
  rearOverhangMm: number;
  maxRecommendedBodyLengthMm: number;
  basePriceINR: number;
  image: string;
  suitableBodyTypes: BodyCategory[];
  description: string;
  stockAvailable: number;
}

export interface Review {
  id: string;
  workshopId: string;
  customerId: string;
  customerName: string;
  customerCompany?: string;
  overallRating: number; // 1-5
  workmanshipRating: number; // 1-5
  communicationRating: number; // 1-5
  deliveryRating: number; // 1-5
  comment: string;
  vehicleType: BodyCategory;
  projectCode?: string;
  verifiedBuild: boolean;
  createdAt: string;
  workshopReply?: string;
}

export interface Workshop {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  district: TamilNaduDistrict;
  town: string;
  address: string;
  mapCoordinates: {
    lat: number;
    lng: number;
  };
  phone: string;
  email: string;
  establishedYear: number;
  verified: boolean;
  kycStatus: 'verified' | 'pending' | 'rejected';
  rating: number;
  reviewCount: number;
  vehicleDomain: VehicleDomain;
  specializations: string[];
  indicativePriceRange: {
    minINR: number;
    maxINR: number;
  };
  leadTimeWeeks: number;
  warrantyMonths: number;
  logo: string;
  coverImage: string;
  gallery: string[];
  services: string[];
  certifications: string[]; // e.g., 'ARAI Approved', 'AIS-052 Certified', 'ISO 9001:2015'
  description: string;
  workingHours: string;
  featured?: boolean;
}

export interface SeatConfig {
  id: string;
  number?: string;
  row?: number;
  col?: number;
  type: 'standard-bench' | 'semi-deluxe-highback' | 'harita-pushback' | 'sleeper-berth-lower' | 'sleeper-berth-upper' | 'standard' | 'pushback' | 'recliner' | 'sleeper-lower' | 'sleeper-upper';
  material: 'heavy-duty-fabric' | 'synthetic-leatherette' | 'genuine-leather' | 'fabric' | 'leather' | 'synthetic-leather';
  priceINR: number;
  isOccupied?: boolean;
}

export interface MaterialOption {
  id: string;
  tier: 'Basic' | 'Standard' | 'Premium';
  name: string;
  description: string;
  steelGrade: string;
  flooringType: string;
  paintSystem: string;
  paneling: string;
  costMultiplier: number;
  durabilityYears: number;
  tradeOffs: {
    pros: string[];
    cons: string[];
  };
}

export interface ConfigurationState {
  id: string;
  title: string;
  domain: 'Bus' | 'Lorry';
  category: BodyCategory;
  chassis: ChassisSpec | null;
  chassisStatus: 'have-chassis' | 'need-procurement';
  buildType: 'new-build' | 'refurbishment';
  
  // Budget settings
  targetBudgetINR: number;
  budgetIncludesGST: boolean;
  budgetScope: 'body-only' | 'chassis-and-body';
  contingencyPercentage: number;
  timeframeWeeks: number;

  // Bus specific customization
  seatingCapacity?: number;
  seatingLayout?: '2+2' | '3+2' | '2+1 Sleeper' | 'Executive Lounge';
  seatType?: 'standard-bench' | 'semi-deluxe-highback' | 'harita-pushback' | 'sleeper-berth';
  windowType?: 'sliding-tinted' | 'fixed-toughened-flush' | 'double-glazed-thermal';
  doorType?: 'pneumatic-outward' | 'sliding' | 'manual-jack-knife';
  acType?: 'non-ac-blowers' | 'engine-driven-12kw' | 'sub-engine-roof-24kw';
  interiorFlooring?: 'chequered-rubber-mat' | 'heavy-vinyl-fire-retardant' | 'wooden-laminate';
  amenities?: string[]; // 'USB Chargers', 'LED Ambient Mood Lights', '32" Smart TV', 'Reverse Camera & CCTV', 'GPS Speed Governor'

  // Lorry specific customization
  cargoLengthFeet?: number;
  sidePanelMaterial?: 'corrugated-ms-sheet' | 'tata-steel-flat-sheet' | 'marine-aluminium' | 'frp-composite';
  floorPlateType?: '3.2mm-chequered' | '4.5mm-heavy-duty-chequered' | 'hardwood-timber-reinforced';
  rearDoorType?: 'top-hinged-tailgate' | 'full-split-double-door' | '3-way-dropside-flaps';
  tipperHydraulics?: boolean;
  canopyTarpaulin?: boolean;
  corrosionTreatment?: 'standard-red-oxide' | 'high-build-epoxy-primer-2k' | 'zinc-galvanized-chassis';

  // Selected Material Tier
  materialTier: 'Basic' | 'Standard' | 'Premium';

  // Cost estimates
  costBreakdown: {
    baseFabricationINR: number;
    structuralMaterialsINR: number;
    panelingAndFinishINR: number;
    interiorAndSeatingINR: number;
    electricalAndAmenitiesINR: number;
    specializedEquipmentINR: number; // hydraulics, AC
    labourChargesINR: number;
    contingencyINR: number;
    subtotalINR: number;
    taxGST18INR: number;
    chassisCostINR: number;
    totalEstimatedINR: number;
  };

  createdAt: string;
  updatedAt: string;
}

export type QuotationStatus = 
  | 'Draft'
  | 'Submitted'
  | 'Under Review'
  | 'Quotation Sent'
  | 'Revision Requested'
  | 'Accepted'
  | 'Rejected'
  | 'Expired';

export interface QuoteRequest {
  id: string;
  rfqNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerCompany?: string;
  targetWorkshops: string[]; // Workshop IDs
  configuration: ConfigurationState;
  targetBudgetINR: number;
  customerNotes?: string;
  status: QuotationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Quotation {
  id: string;
  quoteNumber: string;
  quoteRequestId: string;
  workshopId: string;
  workshopName: string;
  workshopDistrict: TamilNaduDistrict;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerCompany?: string;
  configuration: ConfigurationState;
  status: QuotationStatus;
  
  // Itemized quotation breakdown from workshop
  baseBodyPriceINR: number;
  materialsPriceINR: number;
  interiorSeatsPriceINR: number;
  electricalPaintPriceINR: number;
  labourPriceINR: number;
  discountINR: number;
  taxGST18INR: number;
  finalPriceINR: number;

  estimatedDeliveryWeeks: number;
  warrantyMonths: number;
  validityDays: number;
  validUntil: string;
  inclusions: string[];
  exclusions: string[];
  workshopNotes?: string;
  revisionNumber: number;
  revisionHistory?: {
    revisionDate: string;
    previousPriceINR: number;
    reason: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export type ManufacturingStageName = 
  | 'Order & Specification Confirmation'
  | 'Chassis Receiving'
  | 'Chassis Inspection'
  | 'Design & Engineering Approval'
  | 'Material Procurement'
  | 'Frame Fabrication'
  | 'Sheet Metal Paneling'
  | 'Doors & Windows Fitment'
  | 'Anti-Corrosion Primer & Painting'
  | 'Electrical Installation'
  | 'Interior & Seating Fitment'
  | 'Safety & Quality Inspection'
  | 'Road Testing & Trial'
  | 'Final Approval & RTO Clearance'
  | 'Vehicle Handover & Delivery';

export type StageStatus = 'pending' | 'in-progress' | 'completed' | 'delayed' | 'on-hold';

export interface ManufacturingStage {
  id: string;
  stageNumber: number;
  name: ManufacturingStageName;
  status: StageStatus;
  completionPercentage: number;
  startDate?: string;
  completionDate?: string;
  assignedStaff: string;
  notes?: string;
  delayReason?: string;
  photos: string[];
}

export interface Project {
  id: string;
  projectCode: string; // e.g. "BC-TN-2026-08"
  quotationId: string;
  workshopId: string;
  workshopName: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  vehicleTitle: string;
  domain: VehicleDomain;
  category: BodyCategory;
  chassisBrandModel: string;
  chassisVin: string;
  currentStageIndex: number; // 0 to 14
  overallProgressPercentage: number;
  stages: ManufacturingStage[];
  startDate: string;
  targetDeliveryDate: string;
  actualDeliveryDate?: string;
  contractAmountINR: number;
  paymentMilestones: {
    id: string;
    title: string;
    percentage: number;
    amountINR: number;
    status: 'Pending' | 'Paid';
    paidDate?: string;
  }[];
  createdAt: string;
  updatedAt: string;
}
