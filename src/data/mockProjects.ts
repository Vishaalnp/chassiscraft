import { Project, ManufacturingStage, ManufacturingStageName } from '../types';

export const STAGE_NAMES: ManufacturingStageName[] = [
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
  'Vehicle Handover & Delivery'
];

export function createInitial15Stages(assignedEngineer = 'Er. K. Soundarrajan'): ManufacturingStage[] {
  return STAGE_NAMES.map((name, index) => ({
    id: `stage-${index + 1}`,
    stageNumber: index + 1,
    name,
    status: 'pending',
    completionPercentage: 0,
    assignedStaff: assignedEngineer,
    photos: []
  }));
}

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-tn-01',
    projectCode: 'BC-TN-2026-08',
    quotationId: 'qt-101',
    workshopId: 'ws-karur-01',
    workshopName: 'Karur Classic Coach Crafts',
    customerId: 'cust-01',
    customerName: 'M. Selvakumar',
    customerPhone: '+91 94431 82910',
    vehicleTitle: 'Vetri Royal 36-Berth AC Sleeper Coach (2+1)',
    domain: 'Bus',
    category: 'Sleeper Coach (2+1)',
    chassisBrandModel: 'Ashok Leyland Viking 225 HP Air Suspension (12M)',
    chassisVin: 'MB1ALVIK92671044',
    currentStageIndex: 8, // Currently at stage 9 (Anti-Corrosion & Painting)
    overallProgressPercentage: 62,
    startDate: '2026-09-12',
    targetDeliveryDate: '2026-10-28',
    contractAmountINR: 1845000,
    paymentMilestones: [
      { id: 'pay-01', title: 'Advance Booking & Chassis Inspection', percentage: 20, amountINR: 369000, status: 'Paid', paidDate: '2026-09-12' },
      { id: 'pay-02', title: 'Frame Skeleton Inspection Milestone', percentage: 30, amountINR: 553500, status: 'Paid', paidDate: '2026-09-28' },
      { id: 'pay-03', title: 'Paneling & Paint Booth Inflow', percentage: 25, amountINR: 461250, status: 'Paid', paidDate: '2026-10-09' },
      { id: 'pay-04', title: 'Final Handover & RTO Clearance', percentage: 25, amountINR: 461250, status: 'Pending' }
    ],
    stages: [
      {
        id: 'st-01',
        stageNumber: 1,
        name: 'Order & Specification Confirmation',
        status: 'completed',
        completionPercentage: 100,
        startDate: '2026-09-12',
        completionDate: '2026-09-13',
        assignedStaff: 'Er. K. Soundarrajan',
        notes: '2+1 sleeper layout blueprint frozen. AIS-052 compliance drawings approved by customer.',
        photos: ['https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=400']
      },
      {
        id: 'st-02',
        stageNumber: 2,
        name: 'Chassis Receiving',
        status: 'completed',
        completionPercentage: 100,
        startDate: '2026-09-14',
        completionDate: '2026-09-14',
        assignedStaff: 'M. Palanisamy',
        notes: 'Chassis delivered from Ashok Leyland Hosur plant in pristine drive-away chassis condition.',
        photos: []
      },
      {
        id: 'st-03',
        stageNumber: 3,
        name: 'Chassis Inspection',
        status: 'completed',
        completionPercentage: 100,
        startDate: '2026-09-15',
        completionDate: '2026-09-16',
        assignedStaff: 'Er. K. Soundarrajan',
        notes: 'Wheel alignment, air brake reservoir pressures, steering linkage geometry, and engine oil levels checked.',
        photos: []
      },
      {
        id: 'st-04',
        stageNumber: 4,
        name: 'Design & Engineering Approval',
        status: 'completed',
        completionPercentage: 100,
        startDate: '2026-09-17',
        completionDate: '2026-09-18',
        assignedStaff: 'Er. R. Vetrivel (CAD Specialist)',
        notes: '3D CAD stress simulation approved for rear luggage boot and upper berth cantilever supports.',
        photos: []
      },
      {
        id: 'st-05',
        stageNumber: 5,
        name: 'Material Procurement',
        status: 'completed',
        completionPercentage: 100,
        startDate: '2026-09-19',
        completionDate: '2026-09-22',
        assignedStaff: 'S. Ramamoorthy (Stores)',
        notes: 'Received Tata Structura IS 2062 Grade hollow sections, 1.2mm marine aluminium panels, and Harita berth frames.',
        photos: []
      },
      {
        id: 'st-06',
        stageNumber: 6,
        name: 'Frame Fabrication',
        status: 'completed',
        completionPercentage: 100,
        startDate: '2026-09-23',
        completionDate: '2026-09-30',
        assignedStaff: 'T. Murugesan (Master Fabricator)',
        notes: 'Tubular rollover cage welded using certified MIG processes. Diagonal roof trusses and cross bracing passed structural deflection inspection.',
        photos: ['https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=400']
      },
      {
        id: 'st-07',
        stageNumber: 7,
        name: 'Sheet Metal Paneling',
        status: 'completed',
        completionPercentage: 100,
        startDate: '2026-10-01',
        completionDate: '2026-10-06',
        assignedStaff: 'T. Murugesan',
        notes: 'Side stretch skinning completed with tensioning rig. High-density PUF acoustic insulation placed between inner and outer skins.',
        photos: []
      },
      {
        id: 'st-08',
        stageNumber: 8,
        name: 'Doors & Windows Fitment',
        status: 'completed',
        completionPercentage: 100,
        startDate: '2026-10-07',
        completionDate: '2026-10-09',
        assignedStaff: 'K. Senthil',
        notes: 'Front pneumatic automatic swing door aligned. Fixed toughened acoustic flush glass panels bonded with structural polyurethane adhesive.',
        photos: []
      },
      {
        id: 'st-09',
        stageNumber: 9,
        name: 'Anti-Corrosion Primer & Painting',
        status: 'in-progress',
        completionPercentage: 65,
        startDate: '2026-10-10',
        assignedStaff: 'V. Jayakumar (Paint Booth Lead)',
        notes: 'Epoxy primer baked in closed booth. Base royal copper pearl metallic coat applied. Ready for clear lacquer topcoat.',
        photos: ['https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=400']
      },
      {
        id: 'st-10',
        stageNumber: 10,
        name: 'Electrical Installation',
        status: 'pending',
        completionPercentage: 0,
        assignedStaff: 'M. Palanisamy (Senior Electrician)',
        notes: 'Wiring harness loomed with flame-retardant automotive grade wires awaiting paint booth exit.',
        photos: []
      },
      {
        id: 'st-11',
        stageNumber: 11,
        name: 'Interior & Seating Fitment',
        status: 'pending',
        completionPercentage: 0,
        assignedStaff: 'R. Dharmalingam',
        notes: '36 luxury sleeper berths and wooden acoustic flooring staged in warehouse.',
        photos: []
      },
      {
        id: 'st-12',
        stageNumber: 12,
        name: 'Safety & Quality Inspection',
        status: 'pending',
        completionPercentage: 0,
        assignedStaff: 'Er. K. Soundarrajan',
        notes: 'AIS-052 bus body code safety compliance checklist scheduled.',
        photos: []
      },
      {
        id: 'st-13',
        stageNumber: 13,
        name: 'Road Testing & Trial',
        status: 'pending',
        completionPercentage: 0,
        assignedStaff: 'Chief Test Driver A. Chandran',
        notes: '50-km highway stability and NVH vibration road testing route planned.',
        photos: []
      },
      {
        id: 'st-14',
        stageNumber: 14,
        name: 'Final Approval & RTO Clearance',
        status: 'pending',
        completionPercentage: 0,
        assignedStaff: 'Legal & RTO Liaison Officer',
        notes: 'Body builder ARAI certificate generation and Form 22 clearance.',
        photos: []
      },
      {
        id: 'st-15',
        stageNumber: 15,
        name: 'Vehicle Handover & Delivery',
        status: 'pending',
        completionPercentage: 0,
        assignedStaff: 'Customer Relations Lead',
        notes: 'Ceremonial delivery and vehicle handover kit prepared.',
        photos: []
      }
    ],
    createdAt: '2026-09-12',
    updatedAt: '2026-10-13'
  },
  {
    id: 'proj-tn-02',
    projectCode: 'BC-TN-2026-11',
    quotationId: 'qt-102',
    workshopId: 'ws-namakkal-01',
    workshopName: 'Namakkal Heavy Trailer & Tipper Bodies',
    customerId: 'cust-02',
    customerName: 'P. Arumugam',
    customerPhone: '+91 98427 45120',
    vehicleTitle: 'Kongu 16 Cu.M Heavy Rock Tipper Body',
    domain: 'Lorry',
    category: 'Tipper & Dumper Body',
    chassisBrandModel: 'Tata Signa 2823.K HD 9S (6x4)',
    chassisVin: 'MAT2823KHD009812',
    currentStageIndex: 11, // At stage 12 (Safety & Quality)
    overallProgressPercentage: 84,
    startDate: '2026-09-02',
    targetDeliveryDate: '2026-10-18',
    contractAmountINR: 885000,
    paymentMilestones: [
      { id: 'pay-21', title: 'Chassis Registration & Subframe Advance', percentage: 30, amountINR: 265500, status: 'Paid', paidDate: '2026-09-02' },
      { id: 'pay-22', title: 'Tipper Box & Hydraulic Cylinder Mounting', percentage: 40, amountINR: 354000, status: 'Paid', paidDate: '2026-09-24' },
      { id: 'pay-23', title: 'Trial Lift & Final Handover', percentage: 30, amountINR: 265500, status: 'Pending' }
    ],
    stages: [
      { id: 'tst-01', stageNumber: 1, name: 'Order & Specification Confirmation', status: 'completed', completionPercentage: 100, startDate: '2026-09-02', completionDate: '2026-09-03', assignedStaff: 'Er. N. Shanmugam', photos: [] },
      { id: 'tst-02', stageNumber: 2, name: 'Chassis Receiving', status: 'completed', completionPercentage: 100, startDate: '2026-09-04', completionDate: '2026-09-04', assignedStaff: 'S. Ganesan', photos: [] },
      { id: 'tst-03', stageNumber: 3, name: 'Chassis Inspection', status: 'completed', completionPercentage: 100, startDate: '2026-09-05', completionDate: '2026-09-05', assignedStaff: 'Er. N. Shanmugam', photos: [] },
      { id: 'tst-04', stageNumber: 4, name: 'Design & Engineering Approval', status: 'completed', completionPercentage: 100, startDate: '2026-09-06', completionDate: '2026-09-07', assignedStaff: 'Design Team', photos: [] },
      { id: 'tst-05', stageNumber: 5, name: 'Material Procurement', status: 'completed', completionPercentage: 100, startDate: '2026-09-08', completionDate: '2026-09-10', assignedStaff: 'Stores', photos: [] },
      { id: 'tst-06', stageNumber: 6, name: 'Frame Fabrication', status: 'completed', completionPercentage: 100, startDate: '2026-09-11', completionDate: '2026-09-18', assignedStaff: 'Master Welder Raju', notes: 'Heavy duty subframe bolted with high-tensile fasteners to chassis web.', photos: [] },
      { id: 'tst-07', stageNumber: 7, name: 'Sheet Metal Paneling', status: 'completed', completionPercentage: 100, startDate: '2026-09-19', completionDate: '2026-09-23', assignedStaff: 'Raju & Team', notes: '6mm Hardox rock bottom plate and 4mm side stanchions seam-welded.', photos: [] },
      { id: 'tst-08', stageNumber: 8, name: 'Doors & Windows Fitment', status: 'completed', completionPercentage: 100, startDate: '2026-09-24', completionDate: '2026-09-25', assignedStaff: 'Fabrication Team', notes: 'Automatic top-hinged tail door lock release linkage fitted.', photos: [] },
      { id: 'tst-09', stageNumber: 9, name: 'Anti-Corrosion Primer & Painting', status: 'completed', completionPercentage: 100, startDate: '2026-09-26', completionDate: '2026-09-30', assignedStaff: 'Paint Unit', notes: 'Shot blasted to Sa 2.5 and coated with zinc-rich epoxy + golden yellow PU finish.', photos: [] },
      { id: 'tst-10', stageNumber: 10, name: 'Electrical Installation', status: 'completed', completionPercentage: 100, startDate: '2026-10-01', completionDate: '2026-10-02', assignedStaff: 'Electrician Team', notes: 'Rear LED safety clusters and reverse proximity alarm hooked to chassis loom.', photos: [] },
      { id: 'tst-11', stageNumber: 11, name: 'Interior & Seating Fitment', status: 'completed', completionPercentage: 100, startDate: '2026-10-03', completionDate: '2026-10-04', assignedStaff: 'Cabin Trim Unit', notes: 'Driver hydraulic cabin tipping lock check and PTO engage switch mounted.', photos: [] },
      { id: 'tst-12', stageNumber: 12, name: 'Safety & Quality Inspection', status: 'in-progress', completionPercentage: 70, startDate: '2026-10-06', assignedStaff: 'Er. N. Shanmugam', notes: 'Hyva FE 149 cylinder full load pressure testing at 190 bar under observation.', delayReason: 'Minor seal replacement on auxiliary hydraulic valve (completed)', photos: [] },
      { id: 'tst-13', stageNumber: 13, name: 'Road Testing & Trial', status: 'pending', completionPercentage: 0, assignedStaff: 'Test Driver', photos: [] },
      { id: 'tst-14', stageNumber: 14, name: 'Final Approval & RTO Clearance', status: 'pending', completionPercentage: 0, assignedStaff: 'RTO Lead', photos: [] },
      { id: 'tst-15', stageNumber: 15, name: 'Vehicle Handover & Delivery', status: 'pending', completionPercentage: 0, assignedStaff: 'Sales Manager', photos: [] }
    ],
    createdAt: '2026-09-02',
    updatedAt: '2026-10-13'
  }
];
