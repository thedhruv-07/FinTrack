import React, { useState } from 'react';
import { useFinanceStore } from '../store';
import { Search, Filter, Download, ArrowUpRight, ArrowDownLeft, SearchIcon } from 'lucide-react';

export const TransactionList: React.FC = () => {
  const { transactions } = useFinanceStore();
  const [search, setSearch] = useState('');

  const filtered = transactions.filter(t => 
    t.label.toLowerCase().includes(search.toLowerCase()) || 
    t.cat.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-white/5 p-10 rounded-[48px] shadow-2xl border border-slate-200 dark:border-white/10">
        <div className="lg:col-span-8 relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sky-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Trace Transaction Hash or Entity..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 py-6 pl-16 pr-8 rounded-3xl outline-none border-2 border-transparent focus:border-sky-500 font-extrabold text-sm tracking-tight transition-all dark:text-white" 
          />
        </div>
        <div className="lg:col-span-4 flex gap-4 justify-end">
          <button className="flex-1 lg:flex-none p-6 rounded-3xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-sky-500 transition-all border border-transparent hover:border-sky-500/20">
            <Filter className="w-6 h-6" />
          </button>
          <button className="flex-1 lg:flex-none p-6 rounded-3xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-sky-500 transition-all border border-transparent hover:border-sky-500/20">
            <Download className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-900 rounded-[48px] overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-white/5">
                <th className="p-10 text-[10px] font-black uppercase tracking-widest text-slate-400">Vault Entity</th>
                <th className="p-10 text-[10px] font-black uppercase tracking-widest text-slate-400">Hash/Tag</th>
                <th className="p-10 text-[10px] font-black uppercase tracking-widest text-slate-400">Timestamp</th>
                <th className="p-10 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Magnitude</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {filtered.map((t) => (
                <tr key={t.id} className="group hover:bg-sky-500/[0.03] transition-colors cursor-pointer">
                  <td className="p-10">
                    <div className="flex items-center gap-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-inner group-hover:scale-110 ${t.type === 'income' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                        {t.type === 'income' ? <ArrowDownLeft className="w-6 h-6" /> : <ArrowUpRight className="w-6 h-6" />}
                      </div>
                      <p className="font-black text-sm tracking-tight uppercase dark:text-white">{t.label}</p>
                    </div>
                  </td>
                  <td className="p-10">
                    <span className="px-5 py-2 bg-slate-100 dark:bg-slate-800 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 rounded-xl group-hover:bg-sky-500 group-hover:text-white transition-all">
                      {t.cat}
                    </span>
                  </td>
                  <td className="p-10">
                    <p className="text-xs font-bold text-slate-400">{t.date} · 09:42 AM</p>
                  </td>
                  <td className="p-10 text-right">
                    <p className={`text-xl font-black tracking-tighter ${t.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {t.type === 'income' ? '+' : '-'}${Number(t.amount).toLocaleString()}
                    </p>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-20 text-center">
                    <SearchIcon className="w-16 h-16 mx-auto mb-6 opacity-10 dark:text-white" />
                    <p className="text-xl font-bold opacity-30 uppercase tracking-widest dark:text-white">No matching entries found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
