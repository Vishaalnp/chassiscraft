import React, { useState } from 'react';
import { AuthProvider, useAuth } from './store/AuthContext';
import { AppProvider } from './store/AppContext';
import { ConfiguratorProvider } from './store/ConfiguratorContext';
import { Navbar } from './layouts/Navbar';
import { Footer } from './layouts/Footer';

// Public Pages
import { Home } from './pages/public/Home';
import { FindWorkshops } from './pages/public/FindWorkshops';
import { CompareWorkshops } from './pages/public/CompareWorkshops';
import { BusTypes } from './pages/public/BusTypes';
import { LorryTypes } from './pages/public/LorryTypes';
import { About } from './pages/public/About';
import { Services } from './pages/public/Services';
import { ChassisCatalog } from './pages/public/ChassisCatalog';
import { BodyDesigns } from './pages/public/BodyDesigns';
import { Gallery } from './pages/public/Gallery';
import { ManufacturingProcess } from './pages/public/ManufacturingProcess';
import { MaterialsTech } from './pages/public/MaterialsTech';
import { SafetyFeatures } from './pages/public/SafetyFeatures';
import { Contact } from './pages/public/Contact';
import { Login } from './pages/public/Login';
import { Register } from './pages/public/Register';

// Customer Pages
import { CustomerDashboard } from './pages/customer/CustomerDashboard';
import { MyVehicles } from './pages/customer/MyVehicles';
import { ConfiguratorWizard } from './pages/customer/ConfiguratorWizard';
import { QuotationTracker } from './pages/customer/QuotationTracker';
import { ProjectTracking } from './pages/customer/ProjectTracking';
import { CustomerProfile } from './pages/customer/CustomerProfile';

// Workshop Owner Pages
import { WorkshopDashboard } from './pages/workshop/WorkshopDashboard';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { QuotationManagement } from './pages/admin/QuotationManagement';
import { ProductionTracking } from './pages/admin/ProductionTracking';
import { ChassisManagement } from './pages/admin/ChassisManagement';
import { MaterialManagement } from './pages/admin/MaterialManagement';
import { PaymentManagement } from './pages/admin/PaymentManagement';
import { CustomerManagement } from './pages/admin/CustomerManagement';
import { Reports } from './pages/admin/Reports';
import { Settings } from './pages/admin/Settings';

import { BarChart2, UserCircle, Wrench, ShieldCheck, FileText, Truck, Sparkles, Layers, Building2 } from 'lucide-react';

const MainContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const { user } = useAuth();

  const isCustomerPortal = activeTab.startsWith('customer-') || activeTab === 'my-vehicles' || activeTab === 'quotation-tracker' || activeTab === 'project-tracking';
  const isWorkshopPortal = activeTab.startsWith('workshop-');
  const isAdminPortal = activeTab.startsWith('admin-') || activeTab.endsWith('-management') || activeTab === 'reports' || activeTab === 'settings' || activeTab === 'production-tracking';

  return (
    <div className="min-h-screen bg-[#0E1622] text-[#F5F2EB] flex flex-col justify-between selection:bg-[#B76E3C] selection:text-white font-sans">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Customer Portal Breadcrumb Sub-Header */}
      {isCustomerPortal && (
        <div className="bg-[#172638] border-b border-[#30363D] px-4 py-2 text-xs font-mono flex flex-wrap items-center justify-between gap-2 text-slate-300 max-w-7xl mx-auto w-full">
          <div className="flex items-center space-x-2">
            <span className="text-sky-400 font-bold flex items-center">
              <UserCircle className="w-3.5 h-3.5 mr-1" /> Customer Fleet Workspace
            </span>
            <span>/</span>
            <span className="text-white capitalize">{activeTab.replace('-', ' ')}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('customer-dashboard')}
              className={`px-2.5 py-1 rounded transition-colors ${activeTab === 'customer-dashboard' ? 'bg-[#B76E3C] text-white font-bold' : 'hover:bg-[#0E1622]'}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('budget-planner')}
              className={`px-2.5 py-1 rounded transition-colors ${activeTab === 'budget-planner' ? 'bg-[#B76E3C] text-white font-bold' : 'hover:bg-[#0E1622]'}`}
            >
              Budget Planner
            </button>
            <button
              onClick={() => setActiveTab('quotation-tracker')}
              className={`px-2.5 py-1 rounded transition-colors ${activeTab === 'quotation-tracker' ? 'bg-[#B76E3C] text-white font-bold' : 'hover:bg-[#0E1622]'}`}
            >
              Quotations
            </button>
            <button
              onClick={() => setActiveTab('project-tracking')}
              className={`px-2.5 py-1 rounded transition-colors ${activeTab === 'project-tracking' ? 'bg-[#B76E3C] text-white font-bold' : 'hover:bg-[#0E1622]'}`}
            >
              15-Stage Tracker
            </button>
          </div>
        </div>
      )}

      {/* Workshop Owner Breadcrumb Sub-Header */}
      {isWorkshopPortal && (
        <div className="bg-[#172638] border-b border-[#B76E3C]/40 px-4 py-2 text-xs font-mono flex flex-wrap items-center justify-between gap-2 text-slate-300 max-w-7xl mx-auto w-full">
          <div className="flex items-center space-x-2">
            <span className="text-[#E29765] font-bold flex items-center">
              <Building2 className="w-3.5 h-3.5 mr-1" /> Workshop Yard Workspace
            </span>
            <span>/</span>
            <span className="text-white capitalize">{activeTab.replace('-', ' ')}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('workshop-dashboard')}
              className={`px-2.5 py-1 rounded transition-colors ${activeTab === 'workshop-dashboard' ? 'bg-[#B76E3C] text-white font-bold' : 'hover:bg-[#0E1622]'}`}
            >
              Foreman Console
            </button>
            <button
              onClick={() => setActiveTab('find-workshops')}
              className="px-2.5 py-1 rounded text-slate-300 hover:text-white hover:bg-[#0E1622]"
            >
              Public Profile
            </button>
          </div>
        </div>
      )}

      {/* Admin Portal Breadcrumb Sub-Header */}
      {isAdminPortal && (
        <div className="bg-[#172638] border-b border-[#6E8878]/50 px-4 py-2 text-xs font-mono flex flex-wrap items-center justify-between gap-2 text-slate-300 max-w-7xl mx-auto w-full">
          <div className="flex items-center space-x-2">
            <span className="text-[#8EAB98] font-bold flex items-center">
              <BarChart2 className="w-3.5 h-3.5 mr-1 text-[#8EAB98]" /> Platform Operations Console
            </span>
            <span>/</span>
            <span className="text-white capitalize">{activeTab.replace('-', ' ')}</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveTab('admin-dashboard')}
              className={`px-2.5 py-1 rounded transition-colors ${activeTab === 'admin-dashboard' ? 'bg-[#6E8878] text-white font-bold' : 'bg-[#0E1622] hover:bg-[#1E324A]'}`}
            >
              Overview & KYC
            </button>
            <button
              onClick={() => setActiveTab('quotation-management')}
              className={`px-2 py-0.5 rounded transition-colors ${activeTab === 'quotation-management' ? 'bg-[#6E8878] text-white font-bold' : 'bg-[#0E1622] hover:bg-[#1E324A]'}`}
            >
              Quotes Queue
            </button>
            <button
              onClick={() => setActiveTab('production-tracking')}
              className={`px-2 py-0.5 rounded transition-colors ${activeTab === 'production-tracking' ? 'bg-[#6E8878] text-white font-bold' : 'bg-[#0E1622] hover:bg-[#1E324A]'}`}
            >
              Factory Floor
            </button>
            <button
              onClick={() => setActiveTab('chassis-management')}
              className={`px-2 py-0.5 rounded transition-colors ${activeTab === 'chassis-management' ? 'bg-[#6E8878] text-white font-bold' : 'bg-[#0E1622] hover:bg-[#1E324A]'}`}
            >
              Chassis Catalog
            </button>
            <button
              onClick={() => setActiveTab('material-management')}
              className={`px-2 py-0.5 rounded transition-colors ${activeTab === 'material-management' ? 'bg-[#6E8878] text-white font-bold' : 'bg-[#0E1622] hover:bg-[#1E324A]'}`}
            >
              Materials
            </button>
            <button
              onClick={() => setActiveTab('payment-management')}
              className={`px-2 py-0.5 rounded transition-colors ${activeTab === 'payment-management' ? 'bg-[#6E8878] text-white font-bold' : 'bg-[#0E1622] hover:bg-[#1E324A]'}`}
            >
              Payments
            </button>
            <button
              onClick={() => setActiveTab('customer-management')}
              className={`px-2 py-0.5 rounded transition-colors ${activeTab === 'customer-management' ? 'bg-[#6E8878] text-white font-bold' : 'bg-[#0E1622] hover:bg-[#1E324A]'}`}
            >
              Users
            </button>
          </div>
        </div>
      )}

      {/* Dynamic View Router Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* PUBLIC PAGES */}
        {activeTab === 'home' && <Home setActiveTab={setActiveTab} />}
        {activeTab === 'find-workshops' && <FindWorkshops setActiveTab={setActiveTab} />}
        {activeTab === 'compare-workshops' && <CompareWorkshops setActiveTab={setActiveTab} />}
        {activeTab === 'bus-types' && <BusTypes setActiveTab={setActiveTab} />}
        {activeTab === 'lorry-types' && <LorryTypes setActiveTab={setActiveTab} />}
        {activeTab === 'budget-planner' && <ConfiguratorWizard setActiveTab={setActiveTab} />}
        {activeTab === 'configurator-wizard' && <ConfiguratorWizard setActiveTab={setActiveTab} />}
        {activeTab === 'about' && <About />}
        {activeTab === 'services' && <Services setActiveTab={setActiveTab} />}
        {activeTab === 'chassis' && <ChassisCatalog setActiveTab={setActiveTab} />}
        {activeTab === 'designs' && <BodyDesigns setActiveTab={setActiveTab} />}
        {activeTab === 'gallery' && <Gallery />}
        {activeTab === 'process' && <ManufacturingProcess />}
        {activeTab === 'materials' && <MaterialsTech />}
        {activeTab === 'safety' && <SafetyFeatures />}
        {activeTab === 'contact' && <Contact />}
        {activeTab === 'login' && <Login setActiveTab={setActiveTab} />}
        {activeTab === 'register' && <Register setActiveTab={setActiveTab} />}

        {/* CUSTOMER PORTAL */}
        {activeTab === 'customer-dashboard' && <CustomerDashboard setActiveTab={setActiveTab} />}
        {activeTab === 'my-vehicles' && <MyVehicles setActiveTab={setActiveTab} />}
        {activeTab === 'quotation-tracker' && <QuotationTracker setActiveTab={setActiveTab} />}
        {activeTab === 'project-tracking' && <ProjectTracking />}
        {activeTab === 'customer-profile' && <CustomerProfile />}

        {/* WORKSHOP OWNER PORTAL */}
        {activeTab === 'workshop-dashboard' && <WorkshopDashboard setActiveTab={setActiveTab} />}

        {/* ADMIN PORTAL */}
        {activeTab === 'admin-dashboard' && <AdminDashboard setActiveTab={setActiveTab} />}
        {activeTab === 'quotation-management' && <QuotationManagement />}
        {activeTab === 'production-tracking' && <ProductionTracking />}
        {activeTab === 'chassis-management' && <ChassisManagement />}
        {activeTab === 'material-management' && <MaterialManagement />}
        {activeTab === 'payment-management' && <PaymentManagement />}
        {activeTab === 'customer-management' && <CustomerManagement />}
        {activeTab === 'reports' && <Reports />}
        {activeTab === 'settings' && <Settings />}
      </main>

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <ConfiguratorProvider>
          <MainContent />
        </ConfiguratorProvider>
      </AppProvider>
    </AuthProvider>
  );
}
