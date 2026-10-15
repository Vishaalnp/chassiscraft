import { Workshop, Review } from '../types';

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    workshopId: 'ws-karur-01',
    customerId: 'cust-01',
    customerName: 'M. Selvakumar',
    customerCompany: 'Vetri Intercity Travels, Madurai',
    overallRating: 5,
    workmanshipRating: 5,
    communicationRating: 4,
    deliveryRating: 5,
    comment: 'Fabricated two 2+1 luxury AC sleeper coaches on Ashok Leyland 12M chassis. Exceptional structural welding and NVH insulation. Delivered on the committed date before the Diwali rush.',
    vehicleType: 'Sleeper Coach (2+1)',
    projectCode: 'BC-TN-2026-01',
    verifiedBuild: true,
    createdAt: '2026-08-14',
    workshopReply: 'Thank you Selvakumar sir. Glad the coaches are performing well on the Chennai-Trivandrum route.'
  },
  {
    id: 'rev-02',
    workshopId: 'ws-namakkal-01',
    customerId: 'cust-02',
    customerName: 'P. Arumugam',
    customerCompany: 'Kongu Logistics & Minerals, Salem',
    overallRating: 5,
    workmanshipRating: 5,
    communicationRating: 5,
    deliveryRating: 4,
    comment: 'Custom 16 Cu.M rock body tipper on Tata Signa 2823.K with Hyva cylinder. Heavy duty 6mm floor plate welded flawlessly. Great strength in granite quarry transport.',
    vehicleType: 'Tipper & Dumper Body',
    projectCode: 'BC-TN-2026-03',
    verifiedBuild: true,
    createdAt: '2026-07-22'
  },
  {
    id: 'rev-03',
    workshopId: 'ws-cbe-01',
    customerId: 'cust-03',
    customerName: 'Dr. R. Nandhini',
    customerCompany: 'PSG Educational Trust, Coimbatore',
    overallRating: 5,
    workmanshipRating: 5,
    communicationRating: 5,
    deliveryRating: 5,
    comment: 'Commissioned 55-seater student bus with full AIS-063 school bus safety compliance, speed governor, and emergency exit buzzer. Smooth RTO inspection clearance.',
    vehicleType: 'School & College Bus',
    projectCode: 'BC-TN-2026-04',
    verifiedBuild: true,
    createdAt: '2026-05-18',
    workshopReply: 'Safety of students is our top priority. Thank you for your continued trust.'
  },
  {
    id: 'rev-04',
    workshopId: 'ws-karur-01',
    customerId: 'cust-04',
    customerName: 'S. Kanthasamy',
    customerCompany: 'Murugan Transport, Karur',
    overallRating: 4,
    workmanshipRating: 5,
    communicationRating: 4,
    deliveryRating: 4,
    comment: 'Semi-deluxe route bus for Trichy-Erode route. Tata LPO chassis. Sturdy roof framing and comfortable Harita pushback seats. Highly recommended Karur craftsmanship.',
    vehicleType: 'Mofussil & Route Bus',
    projectCode: 'BC-TN-2026-06',
    verifiedBuild: true,
    createdAt: '2026-06-05'
  },
  {
    id: 'rev-05',
    workshopId: 'ws-namakkal-01',
    customerId: 'cust-05',
    customerName: 'G. Balasubramanian',
    customerCompany: 'Cauvery Freight Carriers, Namakkal',
    overallRating: 5,
    workmanshipRating: 5,
    communicationRating: 4,
    deliveryRating: 5,
    comment: '24-ft corrugated container body with marine plywood flooring. Zero water leakage during heavy monsoon transit. Best truck body builders in Tamil Nadu.',
    vehicleType: 'Container & Cargo Body',
    projectCode: 'BC-TN-2026-07',
    verifiedBuild: true,
    createdAt: '2026-04-12'
  }
];

export const MOCK_WORKSHOPS: Workshop[] = [
  {
    id: 'ws-karur-01',
    name: 'Karur Classic Coach Crafts',
    slug: 'karur-classic-coach-crafts',
    tagline: 'Tamil Nadu’s Premier Luxury Coach & Sleeper Fabricator Since 1988',
    district: 'Karur',
    town: 'Karur Industrial Estate',
    address: 'Plot 42-46, SIDCO Industrial Estate, Vengamedu, Karur, Tamil Nadu 639006',
    mapCoordinates: { lat: 10.9601, lng: 78.0766 },
    phone: '+91 94431 82910',
    email: 'contact@karurcoachcrafts.demo.in',
    establishedYear: 1988,
    verified: true,
    kycStatus: 'verified',
    rating: 4.9,
    reviewCount: 86,
    vehicleDomain: 'Bus',
    specializations: [
      'Tourist & Luxury Coaches',
      'Sleeper Coaches (2+1)',
      'Mofussil & Route Buses',
      'School & College Buses'
    ],
    indicativePriceRange: { minINR: 950000, maxINR: 2800000 },
    leadTimeWeeks: 6,
    warrantyMonths: 24,
    logo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=200',
    coverImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&q=80&w=800'
    ],
    services: [
      'Full AIS-052 Bus Body Fabrication',
      '2+1 & 2+2 AC Sleeper Berth Customization',
      'FRP Aerodynamic Mask & Spoiler Molding',
      'Automotive 2K Bake-Oven Painting',
      'RTO ARAI Approval Assistance'
    ],
    certifications: [
      'ARAI Approved Body Builder',
      'AIS-052 Rev II Certified',
      'ISO 9001:2015 Quality Certified'
    ],
    description: 'Based in the historic bus-building heartland of Karur, Karur Classic Coach Crafts has engineered over 2,400 buses. Equipped with a 45,000 sq.ft covered fabrication bay, robotic plasma cutting, and an automated 14-meter paint booth.',
    workingHours: 'Mon - Sat: 8:30 AM - 7:00 PM',
    featured: true
  },
  {
    id: 'ws-namakkal-01',
    name: 'Namakkal Heavy Trailer & Tipper Bodies',
    slug: 'namakkal-heavy-trailer-tippers',
    tagline: 'Unmatched Strength for Heavy Haulage, Tippers & Multi-Axle Cargo',
    district: 'Namakkal',
    town: 'Namakkal Bypass',
    address: '112/4 Trichy Main Road, Near Truck Terminal, Namakkal, Tamil Nadu 637001',
    mapCoordinates: { lat: 11.2189, lng: 78.1674 },
    phone: '+91 98427 45120',
    email: 'info@namakkalheavytrucks.demo.in',
    establishedYear: 1994,
    verified: true,
    kycStatus: 'verified',
    rating: 4.8,
    reviewCount: 112,
    vehicleDomain: 'Lorry',
    specializations: [
      'Tipper & Dumper Bodies (14-22 Cu.M)',
      'Open-Body Heavy Lorries',
      'Container & Closed Cargo Bodies',
      'Heavy Multi-Axle Semi-Trailers'
    ],
    indicativePriceRange: { minINR: 380000, maxINR: 1450000 },
    leadTimeWeeks: 4,
    warrantyMonths: 36,
    logo: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=200',
    coverImage: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=800'
    ],
    services: [
      'Rock Body & Coal Tipper Fabrication',
      'Penta & Hyva Hydraulic Cylinder Mounting',
      'Corrugated Heavy Steel Cargo Containers',
      'Under-Chassis Anti-Rust Shot Blasting',
      'CMVR & ARAI Inspection Documentation'
    ],
    certifications: [
      'ARAI Certified Truck Body Fabricator',
      'Tata Motors & Ashok Leyland Preferred Body Builder',
      'ISO 9001:2015'
    ],
    description: 'Located in Namakkal, the lorry transport capital of South India. Specialized in high-strength, low-tare-weight bodies engineered with Tata & Jindal structural steel channels for maximum legal payload.',
    workingHours: 'Mon - Sat: 8:00 AM - 7:30 PM',
    featured: true
  },
  {
    id: 'ws-cbe-01',
    name: 'Kovai Commercial Coach Builders',
    slug: 'kovai-commercial-coach',
    tagline: 'Engineering Excellence for Institutional, Staff & Electric Buses',
    district: 'Coimbatore',
    town: 'Eachanari',
    address: '88 Pollachi Road, Near SIDCO Industrial Phase II, Coimbatore, Tamil Nadu 641021',
    mapCoordinates: { lat: 10.9254, lng: 76.9806 },
    phone: '+91 97894 11200',
    email: 'build@kovaicoach.demo.in',
    establishedYear: 2003,
    verified: true,
    kycStatus: 'verified',
    rating: 4.8,
    reviewCount: 64,
    vehicleDomain: 'Bus',
    specializations: [
      'School & College Buses (AIS-063)',
      'Staff & Corporate Institutional Buses',
      'City & Electric Transit Buses',
      'Intercity Executive Coaches'
    ],
    indicativePriceRange: { minINR: 850000, maxINR: 2300000 },
    leadTimeWeeks: 5,
    warrantyMonths: 24,
    logo: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=200',
    coverImage: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800'
    ],
    services: [
      'AIS-063 School Bus Specification Fitment',
      'EV Battery Pack Enclosure Structural Framing',
      'Low Floor Passenger Boarding Ramp',
      'Emergency Exit Sensory Interlocks',
      'Custom Corporate Livery & Decals'
    ],
    certifications: [
      'AIS-052 & AIS-063 Certified',
      'ARAI Accredited',
      'CIRT Test Approved Structure'
    ],
    description: 'Coimbatore’s modern fabrication facility known for high precision CNC sheet bending, ergonomic passenger layouts, and institutional fleet longevity across South India.',
    workingHours: 'Mon - Sat: 9:00 AM - 6:30 PM',
    featured: true
  },
  {
    id: 'ws-salem-01',
    name: 'Salem Royal Bus & Truck Fab',
    slug: 'salem-royal-bus-truck',
    tagline: 'Reliable Workhorse Fabrication for Route Buses and Freight Lorries',
    district: 'Salem',
    town: 'Seelanaickenpatti',
    address: '45/2 Bangalore-Madurai NH44, Seelanaickenpatti, Salem, Tamil Nadu 636201',
    mapCoordinates: { lat: 11.6318, lng: 78.1460 },
    phone: '+91 94422 66780',
    email: 'info@salemroyal.demo.in',
    establishedYear: 1999,
    verified: true,
    kycStatus: 'verified',
    rating: 4.7,
    reviewCount: 58,
    vehicleDomain: 'Both',
    specializations: [
      'Mofussil & Route Buses',
      'Open-Body Goods Lorries',
      'Heavy Closed Cargo Bodies',
      'Staff Buses'
    ],
    indicativePriceRange: { minINR: 420000, maxINR: 1950000 },
    leadTimeWeeks: 5,
    warrantyMonths: 18,
    logo: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&q=80&w=200',
    coverImage: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&q=80&w=800'
    ],
    services: [
      'Rugged Mofussil Route Body Fabrication',
      'Steel Dropside Lorry Construction',
      'Tough Hardwood & Chequered Floor Laying',
      'Anti-Corrosion Red Oxide + PU Coating'
    ],
    certifications: [
      'ARAI Type Approved',
      'MSME Registered Enterprise'
    ],
    description: 'Centrally situated on NH44 in Salem, catering to route bus operators and inter-state goods truck owners with high-durability fabrication built for Indian road conditions.',
    workingHours: 'Mon - Sat: 8:30 AM - 7:00 PM',
    featured: false
  },
  {
    id: 'ws-madurai-01',
    name: 'Madurai Southern Coach Works',
    slug: 'madurai-southern-coach',
    tagline: 'Specialists in Intercity Tourist Buses and Refrigerated Reefer Bodies',
    district: 'Madurai',
    town: 'Kappalur Industrial Area',
    address: 'Plot 19, SIDCO Industrial Complex, Kappalur, Madurai, Tamil Nadu 625008',
    mapCoordinates: { lat: 9.8732, lng: 78.0315 },
    phone: '+91 98940 33490',
    email: 'southerncoach@madurai.demo.in',
    establishedYear: 2007,
    verified: true,
    kycStatus: 'verified',
    rating: 4.8,
    reviewCount: 47,
    vehicleDomain: 'Both',
    specializations: [
      'Tourist & Luxury Coaches',
      'Refrigerated & Insulated Bodies',
      'Sleeper Coaches (2+1)',
      'Vegetable & Perishable Cargo Bodies'
    ],
    indicativePriceRange: { minINR: 520000, maxINR: 2600000 },
    leadTimeWeeks: 6,
    warrantyMonths: 24,
    logo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=200',
    coverImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800'
    ],
    services: [
      'Polyurethane Foam (PUF) Thermal Insulation',
      'Refrigeration Compressor Mounting (Carrier/ThermoKing)',
      'Intercity Sleeper Bunk Engineering',
      'Full Stainless Steel Hardware & Locks'
    ],
    certifications: [
      'ARAI Approved',
      'FSSAI Food Cold Chain Compliance'
    ],
    description: 'Southern Tamil Nadu’s specialist in temperature-controlled logistics bodies for milk, dairy, and sea-food, along with high-end luxury pilgrimage tourist coaches.',
    workingHours: 'Mon - Sat: 9:00 AM - 6:00 PM',
    featured: false
  },
  {
    id: 'ws-chennai-01',
    name: 'Chennai Metro Commercial Fabricators',
    slug: 'chennai-metro-commercial-fab',
    tagline: 'Modern Urban Commercial Body Building and Transit Engineering',
    district: 'Chennai',
    town: 'Ambattur Industrial Estate',
    address: 'South Phase, Sector 2, Ambattur Industrial Estate, Chennai, Tamil Nadu 600058',
    mapCoordinates: { lat: 13.0878, lng: 80.1610 },
    phone: '+91 98401 22910',
    email: 'ambattur@chennaimetrofab.demo.in',
    establishedYear: 2011,
    verified: true,
    kycStatus: 'verified',
    rating: 4.7,
    reviewCount: 52,
    vehicleDomain: 'Both',
    specializations: [
      'Town & City Buses',
      'Closed-Body Trucks',
      'Container & Cargo Bodies',
      'Specialized Electric Delivery Vans'
    ],
    indicativePriceRange: { minINR: 480000, maxINR: 2200000 },
    leadTimeWeeks: 5,
    warrantyMonths: 24,
    logo: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=200',
    coverImage: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=800'
    ],
    services: [
      'Urban FMCG Delivery Van Body Building',
      'E-Commerce High Cube Box Containers',
      'Wheelchair Hydraulic Access Ramp Fitting',
      'Fleet Graphics & Decals Application'
    ],
    certifications: [
      'ARAI Certified',
      'ISO 14001 Environmental Standard'
    ],
    description: 'Strategically located in Ambattur Industrial Estate, serving logistics majors and Chennai urban fleets with modular, quick-turnaround container and passenger vehicle bodies.',
    workingHours: 'Mon - Sat: 8:30 AM - 6:30 PM',
    featured: false
  }
];

export const MOCK_MATERIAL_TIERS = [
  {
    tier: 'Basic',
    name: 'Economy Commercial Tier',
    description: 'Cost-effective structural solution ideal for regional short-distance routes and standard freight.',
    steelGrade: 'Standard Mild Steel (IS 4923)',
    flooringType: '3.2mm Chequered Iron Plate / Heavy Rubber Mat',
    paintSystem: 'Zinc Chromate Red Oxide + Synthetic Enamel Gloss',
    paneling: '0.8mm Galvanized Iron (GI) Sheets with manual riveted seams',
    costMultiplier: 0.85,
    durabilityYears: 4,
    tradeOffs: {
      pros: ['Lowest initial investment', 'Easy local welding repairs in any taluk workshop', 'Quick lead times'],
      cons: ['Higher tare weight reduces fuel mileage slightly', 'Requires repainting touch-ups every 2 years', 'Basic aesthetic finish']
    }
  },
  {
    tier: 'Standard',
    name: 'Certified Fleet Standard Tier (Recommended)',
    description: 'The golden balance of durability, payload optimization, and AIS-052 safety compliance.',
    steelGrade: 'Tata Structura / Jindal Hollow Sections (IS 2062 Grade E250)',
    flooringType: '4.5mm Heavy Duty Chequered / Fire-Retardant Marine Vinyl',
    paintSystem: 'Epoxy Anti-Rust Primer + 2K Automotive Polyurethane (PU)',
    paneling: '1.0mm Aluminum side stretch panels + Moulded FRP front and rear masks',
    costMultiplier: 1.0,
    durabilityYears: 8,
    tradeOffs: {
      pros: ['Optimal strength-to-weight ratio for higher payload', '8+ years anti-corrosion protection in TN coastal zones', 'RTO ARAI standard compliance guaranteed'],
      cons: ['Moderate upfront cost', 'Requires specialized welding equipment for structural repairs']
    }
  },
  {
    tier: 'Premium',
    name: 'Heavy-Haul & Luxury Platinum Tier',
    description: 'Aviation-inspired craftsmanship engineered for luxury intercity sleeper coaches and heavy mining tippers.',
    steelGrade: 'High-Tensile Cold-Rolled Structural Alloy Steel (DOMEX / ST52)',
    flooringType: 'Chemi-Treated Phenolic Anti-Skid Ply + Wood-Grain Acoustic Laminate',
    paintSystem: 'Cathodic Electrodeposition (CED) / Sealed High-Bake Oven 2K PU Metallic',
    paneling: 'Composite Aluminium Sandwich (ACP) + Aerodynamic Fibreglass Contours',
    costMultiplier: 1.30,
    durabilityYears: 12,
    tradeOffs: {
      pros: ['Ultra-low tare weight saves up to 400 kg (improves diesel mileage by ~5-7%)', 'Premium European coach aesthetic with flush glass finish', '12+ year structural life warranty'],
      cons: ['Higher capital investment', 'Longer manufacturing lead time (6-8 weeks)']
    }
  }
];
