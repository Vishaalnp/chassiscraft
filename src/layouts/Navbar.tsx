import React, { useState } from 'react';
import {
  ArrowRightLeft,
  ChevronDown,
  Compass,
  Layers3,
  LogOut,
  Menu,
  Sparkles,
  Truck,
  UserCircle,
  X,
} from 'lucide-react';
import { useAuth } from '../store/AuthContext';
import { useApp } from '../store/AppContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const primaryLinks = [
  { id: 'home', label: 'Home' },
  { id: 'find-workshops', label: 'Workshops' },
  { id: 'bus-types', label: 'Bus bodies' },
  { id: 'lorry-types', label: 'Lorry bodies' },
  { id: 'gallery', label: 'Projects' },
];

const discoverLinks = [
  { id: 'chassis', label: 'Chassis catalogue' },
  { id: 'designs', label: 'Body designs' },
  { id: 'materials', label: 'Materials & technology' },
  { id: 'process', label: 'Manufacturing process' },
  { id: 'safety', label: 'Safety standards' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useAuth();
  const { comparisonWorkshopIds } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [discoverOpen, setDiscoverOpen] = useState(false);

  const goTo = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setDiscoverOpen(false);
  };

  const openPortal = () => {
    if (user?.role === 'ADMIN') goTo('admin-dashboard');
    else if (user?.role === 'WORKSHOP_OWNER') goTo('workshop-dashboard');
    else goTo('customer-dashboard');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0d1520]/90 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="border-b border-white/5 bg-[#09111b]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-[11px] text-slate-400 sm:px-6 lg:px-8">
          <p className="hidden items-center gap-2 sm:flex">
            <span className="live-dot" />
            <span>Trusted vehicle body builders across Tamil Nadu</span>
          </p>
          <p className="ml-auto font-mono tracking-wide text-slate-500">KARUR · NAMAKKAL · COIMBATORE · CHENNAI</p>
        </div>
      </div>

      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <button onClick={() => goTo('home')} className="group flex shrink-0 items-center gap-3 text-left">
          <span className="brand-mark">
            <Truck className="h-6 w-6" />
          </span>
          <span>
            <span className="block font-display text-lg font-extrabold tracking-[0.16em] text-white sm:text-xl">
              BODYCRAFT <b className="text-[#e39a68]">TN</b>
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.2em] text-slate-500 sm:block">
              Build with confidence
            </span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {primaryLinks.map(link => (
            <button
              key={link.id}
              onClick={() => goTo(link.id)}
              className={`nav-link ${activeTab === link.id ? 'nav-link-active' : ''}`}
            >
              {link.label}
            </button>
          ))}
          <div className="relative">
            <button
              onClick={() => setDiscoverOpen(value => !value)}
              className={`nav-link flex items-center gap-1 ${discoverLinks.some(link => link.id === activeTab) ? 'nav-link-active' : ''}`}
            >
              Explore <ChevronDown className={`h-3.5 w-3.5 transition-transform ${discoverOpen ? 'rotate-180' : ''}`} />
            </button>
            {discoverOpen && (
              <div className="absolute right-0 top-full mt-3 w-60 rounded-2xl border border-white/10 bg-[#152437] p-2 shadow-2xl">
                {discoverLinks.map(link => (
                  <button
                    key={link.id}
                    onClick={() => goTo(link.id)}
                    className="block w-full rounded-xl px-3 py-2.5 text-left text-xs text-slate-300 transition hover:bg-white/10 hover:text-white"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {comparisonWorkshopIds.length > 0 && (
            <button onClick={() => goTo('compare-workshops')} className="secondary-action animate-pulse-slow">
              <ArrowRightLeft className="h-3.5 w-3.5" /> Compare {comparisonWorkshopIds.length}
            </button>
          )}
          <button onClick={() => goTo('budget-planner')} className="primary-action">
            <Sparkles className="h-3.5 w-3.5" /> Plan your build
          </button>
          {user ? (
            <div className="flex items-center gap-1">
              <button onClick={openPortal} className="secondary-action">
                <UserCircle className="h-4 w-4 text-[#e39a68]" />
                <span className="max-w-28 truncate">My workspace</span>
              </button>
              <button onClick={logout} title="Sign out" className="icon-action">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button onClick={() => goTo('login')} className="secondary-action">
              Sign in <span aria-hidden="true">→</span>
            </button>
          )}
        </div>

        <button
          onClick={() => setMobileMenuOpen(value => !value)}
          className="icon-action md:hidden"
          aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#0d1520] px-4 py-4 md:hidden">
          <div className="grid grid-cols-2 gap-2 pb-4">
            <button onClick={() => goTo('budget-planner')} className="primary-action justify-center">
              <Sparkles className="h-3.5 w-3.5" /> Plan your build
            </button>
            <button onClick={() => goTo('find-workshops')} className="secondary-action justify-center">
              <Compass className="h-3.5 w-3.5" /> Find workshops
            </button>
          </div>
          <div className="grid grid-cols-2 gap-1 border-y border-white/10 py-3">
            {[...primaryLinks, ...discoverLinks].map(link => (
              <button
                key={link.id}
                onClick={() => goTo(link.id)}
                className={`rounded-xl px-3 py-2.5 text-left text-xs ${activeTab === link.id ? 'bg-white/10 font-semibold text-[#e39a68]' : 'text-slate-300'}`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between pt-4">
            {user ? (
              <>
                <button onClick={openPortal} className="secondary-action">
                  <Layers3 className="h-4 w-4" /> Open workspace
                </button>
                <button onClick={logout} className="text-xs text-rose-300">Sign out</button>
              </>
            ) : (
              <>
                <button onClick={() => goTo('login')} className="secondary-action">Sign in</button>
                <button onClick={() => goTo('register')} className="text-xs font-semibold text-[#e39a68]">Create account →</button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
