import React, { useState } from 'react';
import { useAuth } from '../../store/AuthContext';
import { Truck, Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface LoginProps {
  setActiveTab: (tab: string) => void;
}

export const Login: React.FC<LoginProps> = ({ setActiveTab }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (login(email.trim())) {
      setActiveTab('customer-dashboard');
    } else {
      setError('We could not sign you in with those details. Check your email and try again.');
    }
  };

  return (
    <div className="relative flex min-h-[78vh] items-center justify-center overflow-hidden px-4 py-12">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b76e3c]/10 blur-[120px]" />
      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/10 bg-[#152437] shadow-2xl shadow-black/30 lg:grid-cols-[1.05fr_.95fr]">
        <div className="hidden min-h-[620px] flex-col justify-between bg-[linear-gradient(145deg,rgba(14,22,34,.35),rgba(14,22,34,.94)),url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=85&w=1200')] bg-cover bg-center p-10 lg:flex">
          <div>
            <div className="mb-8 flex items-center gap-3">
              <div className="brand-mark">
                <Truck className="h-6 w-6" />
              </div>
              <span className="font-display text-lg font-bold tracking-[.14em] text-white">BODYCRAFT <b className="text-[#e39a68]">TN</b></span>
            </div>
            <span className="rounded-full border border-[#e39a68]/40 bg-black/20 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.16em] text-[#f0b184]">
              One workspace for every build
            </span>
            <h2 className="mt-6 max-w-md font-display text-4xl font-bold leading-tight text-white">
              Bring your next vehicle to life.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
              Compare builders, shape the right specification, and keep every milestone in one clear workspace.
            </p>
          </div>
          <div className="space-y-3 text-xs text-slate-200">
            {['Verified regional builders', 'Transparent build estimates', 'Photo-led production updates'].map(item => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#9dbca6]" /> {item}
              </div>
            ))}
          </div>
        </div>

        <div className="p-7 sm:p-10">
          <div className="mb-8 text-center lg:text-left">
            <div className="brand-mark mx-auto mb-4 lg:hidden">
              <Truck className="h-6 w-6" />
            </div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[.18em] text-[#e39a68]">Welcome back</p>
            <h1 className="font-display text-3xl font-bold text-white">Sign in to your workspace</h1>
            <p className="mt-2 text-sm text-slate-400">Manage your vehicle build from enquiry to handover.</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-300">Work email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" className="w-full rounded-xl border border-white/10 bg-[#0d1520] py-3 pl-10 pr-3 text-sm text-white outline-none transition focus:border-[#c87945] focus:ring-2 focus:ring-[#c87945]/20" />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                <input required type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" className="w-full rounded-xl border border-white/10 bg-[#0d1520] py-3 pl-10 pr-10 text-sm text-white outline-none transition focus:border-[#c87945] focus:ring-2 focus:ring-[#c87945]/20" />
                <button
                  type="button"
                  onClick={() => setShowPassword(value => !value)}
                  className="absolute right-3 top-2.5 text-slate-500 transition hover:text-white"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {error && (
              <div role="alert" className="flex items-start gap-2 rounded-xl border border-rose-400/30 bg-rose-400/10 px-3 py-2.5 text-xs leading-5 text-rose-200">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-400"><input type="checkbox" className="accent-[#c87945]" /> Keep me signed in</label>
              <button type="button" className="font-semibold text-[#e39a68] hover:text-white">Forgot password?</button>
            </div>
            <button type="submit" className="primary-action w-full justify-center py-3.5 text-sm">
              Continue to workspace <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="my-7 flex items-center gap-3 text-[11px] text-slate-500">
            <span className="h-px flex-1 bg-white/10" /><span>SECURE ACCESS</span><span className="h-px flex-1 bg-white/10" />
          </div>
          <div className="flex items-start gap-2 text-xs leading-5 text-slate-400">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#9dbca6]" />
            Your account is used only to manage your enquiries, quotations, and build updates.
          </div>

          <p className="mt-8 text-center text-sm text-slate-400">
            New to BODYCRAFT TN? <button onClick={() => setActiveTab('register')} className="font-bold text-[#e39a68] hover:text-white">Create an account</button>
          </p>
        </div>
      </div>
    </div>
  );
};
