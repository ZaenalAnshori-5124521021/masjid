import { Wallet, TrendingUp, TrendingDown, FileText, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Transaction } from '../App';

type DashboardProps = {
  incomeData: Transaction[];
  expenseData: Transaction[];
};


const chartData = [
  { month: 'Jan 2026', Pemasukan: 50000000, Pengeluaran: 15000000 },
  { month: 'Feb 2026', Pemasukan: 45000000, Pengeluaran: 18000000 },
  { month: 'Mar 2026', Pemasukan: 60000000, Pengeluaran: 22000000 },
  { month: 'Apr 2026', Pemasukan: 70000000, Pengeluaran: 25000000 },
  { month: 'May 2026', Pemasukan: 55000000, Pengeluaran: 20000000 },
  { month: 'Jun 2026', Pemasukan: 57200000, Pengeluaran: 16400000 },
];

export default function Dashboard({ incomeData, expenseData }: DashboardProps) {
  // Calculate totals
  const totalIncome = incomeData.reduce((sum, item) => sum + item.numericAmount, 0);
  const totalExpense = expenseData.reduce((sum, item) => sum + item.numericAmount, 0);
  const totalBalance = totalIncome - totalExpense;

  // Summary data
  const summaryData = [
    {
      title: 'Total Saldo Kas',
      amount: `Rp ${totalBalance.toLocaleString('id-ID')}`,
      change: '10% Dari Bulan Lalu',
      status: totalBalance > 0 ? 'Saldo Positif' : 'Saldo Negatif',
      statusColor: totalBalance > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700',
      bgColor: 'bg-blue-50',
      icon: Wallet,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
    },
    {
      title: 'Total Pemasukan',
      amount: `Rp ${totalIncome.toLocaleString('id-ID')}`,
      change: 'Periode Sebelumnya',
      status: 'Meningkat',
      statusColor: 'bg-emerald-100 text-emerald-700',
      bgColor: 'bg-emerald-50',
      icon: TrendingUp,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-100',
    },
    {
      title: 'Total Pengeluaran',
      amount: `Rp ${totalExpense.toLocaleString('id-ID')}`,
      change: '10% Dari Bulan Lalu',
      status: 'Terkendali',
      statusColor: 'bg-orange-100 text-orange-700',
      bgColor: 'bg-orange-50',
      icon: TrendingDown,
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-100',
    },
  ];

  // Combine and sort transactions
  const allTransactions = [
    ...incomeData.slice(0, 5).map(item => ({
      date: item.date,
      description: item.description,
      type: 'Pemasukan',
      amount: `+${item.amount}`,
    })),
    ...expenseData.slice(0, 4).map(item => ({
      date: item.date,
      description: item.description,
      type: 'Pengeluaran',
      amount: `-${item.amount}`,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 9);
  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex-1 p-3 sm:p-4 lg:p-8 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 sm:mb-6 lg:mb-8 gap-3 sm:gap-4">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 truncate">Dashboard</h1>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 truncate">Selamat datang, Zaenal Anshori</p>
          </div>
          <div className="flex items-center gap-2 bg-white px-2 sm:px-3 lg:px-4 py-2 lg:py-3 rounded-lg sm:rounded-xl shadow-sm border border-gray-200 flex-shrink-0">
            <Calendar className="w-3.5 sm:w-4 lg:w-5 h-3.5 sm:h-4 lg:h-5 text-gray-500 flex-shrink-0" />
            <span className="text-[10px] sm:text-xs lg:text-sm font-medium text-gray-700 whitespace-nowrap">{currentDate}</span>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {summaryData.map((item, index) => (
            <div
              key={index}
              className={`${item.bgColor} rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-md border border-white/50 hover:shadow-lg transition-shadow`}
            >
              <div className="flex items-start justify-between mb-2 sm:mb-3 lg:mb-4">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 ${item.iconBg} rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <item.icon className={`w-4.5 h-4.5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${item.iconColor}`} />
                </div>
                <span className={`px-2 sm:px-2 lg:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold ${item.statusColor} whitespace-nowrap`}>
                  {item.status}
                </span>
              </div>
              <div className="space-y-0.5 sm:space-y-1 lg:space-y-2 min-w-0">
                <p className="text-[10px] sm:text-xs lg:text-sm font-medium text-gray-600 truncate">{item.title}</p>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">{item.amount}</h3>
                <p className="text-[10px] sm:text-xs text-gray-500 truncate">{item.change}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-md border border-gray-200/50 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-2 lg:gap-3 mb-3 sm:mb-4 lg:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-emerald-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-emerald-600" />
            </div>
            <h2 className="text-sm sm:text-base lg:text-xl font-bold text-gray-900 min-w-0 truncate">
              Grafik Keuangan 6 Bulan Terakhir
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: '#e5e7eb' }}
                tickFormatter={(value) => `${value / 1000000}M`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '12px',
                }}
                formatter={(value: number) =>
                  `Rp ${value.toLocaleString('id-ID')}`
                }
              />
              <Legend
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="circle"
              />
              <Line
                type="monotone"
                dataKey="Pemasukan"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="Pengeluaran"
                stroke="#ec4899"
                strokeWidth={3}
                dot={{ fill: '#ec4899', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-md border border-gray-200/50 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-2 lg:gap-3 mb-3 sm:mb-4 lg:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-indigo-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-indigo-600" />
            </div>
            <h2 className="text-sm sm:text-base lg:text-xl font-bold text-gray-900">
              Transaksi Terbaru
            </h2>
          </div>
          <div className="overflow-x-auto -mx-3 sm:-mx-4 lg:-mx-6 px-3 sm:px-4 lg:px-6">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="text-left py-4 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Keterangan
                  </th>
                  <th className="text-left py-4 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Jenis
                  </th>
                  <th className="text-right py-4 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Jumlah
                  </th>
                </tr>
              </thead>
              <tbody>
                {allTransactions.map((transaction, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-5 px-4 text-sm font-medium text-gray-900">
                      {transaction.date}
                    </td>
                    <td className="py-5 px-4 text-sm text-gray-700">
                      {transaction.description}
                    </td>
                    <td className="py-5 px-4">
                      <span
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
                          transaction.type === 'Pemasukan'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </td>
                    <td
                      className={`py-5 px-4 text-sm text-right font-bold ${
                        transaction.amount.startsWith('+')
                          ? 'text-emerald-600'
                          : 'text-orange-600'
                      }`}
                    >
                      {transaction.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
