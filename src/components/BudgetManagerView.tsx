import React, { useState } from 'react';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Trash2,
  PieChart as PieChartIcon,
  Sparkles,
  DollarSign,
  TrendingDown,
  Lightbulb,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { BudgetItem } from '../types';

interface BudgetManagerViewProps {
  budgets: BudgetItem[];
  onAddBudget: (item: Omit<BudgetItem, 'id'>) => void;
  onDeleteBudget: (id: string) => void;
}

export const BudgetManagerView: React.FC<BudgetManagerViewProps> = ({
  budgets,
  onAddBudget,
  onDeleteBudget,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [isAiAdvising, setIsAiAdvising] = useState(false);
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);

  // Form State
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('Food & Dining');
  const [amount, setAmount] = useState<number>(25);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || amount <= 0) return;

    onAddBudget({
      type,
      category,
      amount,
      description,
      date,
    });

    setDescription('');
    setAmount(20);
    setShowAddModal(false);
  };

  // Calculations
  const totalIncome = budgets
    .filter((b) => b.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = budgets
    .filter((b) => b.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? Math.max(0, Math.round((balance / totalIncome) * 100)) : 0;

  // Category breakdown
  const categoryExpenses: Record<string, number> = {};
  budgets
    .filter((b) => b.type === 'expense')
    .forEach((b) => {
      categoryExpenses[b.category] = (categoryExpenses[b.category] || 0) + b.amount;
    });

  // Calculate highest expense category
  let highestCategory = 'Food & Dining';
  let highestAmount = 0;
  Object.entries(categoryExpenses).forEach(([cat, val]) => {
    if (val > highestAmount) {
      highestAmount = val;
      highestCategory = cat;
    }
  });
  const highestCategoryPercent = totalExpense > 0 ? Math.round((highestAmount / totalExpense) * 100) : 0;

  // AI Saving Advisor trigger
  const handleGetSavingAdvice = async () => {
    setIsAiAdvising(true);
    setAiAdvice(null);
    try {
      const res = await fetch('/api/ai/budget-advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          monthlyIncome: totalIncome,
          monthlyExpense: totalExpense,
          categoryBreakdown: categoryExpenses,
        }),
      });

      if (!res.ok) throw new Error('Failed to get budget advice');
      const data = await res.json();
      setAiAdvice(data.recommendation);
    } catch (err) {
      setAiAdvice(
        `You are spending ${highestCategoryPercent}% on ${highestCategory}. Practical university saving tips:\n• Check out campus student meal prep co-ops to cut takeout by $60/mo.\n• Always verify textbook PDFs through university library open-access before buying.\n• Claim your student discount on transit passes and streaming services.`
      );
    } finally {
      setIsAiAdvising(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Student Budget & Expense Tracker</h1>
          <p className="mt-1 text-sm text-slate-600">
            Control campus spending, track pocket money and stipends, and build disciplined financial habits.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleGetSavingAdvice}
            disabled={isAiAdvising}
            className="inline-flex items-center gap-2 rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-xs sm:text-sm font-bold text-indigo-700 hover:bg-indigo-100 transition-all"
          >
            {isAiAdvising ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4 text-indigo-600" />
            )}
            <span>How Can I Save More?</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            <span>Add Transaction</span>
          </button>
        </div>
      </div>

      {/* AI Advice Notification Banner if active */}
      {aiAdvice && (
        <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-r from-indigo-50 via-white to-blue-50 p-5 shadow-xs animate-in fade-in">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shrink-0 mt-0.5">
              <Lightbulb className="h-5 w-5" />
            </div>
            <div className="flex-1 text-xs sm:text-sm text-slate-800">
              <span className="font-bold text-indigo-950 block mb-1">
                Student Survival AI Financial Advisor
              </span>
              <div className="whitespace-pre-line leading-relaxed">{aiAdvice}</div>
            </div>
          </div>
        </div>
      )}

      {/* Financial Summary 4-Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Monthly Income</span>
          <p className="mt-2 text-2xl font-black text-emerald-600">
            ${totalIncome.toLocaleString()}
          </p>
          <span className="text-[11px] text-slate-400 font-medium">Stipends & campus work</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Monthly Expenses</span>
          <p className="mt-2 text-2xl font-black text-rose-600">
            ${totalExpense.toLocaleString()}
          </p>
          <span className="text-[11px] text-slate-400 font-medium">
            {budgets.filter((b) => b.type === 'expense').length} transactions recorded
          </span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Remaining Balance</span>
          <p className="mt-2 text-2xl font-black text-slate-900">
            ${balance.toLocaleString()}
          </p>
          <span
            className={`text-[11px] font-bold ${
              balance > 0 ? 'text-emerald-600' : 'text-rose-600'
            }`}
          >
            {balance > 0 ? 'Surplus Available' : 'Deficit Alert'}
          </span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Savings Rate</span>
          <p className="mt-2 text-2xl font-black text-indigo-600">{savingsRate}%</p>
          <div className="mt-2 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-2 rounded-full bg-indigo-600 transition-all"
              style={{ width: `${Math.min(100, savingsRate)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Category Breakdown & Recommendation Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Transaction History */}
        <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="font-bold text-sm text-slate-900">Transaction History</span>
            <span className="text-xs text-slate-400 font-medium">This Semester</span>
          </div>

          <div className="space-y-2.5">
            {budgets.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/50 p-3.5 text-xs hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-xl font-bold ${
                      item.type === 'income'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {item.type === 'income' ? '+' : '-'}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs sm:text-sm">
                      {item.description}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {item.category} • {item.date}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-sm font-black ${
                      item.type === 'income' ? 'text-emerald-600' : 'text-slate-900'
                    }`}
                  >
                    {item.type === 'income' ? '+' : '-'}${item.amount}
                  </span>
                  <button
                    onClick={() => onDeleteBudget(item.id)}
                    className="rounded-lg p-1 text-slate-400 hover:text-rose-600"
                    title="Delete item"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Category Breakdown Bar & Smart Tip */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <span className="font-bold text-slate-900 text-sm block">Expense Breakdown</span>

            <div className="space-y-3 text-xs">
              {Object.entries(categoryExpenses).map(([cat, amt]) => {
                const percent = totalExpense > 0 ? Math.round((amt / totalExpense) * 100) : 0;
                return (
                  <div key={cat}>
                    <div className="flex justify-between font-medium text-slate-600 mb-1">
                      <span>{cat}</span>
                      <span className="font-bold text-slate-900">
                        ${amt} ({percent}%)
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-2 rounded-full bg-indigo-600"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recommendation Box */}
            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50/70 p-3.5 text-xs text-amber-900">
              <span className="font-bold block mb-0.5">Budget Alert:</span>
              <span>
                You are spending {highestCategoryPercent}% of your expense budget on{' '}
                <strong>{highestCategory}</strong>. Consider meal prep or carpooling to increase monthly savings.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl animate-in fade-in">
            <h2 className="text-lg font-bold text-slate-900">Add Income or Expense</h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
              <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setType('expense')}
                  className={`flex-1 rounded-lg py-2 transition-all ${
                    type === 'expense'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Expense (-)
                </button>
                <button
                  type="button"
                  onClick={() => setType('income')}
                  className={`flex-1 rounded-lg py-2 transition-all ${
                    type === 'income'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Income (+)
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Weekly Grocery Run, Campus Tutoring Stipend"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Amount ($)
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:outline-none"
                  >
                    <option value="Food & Dining">Food & Dining</option>
                    <option value="Housing & Rent">Housing & Rent</option>
                    <option value="Books & Courseware">Books & Courseware</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Stipend & Job">Stipend & Job</option>
                    <option value="Allowance">Allowance</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-700"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
