require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Workshop = require('../models/Workshop');
const Chassis = require('../models/Chassis');

const SEED_WORKSHOPS = [
  {
    name: 'Karur Coach Craft & Engineering',
    district: 'Karur',
    city: 'Karur',
    address: '142/A Trichy Road, Industrial Estate, Karur, Tamil Nadu 639004',
    phone: '+91 94431 82910',
    email: 'contact@karurcoachcraft.com',
    establishedYear: 1998,
    rating: 4.9,
    reviewCount: 48,
    verified: true,
    kycStatus: 'verified',
    specializations: ['Tourist & Luxury Coach', 'Sleeper Coach (2+1)', 'Intercity Mofussil Bus'],
    vehicleTypes: ['Bus'],
    startingPriceINR: 1450000,
    leadTimeWeeks: 6,
    warrantyMonths: 24,
    certifications: ['ARAI Bus Code AIS-052 Rev 2', 'CIRTs Structural Roll-Over Approved', 'ISO 9001:2015'],
    coverImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&auto=format&fit=crop&q=80',
    coordinates: { lat: 10.9601, lng: 78.0766 },
    description: 'Pioneers in high-strength roll-cage passenger coaches with advanced sound-dampening insulation and luxury pushback seating.',
    facilities: ['Automotive 2K Bake Booth', 'Hydraulic Sheet Shearing Bay', 'Laser Cutting Table', 'Chassis Alignment Bed'],
  },
  {
    name: 'Namakkal Royal Tipper & Trailer Works',
    district: 'Namakkal',
    city: 'Namakkal',
    address: '88 Paramathi Road, Lorry Nagar, Namakkal, Tamil Nadu 637001',
    phone: '+91 98427 45123',
    email: 'sales@namakkalroyaltipper.com',
    establishedYear: 2004,
    rating: 4.8,
    reviewCount: 62,
    verified: true,
    kycStatus: 'verified',
    specializations: ['Heavy Tipper (Rock / Mining)', 'Multi-Axle Open Goods Lorry', 'Container & Cargo Box Body'],
    vehicleTypes: ['Lorry'],
    startingPriceINR: 520000,
    leadTimeWeeks: 4,
    warrantyMonths: 18,
    certifications: ['ARAI CMVR Rule 125B Compliant', 'Wipro Hydraulic Certified Integrator', 'ISO 9001:2015'],
    coverImage: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&auto=format&fit=crop&q=80',
    coordinates: { lat: 11.2189, lng: 78.1674 },
    description: 'Renowned tipper fabrication specialists employing high-tensile Hardox steel plates with precision multi-stage hydraulic ram systems.',
    facilities: ['Hardox Plasma Cutting', 'Submerged Arc Welding', 'Shot Blasting Bay', '100T Hydraulic Press Brake'],
  },
  {
    name: 'Kovai Institutional & Transit Bodybuilders',
    district: 'Coimbatore',
    city: 'Coimbatore',
    address: '56 Pollachi Main Road, Eachanari, Coimbatore, Tamil Nadu 641021',
    phone: '+91 97890 23411',
    email: 'info@kovaibodycraft.com',
    establishedYear: 2008,
    rating: 4.7,
    reviewCount: 34,
    verified: true,
    kycStatus: 'verified',
    specializations: ['School & College Safe Bus', 'Corporate Staff Shuttle', 'Town & City Transit Bus'],
    vehicleTypes: ['Bus'],
    startingPriceINR: 1180000,
    leadTimeWeeks: 5,
    warrantyMonths: 24,
    certifications: ['AIS-063 School Bus Code Compliant', 'Automotive Fire Retardant Class 1', 'ARAI Certified'],
    coverImage: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1200&auto=format&fit=crop&q=80',
    coordinates: { lat: 11.0168, lng: 76.9558 },
    description: 'Engineered safety coaches designed specifically for educational institutions and corporate transportation with emergency stop sensors.',
    facilities: ['School Safety Testing Bay', 'MIG Welding Lines', 'Electrostatic Paint Booth', 'Anti-skid Flooring Rig'],
  },
  {
    name: 'Madurai Pandian Coach Works',
    district: 'Madurai',
    city: 'Madurai',
    address: '210 Kappalur SIDCO Industrial Estate, Madurai, Tamil Nadu 625008',
    phone: '+91 94422 19876',
    email: 'service@pandiancoach.in',
    establishedYear: 2011,
    rating: 4.6,
    reviewCount: 29,
    verified: true,
    kycStatus: 'verified',
    specializations: ['Mofussil Route Bus', 'Tourist Coach', 'Specialized Commercial Vans'],
    vehicleTypes: ['Bus', 'Specialized'],
    startingPriceINR: 1250000,
    leadTimeWeeks: 5,
    warrantyMonths: 18,
    certifications: ['AIS-052 Code of Practice', 'TNSTC Approved Workshop'],
    coverImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&auto=format&fit=crop&q=80',
    coordinates: { lat: 9.9252, lng: 78.1198 },
    description: 'Expertise in high-frequency route buses and tour coaches engineered for south Tamil Nadu rugged terrain and highway routes.',
    facilities: ['Heavy Chassis Jig', 'PU Baked Paint Chamber', 'Automated Glass Fitment Rig'],
  },
  {
    name: 'Salem Steel & Cargo Fabricators',
    district: 'Salem',
    city: 'Salem',
    address: '42 Steel Plant Road, Meyyanur, Salem, Tamil Nadu 636005',
    phone: '+91 98433 76543',
    email: 'enquiry@salemcargofab.com',
    establishedYear: 2002,
    rating: 4.8,
    reviewCount: 51,
    verified: true,
    kycStatus: 'verified',
    specializations: ['Container & Cargo Body', 'Insulated Reefer Cold Van', 'Open Body Heavy Truck'],
    vehicleTypes: ['Lorry', 'Specialized'],
    startingPriceINR: 480000,
    leadTimeWeeks: 4,
    warrantyMonths: 24,
    certifications: ['ISO 9001:2015', 'Cold Chain Council Certified', 'ARAI CMVR Certified'],
    coverImage: 'https://images.unsplash.com/photo-1586191582152-f94481498114?w=1200&auto=format&fit=crop&q=80',
    coordinates: { lat: 11.6643, lng: 78.1460 },
    description: 'Precision steel cargo box fabrication and PUF-insulated refrigerated bodies utilizing premium Salem steel alloys.',
    facilities: ['PUF Sandwich Panel Press', 'Thermal Imaging Chamber', 'Heavy Metal Bending Guillotine'],
  },
  {
    name: 'Chennai Metro Coach & Specialized Bodies',
    district: 'Chennai',
    city: 'Chennai',
    address: '10 Ambattur Industrial Estate Phase II, Chennai, Tamil Nadu 600058',
    phone: '+91 99400 12890',
    email: 'contact@chennaimetrocoach.in',
    establishedYear: 2015,
    rating: 4.7,
    reviewCount: 22,
    verified: true,
    kycStatus: 'verified',
    specializations: ['Electric Bus Bodies', 'Air-Conditioned Low Floor City Bus', 'Customized Ambulance & Special Van'],
    vehicleTypes: ['Bus', 'Specialized'],
    startingPriceINR: 1850000,
    leadTimeWeeks: 7,
    warrantyMonths: 36,
    certifications: ['ARAI Electric Bus Safety Certified', 'AIS-052 & AIS-153 Approved', 'ISO 14001:2015'],
    coverImage: 'https://images.unsplash.com/photo-1509749837427-ac94a2553d0e?w=1200&auto=format&fit=crop&q=80',
    coordinates: { lat: 13.0827, lng: 80.2707 },
    description: 'Modern high-tech fabrication facility specialized in EV composite structures, aerodynamic bus bodies, and low-floor urban transit coaches.',
    facilities: ['Clean EV Battery Mounting Bay', 'Robotic Welding Cell', 'Down-draft Spray Booth', 'Computerized Load Cell Rig'],
  },
];

const seedData = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bodycraft_tn';
  console.log(`Connecting to MongoDB at: ${mongoURI}...`);
  await mongoose.connect(mongoURI);

  console.log('Cleaning existing database collections...');
  await User.deleteMany({});
  await Workshop.deleteMany({});
  await Chassis.deleteMany({});

  console.log('Seeding demo users (Customer, Workshop Owner, Admin)...');
  const admin = await User.create({
    name: 'Senthil Kumar (ARAI / Transport Auditor)',
    email: 'admin@bodycraft.tn',
    phone: '+91 98401 23456',
    password: 'Admin@2026Password',
    role: 'ADMIN',
    companyName: 'Tamil Nadu Transport Certification Directorate',
    district: 'Chennai',
    verified: true,
  });

  const workshopOwner = await User.create({
    name: 'Er. R. Selvam',
    email: 'selvam@karurcoach.in',
    phone: '+91 94431 82910',
    password: 'Owner@2026Password',
    role: 'WORKSHOP_OWNER',
    companyName: 'Karur Coach Craft & Engineering',
    district: 'Karur',
    verified: true,
  });

  const customer = await User.create({
    name: 'Karthik Subramanian',
    email: 'karthik@srmtravels.in',
    phone: '+91 98410 99887',
    password: 'Customer@2026Password',
    role: 'CUSTOMER',
    companyName: 'SRM Omni Travels & Logistics Ltd',
    district: 'Chennai',
    verified: true,
  });

  console.log('Seeding verified Tamil Nadu workshops...');
  const workshops = await Workshop.insertMany(
    SEED_WORKSHOPS.map((ws, i) => ({
      ...ws,
      ownerId: i === 0 ? workshopOwner._id : null,
    }))
  );

  // Link first workshop to owner
  workshopOwner.workshopId = workshops[0]._id.toString();
  await workshopOwner.save();

  console.log(`Successfully seeded:`);
  console.log(`- 3 Demo Users: admin@bodycraft.tn, selvam@karurcoach.in, karthik@srmtravels.in`);
  console.log(`- ${workshops.length} Tamil Nadu Workshops`);

  await mongoose.disconnect();
  console.log('MongoDB connection closed.');
};

seedData().catch((err) => {
  console.error('Seed Error:', err);
  process.exit(1);
});
