import React, { useState } from 'react';
import { useAuth } from '../../store/AuthContext';
import { Truck, ArrowRight, Building2, Mail, User, Phone, Lock, UserCircle, MapPin } from 'lucide-react';
import { UserRole } from '../../types';

interface RegisterProps {
  setActiveTab: (tab: string) => void;
}

export const Register: React.FC<RegisterProps> = ({ setActiveTab }) => {
  const { login } = useAuth();
  const [accountType, setAccountType] = useState<'CUSTOMER' | 'WORKSHOP_OWNER'>('CUSTOMER');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    district: 'Karur',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match. Please verify.');
      return;
    }

    login(formData.email, accountType);
    if (accountType === 'WORKSHOP_OWNER') {
      setActiveTab('workshop-dashboard');
    } else {
      setActiveTab('customer-dashboard');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-[#172638] border border-[#30363D] rounded-2xl p-8 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#B76E3C] to-[#CF8754] flex items-center justify-center text-white font-bold mx-auto">
            <Truck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-white">Join BODYCRAFT TN</h1>
          <p className="text-slate-400 text-xs">Register your fleet or workshop for commercial vehicle bodybuilding management</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Account Type Selection */}
          <div>
            <label className="block text-xs font-mono text-[#E29765] font-bold mb-1.5 uppercase">Select Account Type:</label>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                type="button"
                onClick={() => setAccountType('CUSTOMER')}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center space-y-1 ${
                  accountType === 'CUSTOMER'
                    ? 'bg-[#B76E3C]/20 border-[#B76E3C] text-white font-bold shadow'
                    : 'bg-[#0E1622] border-[#30363D] text-slate-400 hover:text-white'
                }`}
              >
                <UserCircle className="w-5 h-5 text-sky-400" />
                <span>Customer / Fleet Operator</span>
              </button>

              <button
                type="button"
                onClick={() => setAccountType('WORKSHOP_OWNER')}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center space-y-1 ${
                  accountType === 'WORKSHOP_OWNER'
                    ? 'bg-[#B76E3C]/20 border-[#B76E3C] text-white font-bold shadow'
                    : 'bg-[#0E1622] border-[#30363D] text-slate-400 hover:text-white'
                }`}
              >
                <Building2 className="w-5 h-5 text-[#B76E3C]" />
                <span>Workshop Owner / Fabricator</span>
              </button>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              * Note: Administrator privileges cannot be registered publicly and require state platform credentialing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="E.g., R. Murugan"
                  className="w-full bg-[#0E1622] border border-[#30363D] rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:border-[#B76E3C] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Company / Fleet Name</label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  placeholder="E.g., Murugan Transport"
                  className="w-full bg-[#0E1622] border border-[#30363D] rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:border-[#B76E3C] outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="murugan@transport.in"
                  className="w-full bg-[#0E1622] border border-[#30363D] rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:border-[#B76E3C] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Mobile (+91)</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98427 12345"
                  className="w-full bg-[#0E1622] border border-[#30363D] rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:border-[#B76E3C] outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">District / Cluster Hub</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <select
                value={formData.district}
                onChange={e => setFormData({ ...formData, district: e.target.value })}
                className="w-full bg-[#0E1622] border border-[#30363D] rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:border-[#B76E3C] outline-none"
              >
                <option value="Karur">Karur (Bus Coach Capital)</option>
                <option value="Namakkal">Namakkal (Lorry & Tipper Capital)</option>
                <option value="Coimbatore">Coimbatore (Staff & Institutional)</option>
                <option value="Salem">Salem (Route Buses & Freight)</option>
                <option value="Chennai">Chennai (City & Containers)</option>
                <option value="Madurai">Madurai (Tourist & Reefers)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  required
                  type="password"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-[#0E1622] border border-[#30363D] rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:border-[#B76E3C] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  required
                  type="password"
                  value={formData.confirmPassword}
                  onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-[#0E1622] border border-[#30363D] rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:border-[#B76E3C] outline-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#B76E3C] hover:bg-[#CF8754] text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 transition-all shadow-md mt-2"
          >
            <span>Register Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-400">
          Already have an account?{' '}
          <button
            onClick={() => setActiveTab('login')}
            className="text-[#E29765] font-bold hover:underline"
          >
            Sign In Here
          </button>
        </div>
      </div>
    </div>
  );
};
