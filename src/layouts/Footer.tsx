import React from 'react';
import { Truck, ShieldCheck, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { PLATFORM_NAME, PLATFORM_SHORT_NAME, PLATFORM_TAGLINE } from '../types';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-[#0E1622] border-t border-[#30363D] text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#B76E3C] to-[#CF8754] flex items-center justify-center text-white font-bold">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <span className="font-black text-xl text-white tracking-wider">{PLATFORM_SHORT_NAME}</span>
              <p className="text-[10px] text-[#E29765] font-mono tracking-wider">Tamil Nadu</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Connecting vehicle owners, transport operators, and logistics businesses with trusted, verified bus and lorry body-building workshops across Karur, Namakkal, Coimbatore, Chennai, and Salem.
          </p>
          <div className="flex items-center space-x-2 text-xs text-[#8EAB98] bg-[#172638] border border-[#30363D] p-2.5 rounded-lg">
            <ShieldCheck className="w-4 h-4 text-[#8EAB98] shrink-0" />
            <span>Compliance-aware builders with documented specifications</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider font-mono text-[#E29765]">
            Marketplace
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setActiveTab('find-workshops')} className="hover:text-[#E29765] transition-colors flex items-center">
                <ArrowRight className="w-3 h-3 mr-1.5 text-[#B76E3C]" /> Find Workshops
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('bus-types')} className="hover:text-[#E29765] transition-colors flex items-center">
                <ArrowRight className="w-3 h-3 mr-1.5 text-[#B76E3C]" /> Bus Body Building
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('lorry-types')} className="hover:text-[#E29765] transition-colors flex items-center">
                <ArrowRight className="w-3 h-3 mr-1.5 text-[#B76E3C]" /> Lorry & Truck Bodies
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('budget-planner')} className="hover:text-[#E29765] transition-colors flex items-center">
                <ArrowRight className="w-3 h-3 mr-1.5 text-[#B76E3C]" /> Budget Planner Wizard
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('gallery')} className="hover:text-[#E29765] transition-colors flex items-center">
                <ArrowRight className="w-3 h-3 mr-1.5 text-[#B76E3C]" /> Completed Projects
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('process')} className="hover:text-[#E29765] transition-colors flex items-center">
                <ArrowRight className="w-3 h-3 mr-1.5 text-[#B76E3C]" /> 15-Stage Manufacturing Workflow
              </button>
            </li>
          </ul>
        </div>

        {/* Tamil Nadu Hubs */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider font-mono text-[#E29765]">
            Tamil Nadu Clusters
          </h4>
          <ul className="space-y-2 text-xs">
            <li className="flex items-start space-x-2">
              <MapPin className="w-3.5 h-3.5 text-[#B76E3C] mt-0.5 shrink-0" />
              <div>
                <span className="text-white font-medium">Karur Hub</span>
                <p className="text-[11px] text-slate-400">Bus coachbuilding capital: Sleeper coaches, luxury tourist, route buses.</p>
              </div>
            </li>
            <li className="flex items-start space-x-2">
              <MapPin className="w-3.5 h-3.5 text-[#B76E3C] mt-0.5 shrink-0" />
              <div>
                <span className="text-white font-medium">Namakkal Hub</span>
                <p className="text-[11px] text-slate-400">Heavy haulage capital: Rock tippers, containers, multi-axle trailers.</p>
              </div>
            </li>
            <li className="flex items-start space-x-2">
              <MapPin className="w-3.5 h-3.5 text-[#B76E3C] mt-0.5 shrink-0" />
              <div>
                <span className="text-white font-medium">Coimbatore & Chennai</span>
                <p className="text-[11px] text-slate-400">School/staff buses, city transit, and urban e-commerce bodies.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Contact & Support */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider font-mono text-[#E29765]">
            Helpdesk & Liaison
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-[#E29765]" />
              <span>Support for enquiries and build planning</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-[#E29765]" />
              <span>support@bodycraft-tn.in</span>
            </div>
            <p className="text-[11px] text-slate-400 pt-2 leading-relaxed">
              Operating Hours: Monday – Saturday, 8:30 AM – 7:30 PM IST. Dedicated technical support for fleet quotes and RTO inspections.
            </p>
          </div>
        </div>
      </div>

      {/* Legal & Notice */}
      <div className="bg-[#0B1019] border-t border-[#30363D] px-4 py-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div>
            © {new Date().getFullYear()} {PLATFORM_NAME}. All rights reserved.
          </div>
          <div className="text-[11px] text-slate-400 text-center md:text-right">
            Indicative prices and lead times are starting points. Final scope, compliance documents, and delivery dates are confirmed directly with the selected workshop.
          </div>
        </div>
      </div>
    </footer>
  );
};
