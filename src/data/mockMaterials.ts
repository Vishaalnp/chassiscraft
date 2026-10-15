import { MaterialItem } from '../types';

export const MOCK_MATERIALS: MaterialItem[] = [
  {
    id: 'mat-stl-01',
    category: 'Steel',
    name: 'IS 4923 YST 310 Tubular Steel Frame',
    grade: 'YST 310 High Strength',
    manufacturer: 'Tata Structura',
    unitCostINR: 78,
    unit: 'kg',
    weightKgPerUnit: 1,
    durabilityRatingYears: 20,
    inStock: 14500,
    description: 'Anti-corrosive high-tensile ERW rectangular steel tubing for main rollover body structure and cage.'
  },
  {
    id: 'mat-frp-02',
    category: 'FRP',
    name: 'Hand-Layup Molded FRP Front & Rear Panels',
    grade: 'Fire Retardant Class 1',
    manufacturer: 'Bodycraft Marine & Composite',
    unitCostINR: 1450,
    unit: 'sq. meter',
    weightKgPerUnit: 4.5,
    durabilityRatingYears: 15,
    inStock: 650,
    description: 'Lightweight aerodynamically contoured FRP composite end-caps with UV resistant gelcoat finish.'
  },
  {
    id: 'mat-gls-03',
    category: 'Glass',
    name: 'Toughened Laminated Windshield & Side Glass',
    grade: 'AIS-008 E-Marked Glass',
    manufacturer: 'AIS Automotive Glass',
    unitCostINR: 3200,
    unit: 'sq. meter',
    weightKgPerUnit: 12,
    durabilityRatingYears: 12,
    inStock: 420,
    description: 'High impact safety glass with 70% light transmission, shatterproof laminate layer, and acoustic noise reduction.'
  },
  {
    id: 'mat-flr-04',
    category: 'Flooring',
    name: 'Heavy Duty Anti-Skid Rubber Vinyl Sheet',
    grade: 'Commercial Grade 3mm',
    manufacturer: 'Wonderfloor',
    unitCostINR: 650,
    unit: 'sq. meter',
    weightKgPerUnit: 3.2,
    durabilityRatingYears: 10,
    inStock: 1800,
    description: 'Waterproof, fire-retardant anti-slip floor covering with heat-welded joints.'
  },
  {
    id: 'mat-uph-05',
    category: 'Upholstery',
    name: 'Automotive Grade Artificial Leatherette',
    grade: 'Breathable PU-Leather',
    manufacturer: 'Bhartia Crafts',
    unitCostINR: 480,
    unit: 'meter',
    weightKgPerUnit: 0.8,
    durabilityRatingYears: 8,
    inStock: 2400,
    description: 'Stain resistant, easy clean synthetic leather for pushback seat upholstery.'
  },
  {
    id: 'mat-ins-06',
    category: 'Insulation',
    name: 'NBR Nitrile Closed Cell Thermal & Acoustic Foam',
    grade: 'Class 0 Fire Rated 13mm',
    manufacturer: 'Armacell',
    unitCostINR: 380,
    unit: 'sq. meter',
    weightKgPerUnit: 0.5,
    durabilityRatingYears: 15,
    inStock: 3200,
    description: 'Superior thermal insulation glued inside roof and side walls to maintain AC cooling efficiency.'
  },
  {
    id: 'mat-pnt-07',
    category: 'Paint',
    name: 'High Gloss Polyurethane 2K Automotive Paint',
    grade: 'PU Clearcoat System',
    manufacturer: 'PPG Asian Paints',
    unitCostINR: 1250,
    unit: 'liter',
    weightKgPerUnit: 1.1,
    durabilityRatingYears: 10,
    inStock: 850,
    description: 'Commercial fleet paint system featuring anti-scratch clearcoat and 7-year gloss retention guarantee.'
  },
  {
    id: 'mat-ele-08',
    category: 'Electrical',
    name: 'Automotive Grade Harness & Modular Wiring',
    grade: 'IP67 Waterproof Connectors',
    manufacturer: 'Motherson Sumi',
    unitCostINR: 28000,
    unit: 'full kit',
    weightKgPerUnit: 18,
    durabilityRatingYears: 15,
    inStock: 45,
    description: 'Flame retardant copper harness with relay protection, circuit breakers, and labeled plug-and-play sockets.'
  }
];
