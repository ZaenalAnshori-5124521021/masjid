import { Landmark, Filter, Search, RotateCcw, FileText, PieChart, TrendingUp, TrendingDown, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { useState } from 'react';
import { PieChart as RechartsaPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { Transaction } from '../App';

type ReportPageProps = {
  incomeData: Transaction[];
  expenseData: Transaction[];
};

export default function ReportPage({ incomeData, expenseData }: ReportPageProps) {
  // Calculate totals
  const totalIncome = incomeData.reduce((sum, item) => sum + item.numericAmount, 0);
  const totalExpense = expenseData.reduce((sum, item) => sum + item.numericAmount, 0);
  const totalBalance = totalIncome - totalExpense;

  // Prepare chart data
  const chartData = [
    { name: 'Pemasukan', value: totalIncome, color: '#10b981' },
    { name: 'Pengeluaran', value: totalExpense, color: '#ef4444' },
  ];

  // Combine transactions for the report table
  const transactionData = [
    ...incomeData.map(item => ({
      id: item.id,
      date: item.date,
      description: item.description,
      type: 'Masuk',
      income: item.amount,
      expense: '-',
    })),
    ...expenseData.map(item => ({
      id: item.id + 1000, // Offset to avoid ID conflicts
      date: item.date,
      description: item.description,
      type: 'Keluar',
      income: '-',
      expense: item.amount,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const [filterMonth, setFilterMonth] = useState('');
  const [filterYear, setFilterYear] = useState('');

  const handleReset = () => {
    setFilterMonth('');
    setFilterYear('');
  };

  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const currentTime = new Date().toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="flex-1 p-3 sm:p-4 lg:p-8 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Page Header with Breadcrumb and Timestamp */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-4 sm:mb-6 lg:mb-8 gap-3 sm:gap-4">
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs lg:text-sm text-gray-500 mb-2">Dashboard / Laporan</p>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 truncate">Laporan Keuangan</h1>
          </div>
          <div className="text-left lg:text-right text-[10px] sm:text-xs lg:text-sm text-gray-600 flex-shrink-0">
            <p className="whitespace-nowrap">Dicetak: {currentDate} {currentTime}</p>
            <p>By: Zaenal Anshori</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Summary and Filter */}
          <div className="lg:col-span-1 space-y-6">
            {/* Financial Summary Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-md border border-gray-200/50">
              <div className="flex items-center gap-2 lg:gap-3 mb-3 sm:mb-4 lg:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-emerald-800 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <Landmark className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 truncate">Laporan Keuangan Masjid</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                  <p className="text-xs font-medium text-gray-600 mb-1">Saldo Kas Keseluruhan</p>
                  <h3 className="text-3xl font-bold text-emerald-800">Rp {totalBalance.toLocaleString('id-ID')}</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                    <div className="flex items-center gap-2">
                      <ArrowUpCircle className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm font-medium text-gray-700">Total Pemasukan</span>
                    </div>
                    <span className="text-sm font-bold text-emerald-600">Rp {totalIncome.toLocaleString('id-ID')}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                    <div className="flex items-center gap-2">
                      <ArrowDownCircle className="w-5 h-5 text-red-600" />
                      <span className="text-sm font-medium text-gray-700">Total Pengeluaran</span>
                    </div>
                    <span className="text-sm font-bold text-red-600">Rp {totalExpense.toLocaleString('id-ID')}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-blue-600 rounded"></div>
                      <span className="text-sm font-medium text-gray-700">Saldo Akhir</span>
                    </div>
                    <span className="text-sm font-bold text-blue-600">Rp {totalBalance.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-md border border-gray-200/50">
              <div className="flex items-center gap-2 lg:gap-3 mb-3 sm:mb-4 lg:mb-6">
                <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-emerald-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-emerald-600" />
                </div>
                <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">Filter Laporan</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Bulan</label>
                  <select
                    value={filterMonth}
                    onChange={(e) => setFilterMonth(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700"
                  >
                    <option value="">-- Semua Bulan --</option>
                    <option value="1">Januari</option>
                    <option value="2">Februari</option>
                    <option value="3">Maret</option>
                    <option value="4">April</option>
                    <option value="5">Mei</option>
                    <option value="6">Juni</option>
                    <option value="7">Juli</option>
                    <option value="8">Agustus</option>
                    <option value="9">September</option>
                    <option value="10">Oktober</option>
                    <option value="11">November</option>
                    <option value="12">Desember</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tahun</label>
                  <select
                    value={filterYear}
                    onChange={(e) => setFilterYear(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700"
                  >
                    <option value="">-- Semua Tahun --</option>
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-2">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all">
                    <Search className="w-4 h-4" />
                    Filter
                  </button>
                  <button
                    onClick={handleReset}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Transaction Details and Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-md border border-gray-200/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 lg:mb-6 gap-2 sm:gap-3">
                <div className="flex items-center gap-2 lg:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-emerald-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-emerald-600" />
                  </div>
                  <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">Rincian Transaksi</h2>
                </div>
                <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gray-100 text-gray-700 rounded-full text-[10px] sm:text-xs font-semibold w-fit">
                  {transactionData.length} data
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Transaction Table */}
                <div className="lg:col-span-2">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-emerald-50 border-b-2 border-emerald-200">
                          <th className="text-center py-3 px-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                            #
                          </th>
                          <th className="text-left py-3 px-3 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                            Tanggal
                          </th>
                          <th className="text-left py-3 px-3 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                            Keterangan
                          </th>
                          <th className="text-center py-3 px-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                            Jenis
                          </th>
                          <th className="text-right py-3 px-3 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                            Pemasukan
                          </th>
                          <th className="text-right py-3 px-3 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                            Pengeluaran
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactionData.map((item, index) => (
                          <tr
                            key={item.id}
                            className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                              index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                            }`}
                          >
                            <td className="py-3 px-2 text-center text-xs font-medium text-gray-600">
                              {index + 1}
                            </td>
                            <td className="py-3 px-3 text-xs font-medium text-gray-900">
                              {item.date}
                            </td>
                            <td className="py-3 px-3 text-xs text-gray-700">
                              {item.description}
                            </td>
                            <td className="py-3 px-2 text-center">
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                                  item.type === 'Masuk'
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : 'bg-red-100 text-red-700'
                                }`}
                              >
                                {item.type === 'Masuk' ? (
                                  <TrendingUp className="w-3 h-3" />
                                ) : (
                                  <TrendingDown className="w-3 h-3" />
                                )}
                                {item.type}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-xs text-right font-bold text-emerald-600">
                              {item.income}
                            </td>
                            <td className="py-3 px-3 text-xs text-right font-bold text-red-600">
                              {item.expense}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Proportion Chart */}
                <div className="lg:col-span-1">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <PieChart className="w-4 h-4 text-emerald-600" />
                      </div>
                      <h3 className="text-sm lg:text-base font-bold text-gray-900">Proporsi Keuangan</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                      <RechartsaPieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value: number) => `Rp ${value.toLocaleString('id-ID')}`}
                        />
                        <Legend
                          verticalAlign="bottom"
                          height={36}
                          iconType="circle"
                        />
                      </RechartsaPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
