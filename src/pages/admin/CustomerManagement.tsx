import React from 'react';
import { MOCK_CUSTOMERS } from '../../data/mockCustomers';
import { Users, Mail, Phone, Building } from 'lucide-react';

export const CustomerManagement: React.FC = () => {
  return (
    <div className="space-y-6 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <h1 className="text-2xl font-black text-white">Customer & Fleet Accounts Directory</h1>
        <p className="text-slate-400 text-xs mt-1">Manage transport companies, school boards, fleet owners, and individual buyers.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="p-3">Customer Name</th>
              <th className="p-3">Company / Fleet</th>
              <th className="p-3">Category Type</th>
              <th className="p-3">Email & Phone</th>
              <th className="p-3">GST Registration</th>
              <th className="p-3">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {MOCK_CUSTOMERS.map((c) => (
              <tr key={c.id} className="hover:bg-slate-950">
                <td className="p-3 font-bold text-white">{c.name}</td>
                <td className="p-3 text-cyan-400 font-bold">{c.company || 'Individual'}</td>
                <td className="p-3 text-amber-400">{c.customerType || 'Customer'}</td>
                <td className="p-3 text-slate-300">{c.email} • {c.phone}</td>
                <td className="p-3 text-slate-400">{c.gstNumber || 'N/A'}</td>
                <td className="p-3 font-bold text-emerald-400">{c.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
