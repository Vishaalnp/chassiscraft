import { User } from '../types';

export const MOCK_CUSTOMERS: User[] = [
  {
    id: 'cust-01',
    name: 'M. Selvakumar',
    email: 'customer@vetritravels.demo.in',
    phone: '+91 94431 82910',
    company: 'Vetri Intercity Travels',
    role: 'CUSTOMER',
    customerType: 'Transport Operator',
    district: 'Madurai',
    gstNumber: '33AAACV8899A1Z2',
    createdAt: '2026-01-15'
  },
  {
    id: 'cust-02',
    name: 'P. Arumugam',
    email: 'arumugam@kongulogistics.demo.in',
    phone: '+91 98427 45120',
    company: 'Kongu Logistics & Minerals',
    role: 'CUSTOMER',
    customerType: 'Lorry Owner',
    district: 'Salem',
    gstNumber: '33AABCK1234B1Z5',
    createdAt: '2026-03-20'
  },
  {
    id: 'ws-owner-karur',
    name: 'Er. K. Soundarrajan',
    email: 'owner@karurcoachcrafts.demo.in',
    phone: '+91 94431 82910',
    company: 'Karur Classic Coach Crafts',
    role: 'WORKSHOP_OWNER',
    workshopId: 'ws-karur-01',
    district: 'Karur',
    gstNumber: '33AAACK4455C1Z8',
    createdAt: '2024-05-10'
  },
  {
    id: 'ws-owner-namakkal',
    name: 'Er. N. Shanmugam',
    email: 'owner@namakkalheavytrucks.demo.in',
    phone: '+91 98427 45120',
    company: 'Namakkal Heavy Trailer & Tipper Bodies',
    role: 'WORKSHOP_OWNER',
    workshopId: 'ws-namakkal-01',
    district: 'Namakkal',
    gstNumber: '33AABCN9988D1Z4',
    createdAt: '2024-08-14'
  },
  {
    id: 'admin-01',
    name: 'Er. C. Rajendran',
    email: 'admin@bodycraft-tn.gov.in',
    phone: '+91 94440 99881',
    company: 'TN BodyCraft State Automotive Registry',
    role: 'ADMIN',
    district: 'Chennai',
    createdAt: '2024-01-01'
  }
];
