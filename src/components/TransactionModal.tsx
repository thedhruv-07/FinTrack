import React, { useState } from 'react';
import { useFinanceStore } from '../store';
import { X, ShieldIcon, Database, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose }) => {
  const { addTransaction } = useFinanceStore();
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [cat, setCat] = useState('Other');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label || !amount) return;
    
    addTransaction({
      label,
      amount: Number(amount),
      type,
      cat,
    });
    
    setLabel('');
    setAmount('');
    setType('expense');
    setCat('Other');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-slate-950/40 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="glass-card w-full max-w-xl rounded-[48px] p-12 shadow-2xl relative overflow-hidden dark:bg-slate-900 bg-white">
        <button 
          onClick={onClose} 
          className="absolute top-8 right-8 text-slate-400 hover:text-rose-500 transition-colors p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-sky-500/30">
            <ShieldIcon className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-black tracking-tight uppercase dark:text-white leading-none">Secure Entry</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Vault Entity</label>
            <div className="relative group">
              <Database className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-sky-500" />
              <input 
                type="text" 
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="e.g. AWS Infrastructure Pay" 
                className="w-full bg-slate-50 dark:bg-slate-950 py-5 pl-14 pr-8 rounded-3xl outline-none border-2 border-transparent focus:border-sky-500 font-extrabold text-sm tracking-tight transition-all dark:text-white" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Magnitude ($)</label>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00" 
                className="w-full bg-slate-50 dark:bg-slate-950 py-5 px-8 rounded-3xl outline-none border-2 border-transparent focus:border-sky-500 font-extrabold text-sm tracking-tight transition-all dark:text-white" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Classification</label>
              <div className="relative">
                <select 
                  value={type} 
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full bg-slate-50 dark:bg-slate-950 py-5 px-8 rounded-3xl outline-none font-black appearance-none dark:text-white cursor-pointer hover:border-sky-500/30 transition-all text-sm border-2 border-transparent"
                >
                  <option value="expense">Expense (-)</option>
                  <option value="income">Income (+)</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                  {type === 'income' ? <ArrowDownCircle className="w-5 h-5 text-emerald-500" /> : <ArrowUpCircle className="w-5 h-5 text-rose-500" />}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Category Tag</label>
            <input 
              type="text" 
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 py-5 px-8 rounded-3xl outline-none border-2 border-transparent focus:border-sky-500 font-extrabold text-sm tracking-tight transition-all dark:text-white" 
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-6 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-[32px] font-black tracking-[0.2em] uppercase shadow-2xl shadow-sky-500/30 hover:-translate-y-1 transition-all active:scale-[0.98]"
          >
            Authorize Deposit
          </button>
        </form>
      </div>
    </div>
  );
};
