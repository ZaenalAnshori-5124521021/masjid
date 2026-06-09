import { Landmark, LayoutDashboard, ArrowDownCircle, ArrowUpCircle, FileBarChart, User, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import Dashboard from './components/Dashboard';
import IncomePage from './components/IncomePage';
import ExpensePage from './components/ExpensePage';
import ReportPage from './components/ReportPage';
import ProfilePage from './components/ProfilePage';
import LoginPage from './components/LoginPage';

export type Transaction = {
  id: number;
  date: string;
  description: string;
  amount: string;
  numericAmount: number;
};

const initialIncomeData: Transaction[] = [
  { id: 1, date: '01 Jun 2025', description: 'Infaq Jumat', amount: 'Rp 1.000.000', numericAmount: 1000000 },
  { id: 2, date: '02 Jun 2025', description: 'Kotak Infaq Jumat', amount: 'Rp 5.800.000', numericAmount: 5800000 },
  { id: 3, date: '03 Jun 2025', description: 'Infaq Jumat', amount: 'Rp 1.500.000', numericAmount: 1500000 },
  { id: 4, date: '07 Jun 2025', description: 'Infaq Jumat', amount: 'Rp 1.500.000', numericAmount: 1500000 },
  { id: 5, date: '14 Jun 2025', description: 'Kotak Amal', amount: 'Rp 800.000', numericAmount: 800000 },
  { id: 6, date: '21 Jun 2025', description: 'Donasi Ramadhan', amount: 'Rp 3.500.000', numericAmount: 3500000 },
  { id: 7, date: '28 Jun 2025', description: 'Infaq Jumat', amount: 'Rp 2.500.000', numericAmount: 2500000 },
  { id: 8, date: '01 Jul 2025', description: 'Sewa Mobil Jenazah', amount: 'Rp 500.000', numericAmount: 500000 },
  { id: 9, date: '05 Jul 2025', description: 'Infaq Jumat', amount: 'Rp 2.000.000', numericAmount: 2000000 },
  { id: 10, date: '12 Jul 2025', description: 'Kotak Amal Masjid', amount: 'Rp 3.100.000', numericAmount: 3100000 },
  { id: 11, date: '19 Jul 2025', description: 'Infaq Jumat', amount: 'Rp 1.200.000', numericAmount: 1200000 },
  { id: 12, date: '26 Jul 2025', description: 'Donasi Pembangunan', amount: 'Rp 10.000.000', numericAmount: 10000000 },
  { id: 13, date: '02 Aug 2025', description: 'Infaq Jumat', amount: 'Rp 1.800.000', numericAmount: 1800000 },
  { id: 14, date: '09 Aug 2025', description: 'Kotak Infaq Jumat', amount: 'Rp 4.200.000', numericAmount: 4200000 },
  { id: 15, date: '16 Aug 2025', description: 'Zakat Mal Ramadan', amount: 'Rp 18.800.000', numericAmount: 18800000 },
];

const initialExpenseData: Transaction[] = [
  { id: 1, date: '01 Mar 2026', description: 'pemberian donasi', amount: 'Rp 1.000.000', numericAmount: 1000000 },
  { id: 2, date: '03 Mar 2026', description: 'Pembelian Sound System', amount: 'Rp 750.000', numericAmount: 750000 },
  { id: 3, date: '05 Mar 2026', description: 'Tagihan Listrik PLN', amount: 'Rp 1.500.000', numericAmount: 1500000 },
  { id: 4, date: '11 Apr 2026', description: 'Pakan Lembaga Tahfiz Masrin', amount: 'Rp 2.100.000', numericAmount: 2100000 },
  { id: 5, date: '15 Apr 2026', description: 'Perbaikan AC Masjid', amount: 'Rp 3.200.000', numericAmount: 3200000 },
  { id: 6, date: '20 Apr 2026', description: 'Biaya Kebersihan', amount: 'Rp 800.000', numericAmount: 800000 },
  { id: 7, date: '25 Apr 2026', description: 'Pembelian Karpet', amount: 'Rp 5.500.000', numericAmount: 5500000 },
  { id: 8, date: '01 May 2026', description: 'Tagihan Air PDAM', amount: 'Rp 450.000', numericAmount: 450000 },
  { id: 9, date: '05 May 2026', description: 'Honorarium Imam', amount: 'Rp 2.000.000', numericAmount: 2000000 },
  { id: 10, date: '10 May 2026', description: 'Pembelian Alat Tulis', amount: 'Rp 300.000', numericAmount: 300000 },
  { id: 11, date: '15 May 2026', description: 'Biaya Pemeliharaan', amount: 'Rp 1.200.000', numericAmount: 1200000 },
  { id: 12, date: '20 May 2026', description: 'Donasi Anak Yatim', amount: 'Rp 3.000.000', numericAmount: 3000000 },
  { id: 13, date: '25 May 2026', description: 'Tagihan Internet', amount: 'Rp 500.000', numericAmount: 500000 },
  { id: 14, date: '01 Jun 2026', description: 'Pembelian Mukena', amount: 'Rp 1.800.000', numericAmount: 1800000 },
  { id: 15, date: '05 Jun 2026', description: 'Biaya Pengajian Rutin', amount: 'Rp 1.300.000', numericAmount: 1300000 },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [incomeData, setIncomeData] = useState<Transaction[]>(initialIncomeData);
  const [expenseData, setExpenseData] = useState<Transaction[]>(initialExpenseData);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (email: string, password: string) => {
    // In a real app, you would validate with backend
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    setActivePage('dashboard'); // Reset to dashboard
    toast.success('Logout berhasil!', {
      description: 'Sampai jumpa lagi',
    });
  };

  // If not logged in, show login page
  if (!isLoggedIn) {
    return (
      <>
        <Toaster position="top-center" richColors />
        <LoginPage onLogin={handleLogin} />
      </>
    );
  }

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pemasukan', label: 'Pemasukan', icon: ArrowDownCircle },
    { id: 'pengeluaran', label: 'Pengeluaran', icon: ArrowUpCircle },
    { id: 'laporan', label: 'Laporan', icon: FileBarChart },
    { id: 'profil', label: 'Profil', icon: User },
  ];

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="size-full flex flex-col lg:flex-row bg-gray-100">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-80 bg-gradient-to-b from-emerald-800 to-emerald-900 text-white flex-col h-screen">
        {/* Header with Logo */}
        <div className="p-6 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-700 rounded-2xl flex items-center justify-center shadow-lg">
            <Landmark className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">SiKeMas</h1>
            <p className="text-emerald-200 text-sm">Keuangan Masjid</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 py-6 space-y-8">
          {/* MENU UTAMA Section */}
          <div>
            <h2 className="text-xs font-semibold text-emerald-400 tracking-wider px-4 mb-3">
              MENU UTAMA
            </h2>
            <button
              onClick={() => setActivePage('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activePage === 'dashboard'
                  ? 'bg-emerald-700/50 hover:bg-emerald-700/70'
                  : 'hover:bg-emerald-700/30'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </button>
          </div>

          {/* KEUANGAN Section */}
          <div>
            <h2 className="text-xs font-semibold text-emerald-400 tracking-wider px-4 mb-3">
              KEUANGAN
            </h2>
            <div className="space-y-2">
              <button
                onClick={() => setActivePage('pemasukan')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  activePage === 'pemasukan'
                    ? 'bg-emerald-700/50 hover:bg-emerald-700/70'
                    : 'hover:bg-emerald-700/30'
                }`}
              >
                <ArrowDownCircle className="w-5 h-5" />
                <span className="font-medium">Pemasukan</span>
              </button>
              <button
                onClick={() => setActivePage('pengeluaran')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  activePage === 'pengeluaran'
                    ? 'bg-emerald-700/50 hover:bg-emerald-700/70'
                    : 'hover:bg-emerald-700/30'
                }`}
              >
                <ArrowUpCircle className="w-5 h-5" />
                <span className="font-medium">Pengeluaran</span>
              </button>
            </div>
          </div>

          {/* LAPORAN Section */}
          <div>
            <h2 className="text-xs font-semibold text-emerald-400 tracking-wider px-4 mb-3">
              LAPORAN
            </h2>
            <button
              onClick={() => setActivePage('laporan')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activePage === 'laporan'
                  ? 'bg-emerald-700/50 hover:bg-emerald-700/70'
                  : 'hover:bg-emerald-700/30'
              }`}
            >
              <FileBarChart className="w-5 h-5" />
              <span className="font-medium">Laporan Keuangan</span>
            </button>
          </div>

          {/* PENGATURAN Section */}
          <div>
            <h2 className="text-xs font-semibold text-emerald-400 tracking-wider px-4 mb-3">
              PENGATURAN
            </h2>
            <button
              onClick={() => setActivePage('profil')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activePage === 'profil'
                  ? 'bg-emerald-700/50 hover:bg-emerald-700/70'
                  : 'hover:bg-emerald-700/30'
              }`}
            >
              <User className="w-5 h-5" />
              <span className="font-medium">Profil Saya</span>
            </button>
          </div>
        </div>

        {/* User Profile Footer */}
        <div className="p-4 space-y-3 border-t border-emerald-700/50">
          <button
            onClick={() => setActivePage('profil')}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${
              activePage === 'profil'
                ? 'bg-emerald-700/50'
                : 'bg-emerald-700/30 hover:bg-emerald-700/40'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-lg flex-shrink-0">
              Z
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="font-semibold truncate">Zaenal</p>
              <p className="text-sm text-emerald-200 truncate">Admin</p>
            </div>
          </button>
          <button
            onClick={() => {
              toast.warning('Konfirmasi Logout', {
                description: 'Apakah Anda yakin ingin keluar?',
                action: {
                  label: 'Logout',
                  onClick: handleLogout,
                },
                cancel: {
                  label: 'Batal',
                  onClick: () => {},
                },
              });
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-600/20 transition-colors text-emerald-100 hover:text-red-300"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Keluar</span>
          </button>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden bg-gradient-to-r from-emerald-800 to-emerald-900 text-white p-3 sm:p-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-600 to-amber-700 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
            <Landmark className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-bold tracking-tight truncate">SiKeMas</h1>
            <p className="text-emerald-200 text-[10px] sm:text-xs truncate">Keuangan Masjid</p>
          </div>
        </div>
        <button
          onClick={() => setActivePage('profil')}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0 ml-2 transition-colors"
        >
          Z
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto pb-[72px] sm:pb-20 lg:pb-0">
        {activePage === 'dashboard' && (
          <Dashboard incomeData={incomeData} expenseData={expenseData} />
        )}
        {activePage === 'pemasukan' && (
          <IncomePage incomeData={incomeData} setIncomeData={setIncomeData} />
        )}
        {activePage === 'pengeluaran' && (
          <ExpensePage expenseData={expenseData} setExpenseData={setExpenseData} />
        )}
        {activePage === 'laporan' && (
          <ReportPage incomeData={incomeData} expenseData={expenseData} />
        )}
        {activePage === 'profil' && <ProfilePage onLogout={handleLogout} />}
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-emerald-800 to-emerald-900 text-white shadow-2xl border-t border-emerald-700/50 safe-area-inset-bottom">
        <div className="flex items-center justify-around px-0.5 sm:px-1 py-2 sm:py-3">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex flex-col items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all min-w-0 flex-1 max-w-[80px] ${
                activePage === item.id
                  ? 'bg-emerald-700/60 text-white'
                  : 'text-emerald-200 hover:bg-emerald-700/30 hover:text-white'
              }`}
            >
              <item.icon className="w-4.5 h-4.5 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="text-[9px] sm:text-[10px] font-medium leading-tight text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-full px-0.5">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
      </div>
    </>
  );
}