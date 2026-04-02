import React, { useEffect, useState } from 'react';
import { useFinanceStore } from './store';
import { 
  Layout, 
  Clock, 
  Target, 
  ShieldCheck, 
  Zap, 
  Sun, 
  Moon, 
  Plus, 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  User,
  Settings,
  Cpu,
  ArrowUpRight,
  Search,
  X
} from 'lucide-react';
import { TransactionList } from './components/TransactionList';
import { SpendingTrends } from './components/SpendingTrends';
import { TransactionModal } from './components/TransactionModal';

const MetricCard = ({ icon: IconEl, label, value, trend, trendValue, colorClass }: any) => (
  <div className="p-8 rounded-[40px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-xl group hover:-translate-y-2 transition-all duration-500">
    <div className="flex justify-between items-start mb-10">
      <div className={`w-14 h-14 ${colorClass} bg-opacity-10 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform`}>
        <IconEl className={`w-6 h-6 ${colorClass.replace('bg-', 'text-')}`} />
      </div>
      <div className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest ${trend === 'up' ? 'text-emerald-500 bg-emerald-500/10' : 'text-rose-500 bg-rose-500/10'}`}>
        {trendValue}
      </div>
    </div>
    <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.25em] mb-2">{label}</p>
    <p className="text-4xl font-black tracking-tighter dark:text-white">{value}</p>
  </div>
);

const App: React.FC = () => {
  const { isDark, toggleDark, role, setRole, view, setView, transactions, getTotals } = useFinanceStore();
  const [showModal, setShowModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const totals = getTotals();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-500">
      {/* MOBILE OVERLAY */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[60] xl:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* ELITE SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 w-80 p-10 flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-white/5 transition-all duration-500 z-[70] xl:static xl:flex ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'}`}>
        <div className="flex items-center justify-between mb-20 px-2 group">
          <div className="flex items-center gap-4 cursor-pointer">
            <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-blue-600 rounded-3xl flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-black dark:text-white">FinTrack</h1>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 dark:text-slate-400">Financial Suite</span>
            </div>
          </div>
          <button className="p-2 xl:hidden text-slate-400" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="space-y-4">
          {[
            { id: 'dashboard', icon: Layout, label: 'Overview' },
            { id: 'history', icon: Clock, label: 'Vault History' },
            { id: 'budget', icon: Target, label: 'Strategic Budgeting' }
          ].map(item => (
            <button key={item.id} onClick={() => { setView(item.id as any); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-5 p-5 rounded-[28px] transition-all duration-300 group ${view === item.id ? 'bg-sky-500 text-white shadow-xl shadow-sky-500/40 translate-x-3' : 'text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'}`}>
              <item.icon className={`w-6 h-6 ${view === item.id ? 'animate-pulse' : 'group-hover:translate-x-1 transition-transform'}`} />
              <span className="font-extrabold text-sm tracking-tight">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-8">
           <div className="p-8 rounded-[40px] bg-slate-900 dark:bg-slate-800 text-white relative overflow-hidden group shadow-2xl">
              <Cpu className="absolute top-0 right-0 p-8 opacity-10 rotate-12 group-hover:scale-150 transition-transform duration-1000 w-40 h-40" />
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-3">AI PROJECTION</p>
              <p className="text-sm font-bold leading-relaxed mb-6">Expecting a <span className="text-emerald-400">14% saving increase</span> by June.</p>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 w-[65%]" />
              </div>
           </div>

           <div className="flex items-center gap-4 px-4 py-6 border-t border-slate-200 dark:border-white/5">
              <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-md font-black">AI</div>
              <div className="flex-1 min-w-0">
                  <p className="text-sm font-black tracking-tight dark:text-white truncate">{role === 'admin' ? 'Elite Admin' : 'Basic Viewer'}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Ops</p>
              </div>
              <Settings className="w-5 h-5 text-slate-300 cursor-pointer hover:rotate-90 transition-transform flex-shrink-0" />
           </div>
        </div>
      </aside>

      {/* MASTER WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="h-28 px-6 lg:px-12 border-b border-slate-200/50 dark:border-white/5 flex items-center justify-between bg-white/60 dark:bg-slate-950/60 backdrop-blur-3xl z-40">
            <div className="flex items-center gap-6 flex-1">
                <button className="xl:hidden p-4 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-500" onClick={() => setIsMobileMenuOpen(true)}>
                    <Activity className="w-6 h-6" />
                </button>
                <div className="relative max-w-lg w-full group hidden md:block">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-sky-500" />
                    <input type="text" placeholder="Intelligence Search..." className="w-full bg-slate-100 dark:bg-slate-900 py-4.5 pl-16 pr-8 rounded-[24px] outline-none text-sm font-bold border border-transparent focus:border-sky-500 transition-all dark:text-white" />
                </div>
            </div>
            
            <div className="flex items-center gap-4 lg:gap-8">
                <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl scale-90 lg:scale-100">
                    <button onClick={() => setRole('viewer')} className={`px-4 lg:px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${role === 'viewer' ? 'bg-white dark:bg-slate-700 text-sky-500 shadow-lg' : 'text-slate-400'}`}>Viewer</button>
                    <button onClick={() => setRole('admin')} className={`px-4 lg:px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${role === 'admin' ? 'bg-white dark:bg-slate-700 text-sky-500 shadow-lg' : 'text-slate-400'}`}>Admin</button>
                </div>
                    <button onClick={() => { console.log('Toggling theme'); toggleDark(); }} className="h-12 lg:h-14 px-4 lg:px-6 space-x-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-500 hover:text-sky-500 shadow-sm transition-all focus:scale-95 group">
                        {isDark ? <Sun className="w-6 h-6 animate-spin" /> : <Moon className="w-6 h-6 group-hover:rotate-12 transition-transform" />}
                        <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">Theme</span>
                    </button>
                <div 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-sky-500 text-white flex items-center justify-center relative cursor-pointer shadow-xl shadow-sky-500/20 transition-transform ${isProfileOpen ? 'scale-110 ring-4 ring-sky-500/30' : ''}`}
                >
                    <User className="w-6 h-6" />
                    <span className="absolute top-3 right-3 w-3 h-3 bg-rose-500 border-2 border-white dark:border-slate-900 rounded-full" />
                </div>
            </div>
        </header>

        <main className="p-6 lg:p-12 overflow-y-auto flex-1 custom-scrollbar space-y-12">
          {view === 'dashboard' && (
            <div className="animate-in fade-in slide-in-from-bottom-5 duration-700 space-y-12">
               <div className="flex flex-col xl:flex-row justify-between xl:items-end gap-8">
                  <div className="space-y-4">
                    <h1 className="text-6xl font-black tracking-tighter dark:text-white leading-none">Active Pulse</h1>
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                      <p className="text-lg font-bold text-slate-400">Master Wallet Verified & Online.</p>
                    </div>
                  </div>
                  {role === 'admin' && (
                    <div className="flex gap-4">
                       <button className="px-10 py-5 bg-white dark:bg-slate-900 rounded-[28px] text-xs font-black uppercase tracking-widest shadow-xl border border-slate-200 dark:border-white/5 dark:text-white">PRO REPORT</button>
                       <button onClick={() => setShowModal(true)} className="px-10 py-5 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-[28px] text-xs font-black uppercase tracking-widest shadow-2xl flex items-center gap-3">
                          <Plus className="w-4 h-4" /> NEW ENTRY
                       </button>
                    </div>
                  )}
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                  <MetricCard icon={Wallet} label="Net Liquidity" value={`$${totals.balance.toLocaleString()}`} trend="up" trendValue="+12%" colorClass="bg-sky-500" />
                  <MetricCard icon={TrendingUp} label="Income" value={`$${totals.income.toLocaleString()}`} trend="up" trendValue="+5%" colorClass="bg-emerald-500" />
                  <MetricCard icon={TrendingDown} label="Expenses" value={`$${totals.expense.toLocaleString()}`} trend="down" trendValue="-8%" colorClass="bg-rose-500" />
                  <MetricCard icon={Activity} label="Risk Analysis" value="Optimal" trend="up" trendValue="+2%" colorClass="bg-amber-500" />
               </div>

               <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                  <div className="xl:col-span-8">
                    <SpendingTrends />
                  </div>
                  <div className="xl:col-span-4 p-10 bg-slate-900 dark:bg-slate-800 rounded-[48px] text-white shadow-2xl relative overflow-hidden group">
                     <h3 className="text-2xl font-black mb-8">Recent Flux</h3>
                     <div className="space-y-8">
                        {transactions.slice(0, 4).map((t, i) => (
                           <div key={i} className="flex items-center gap-5 hover:translate-x-2 transition-transform cursor-pointer group/item">
                              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${t.type === 'income' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'} border border-white/5`}>
                                <ArrowUpRight className={`w-6 h-6 ${t.type === 'income' ? 'rotate-180' : ''}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-extrabold text-[15px] truncate">{t.label}</p>
                                <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">{t.date}</p>
                              </div>
                              <p className={`font-black text-lg ${t.type === 'income' ? 'text-emerald-500' : 'text-rose-400'}`}>
                                {t.type === 'income' ? '+' : '-'}${t.amount}
                              </p>
                           </div>
                        ))}
                     </div>
                     <button onClick={() => setView('history')} className="w-full mt-12 py-5 bg-white/5 rounded-[28px] text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Global Log</button>
                  </div>
               </div>
            </div>
          )}

          {view === 'history' && <TransactionList />}
          {view === 'budget' && (
            <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
               <h1 className="text-5xl font-black tracking-tighter dark:text-white mb-12">Strategic Analysis</h1>
               <div className="grid grid-cols-2 gap-10">
                  <div className="p-12 bg-white dark:bg-slate-900 rounded-[48px] border border-slate-200 dark:border-white/5 shadow-2xl">
                     <h3 className="text-2xl font-black mb-10 dark:text-white">Budget Efficiency</h3>
                     <div className="space-y-10">
                        {['Housing Assets', 'Nutritional Ops', 'Logistics'].map((b, i) => (
                           <div key={b} className="space-y-4">
                              <div className="flex justify-between items-end">
                                <p className="font-black text-xs uppercase tracking-widest text-slate-400">{b}</p>
                                <p className="font-black text-sm dark:text-white">{75 + i * 5}%</p>
                              </div>
                              <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-1">
                                <div className="h-full bg-sky-500 rounded-full shadow-lg" style={{ width: `${75 + i * 5}%` }} />
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
                  <div className="p-12 bg-slate-900 dark:bg-slate-800 rounded-[48px] text-white relative shadow-2xl overflow-hidden">
                     <Zap className="w-20 h-20 text-sky-500 opacity-20 absolute -bottom-4 -right-4 -rotate-12" />
                     <h3 className="text-3xl font-black mb-8">Elite Projection</h3>
                     <p className="text-lg opacity-50 leading-relaxed font-bold">Your current strategy allows for an additional <span className="text-emerald-400">$1,500</span> investment by next month's close.</p>
                  </div>
               </div>
            </div>
          )}
        </main>
      </div>

      <TransactionModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default App;
