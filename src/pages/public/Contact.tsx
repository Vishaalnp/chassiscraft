import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-slate-100">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/50">
          Get In Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">Contact Automotive Engineering Team</h1>
        <p className="text-slate-400 text-sm">Schedule a plant visit, request bulk fleet quotations, or speak to our technical sales engineers.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <h2 className="text-xl font-bold text-white">Plant Headquarters</h2>
          <div className="space-y-4 text-xs text-slate-300">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white">Factory Plant & Engineering Bay</p>
                <p className="text-slate-400">Regional support desk serving Karur, Namakkal, Coimbatore, Chennai, Salem and Madurai.</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="font-bold text-white">Toll Free Hotline</p>
                <p className="text-slate-400">Connect with a vehicle specialist through your workspace.</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-sky-400 shrink-0" />
              <div>
                <p className="font-bold text-white">Email Enquiries</p>
                <p className="text-slate-400">support@bodycraft-tn.in</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-950 border border-emerald-800 rounded-full flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Inquiry Received Successfully!</h3>
              <p className="text-slate-400 text-xs">Our chief sales engineer will contact you within 2 business hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-bold text-white">Send Direct Message</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Your Name</label>
                  <input required type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:border-rose-500 outline-none" placeholder="Rajesh Sharma" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Company / Fleet Name</label>
                  <input required type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:border-rose-500 outline-none" placeholder="Apex Travels" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Email Address</label>
                  <input required type="email" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:border-rose-500 outline-none" placeholder="rajesh@apex.in" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Phone Number</label>
                  <input required type="tel" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:border-rose-500 outline-none" placeholder="+91 98765 43210" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Vehicle Requirements / Message</label>
                <textarea required rows={4} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:border-rose-500 outline-none" placeholder="Interested in 5 units of 36-seater executive luxury coaches on Ashok Leyland chassis..." />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center space-x-2">
                <Send className="w-4 h-4" />
                <span>Submit Technical Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
