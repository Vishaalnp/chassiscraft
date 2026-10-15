import React from 'react';
import { useAuth } from '../../store/AuthContext';
import { User, Building, Mail, Phone, ShieldCheck, FileText } from 'lucide-react';

export const CustomerProfile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center space-x-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white text-2xl font-black">
          {user?.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-2xl font-black text-white">{user?.name}</h1>
          <p className="text-slate-400 text-xs font-mono">{user?.company || 'Fleet Account'} • {user?.customerType || 'Customer'}</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Account Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div>
            <span className="text-slate-500 block">Email Address</span>
            <span className="text-white font-semibold">{user?.email}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Phone Number</span>
            <span className="text-white font-semibold">{user?.phone}</span>
          </div>
          <div>
            <span className="text-slate-500 block">GST Identification</span>
            <span className="text-amber-400 font-semibold">{user?.gstNumber || '27AAACA12341Z5'}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Role Level</span>
            <span className="text-cyan-400 font-semibold">{user?.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
