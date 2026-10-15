# BODYCRAFT TN — Bus & Lorry Body Building Platform

A modern, production-grade web application connecting vehicle operators, fleet owners, and transport companies with bus and commercial lorry body-building workshops across **Tamil Nadu, India** (Karur, Namakkal, Coimbatore, Chennai, Salem, Madurai).

---

## 1. Project Overview & Vision

Commercial vehicle body building in Tamil Nadu is renowned across India, with global fabrication hubs in Karur (luxury coaches and route buses) and Namakkal (tippers and heavy trailers). **BODYCRAFT TN** digitizes the entire lifecycle of commercial body building:

1. **Workshop Discovery Marketplace**: Search, filter, and compare verified bodybuilders with district cluster mapping and AIS-052 certification credentials.
2. **Interactive 8-Step Vehicle Configurator & Budget Planner**: Real-time cost modeling in INR (₹) with an intelligent budget optimizer offering 1-click feature adjustments.
3. **Quotation Management System**: Submit RFQs to multiple workshops simultaneously, review itemized proposals, request revisions, and accept bids.
4. **15-Stage Live Manufacturing Tracker**: Complete transparency from Chassis Inward and Structural Roll-Cage Fabrication to ARAI Safety Inspection and Vehicle Handover.
5. **Role-Based Portals**: Tailored dashboards for **Customers/Fleet Operators**, **Workshop Owners/Foremen**, and **Platform Administrators**.

---

## 2. Visual Design System

Built with an industrial-premium aesthetic inspired by leading commercial vehicle manufacturers (e.g., DVN Coach):

| Element | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Deep Navy** | `#172638` | Structural primary backgrounds and headers |
| **Warm Ivory** | `#F5F2EB` | High-contrast readable surface accents |
| **Copper Accent** | `#B76E3C` | Call-to-action buttons, key milestones, and highlights |
| **Sage Green** | `#6E8878` | Verified badges, success states, and ARAI certifications |
| **Graphite** | `#30363D` | Technical card borders and specification dividers |

---

## 3. Technology Stack

### Frontend
- **React 19** with **Vite 8**
- **TypeScript** (Strict Type Safety)
- **Tailwind CSS v4** (Industrial Theme & Blueprint Grid Styling)
- **Lucide React** (Engineering & Automotive Icons)
- **Recharts** (Production Pipeline & KPI Analytics)
- **Framer Motion / CSS Transitions** (Subtle, professional animations)
- **React Context API** (Full offline state persistence via `localStorage`)

### Backend
- **Node.js** & **Express.js** (REST API Architecture)
- **MongoDB** & **Mongoose** (ODM Schema validation)
- **JWT (JSON Web Tokens)** (Stateless Authentication)
- **bcryptjs** (Salted password hashing)
- **CORS** & Centralized Error Handling

---

## 4. Key Platform Features

### A. Workshop Discovery Marketplace & Comparison Matrix
- Search by district (**Karur, Namakkal, Coimbatore, Chennai, Salem, Madurai**), vehicle category, minimum rating, or verified status.
- Interactive district cluster map displaying workshop densities and regional specializations.
- **Side-by-Side Comparison Matrix**: Select up to 3 workshops to evaluate lead times, warranties, starting prices, and ARAI certifications.

### B. 8-Step Budget Planner & Smart Optimizer
- Step-by-step wizard for both **Bus** (Tourist, Sleeper, School, Mofussil) and **Lorry** (Tipper, Container, Open Body, Reefer).
- **Persistent sticky summary card** with itemized cost estimation:
  - Base Fabrication & Steel Framing
  - Paneling & 2K Polyurethane Painting
  - Interior Seating & Ergonomics
  - Electricals, Air Conditioning & Hydraulics
  - Labour & GST (18%)
- **Smart Budget Optimizer**: If configuration exceeds target budget, automated suggestions provide 1-click feature adjustments (e.g., Harita Pushback to Semi-Deluxe, 2K Paint to Polyurethane Primer).

### C. 15-Stage Manufacturing Tracker
Visual timeline tracking every vehicle build through 15 standardized factory stages:
1. Order & Specification Confirmation
2. Chassis Receiving
3. Chassis Inspection
4. Design & Engineering Approval
5. Material Procurement
6. Frame Fabrication
7. Sheet Metal Paneling
8. Doors & Windows Fitment
9. Anti-Corrosion Primer & Painting
10. Electrical Installation
11. Interior & Seating Fitment
12. Safety & Quality Inspection (AIS-052)
13. Road Testing & Trial
14. Final Approval & RTO Clearance
15. Vehicle Handover & Delivery

Each stage records assigned foremen, completion percentages, inspection logs, delay notices, and photographic evidence.

### D. Verified Multi-Metric Reviews
- Reviews can only be submitted by verified customers with active or completed projects.
- Rates **Workmanship**, **Communication**, and **Delivery Experience** on a 5-star scale.
- Workshop owners can respond directly to customer reviews.

---

## 5. Demo Accounts & 1-Click Persona Switcher

The top navigation bar includes a **Quick Demo Switcher** allowing instant persona testing without manual sign-in:

| Role | Demo Email | Password | Access Capabilities |
| :--- | :--- | :--- | :--- |
| **Customer** | `karthik@srmtravels.in` | `Customer@2026Password` | RFQ submissions, live vehicle tracker, budget planner |
| **Workshop Owner** | `selvam@karurcoach.in` | `Owner@2026Password` | 15-stage fabrication updater, quote generator, profile editor |
| **Administrator** | `admin@bodycraft.tn` | `Admin@2026Password` | Workshop KYC verification, platform analytics, system oversight |

*Note: Public registration strictly prevents self-assigning Administrator privileges.*

---

## 6. Installation & Setup Guide

### Prerequisites
- **Node.js** (v18.x or newer)
- **npm** (v9.x or newer)
- **MongoDB** (Local instance or MongoDB Atlas connection string)

### 1. Frontend Setup
```bash
# Clone and enter directory
cd d:/2026gaali/BUS

# Install frontend dependencies
npm install

# Build production bundle
npm run build

# Start frontend development server
npm run dev
```
The frontend application will be running at `http://localhost:5173`.

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Copy environment variables
copy .env.example .env

# Seed initial Tamil Nadu workshops and demo users
npm run seed

# Start Express server
npm run dev
# or for production: npm start
```
The backend API server will be running at `http://localhost:5000`.

---

## 7. REST API Reference

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Public | System status and supported regional clusters |
| `POST` | `/api/auth/register` | Public | Register customer or workshop owner |
| `POST` | `/api/auth/login` | Public | JWT authentication login |
| `GET` | `/api/auth/me` | Private | Current user profile |
| `GET` | `/api/workshops` | Public | Filterable list of workshops |
| `GET` | `/api/workshops/:id` | Public | Single workshop profile with reviews |
| `POST` | `/api/workshops/compare` | Public | Side-by-side comparison for up to 3 workshops |
| `PATCH` | `/api/workshops/:id/verify` | Admin | Approve or reject workshop KYC |
| `POST` | `/api/quotations/rfq` | Customer | Submit multi-workshop RFQ |
| `GET` | `/api/quotations` | Private | List quotations for authenticated user |
| `POST` | `/api/quotations/:id/accept` | Customer | Accept quotation and launch 15-stage project |
| `GET` | `/api/projects` | Private | Active manufacturing projects |
| `PATCH` | `/api/projects/:id/stages/:num`| Workshop | Update stage progress, notes, or photos |
| `POST` | `/api/reviews` | Customer | Submit verified project review |

---

## 8. Configuration

The platform name and branding are configurable via `src/types/index.ts`:
```typescript
export const PLATFORM_NAME = 'BODYCRAFT TN — Bus & Lorry Body Building Platform';
```
And in backend `.env`:
```env
PLATFORM_NAME="BODYCRAFT TN — Bus & Lorry Body Building Platform"
```
# chassiscraft
