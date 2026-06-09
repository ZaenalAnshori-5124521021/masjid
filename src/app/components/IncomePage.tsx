import { Calendar, Trash2, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import type { Transaction } from '../App';

type IncomePageProps = {
  incomeData: Transaction[];
  setIncomeData: (data: Transaction[]) => void;
};

export default function IncomePage({ incomeData, setIncomeData }: IncomePageProps) {
  const [formData, setFormData] = useState({
    date: '',
    amount: '',
    description: '',
  });

  const handleReset = () => {
    setFormData({
      date: '',
      amount: '',
      description: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.date || !formData.amount || !formData.description) {
      toast.error('Semua field harus diisi!');
      return;
    }

    const numericAmount = parseInt(formData.amount.replace(/\D/g, ''));
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast.error('Jumlah harus berupa angka yang valid!');
      return;
    }

    const newIncome = {
      id: incomeData.length > 0 ? Math.max(...incomeData.map(i => i.id)) + 1 : 1,
      date: new Date(formData.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      description: formData.description,
      amount: `Rp ${numericAmount.toLocaleString('id-ID')}`,
      numericAmount: numericAmount,
    };

    setIncomeData([newIncome, ...incomeData]);
    toast.success('Data pemasukan berhasil disimpan!', {
      description: `${newIncome.description} - ${newIncome.amount}`,
    });
    handleReset();
  };

  const handleDelete = (id: number, description: string, amount: string) => {
    toast.warning(`Hapus data ${description}?`, {
      description: `Jumlah: ${amount}`,
      action: {
        label: 'Hapus',
        onClick: () => {
          setIncomeData(incomeData.filter(item => item.id !== id));
          toast.success('Data berhasil dihapus!');
        },
      },
      cancel: {
        label: 'Batal',
        onClick: () => {},
      },
    });
  };

  const totalAmount = incomeData.reduce((sum, item) => sum + item.numericAmount, 0);
  const transactionCount = incomeData.length;

  return (
    <div className="flex-1 p-3 sm:p-4 lg:p-8 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Page Header */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">Manajemen Pemasukan</h1>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600">Kelola data pemasukan keuangan masjid</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-md border border-gray-200/50">
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6">Tambah Pemasukan</h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Date Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tanggal
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700"
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Amount Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Jumlah (Rp)
                  </label>
                  <input
                    type="text"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="Masukkan jumlah"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700"
                  />
                </div>

                {/* Description Textarea */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Keterangan
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Masukkan keterangan transaksi (opsional)"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700 resize-none"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all"
                  >
                    Simpan Data
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Panel - Data Table Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-md border border-gray-200/50">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-3 sm:mb-4 lg:mb-6 gap-3 sm:gap-4">
                <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">Data Pemasukan</h2>
                <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 flex-wrap">
                  <div className="text-left sm:text-right">
                    <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase">Total Transaksi</p>
                    <p className="text-base sm:text-lg font-bold text-gray-900">{transactionCount} transaksi</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase">Total Pemasukan</p>
                    <p className="text-base sm:text-lg font-bold text-emerald-600 truncate">Rp {totalAmount.toLocaleString('id-ID')}</p>
                  </div>
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-center py-4 px-3 text-xs font-bold text-gray-600 uppercase tracking-wider w-16">
                        #
                      </th>
                      <th className="text-left py-4 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
                        Tanggal
                      </th>
                      <th className="text-left py-4 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
                        Keterangan
                      </th>
                      <th className="text-right py-4 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
                        Jumlah
                      </th>
                      <th className="text-center py-4 px-3 text-xs font-bold text-gray-600 uppercase tracking-wider w-20">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {incomeData.map((item, index) => (
                      <tr
                        key={item.id}
                        className={`border-b border-gray-100 hover:bg-emerald-50/50 transition-colors ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                        }`}
                      >
                        <td className="py-4 px-3 text-center text-sm font-medium text-gray-600">
                          {item.id}
                        </td>
                        <td className="py-4 px-4 text-sm font-medium text-gray-900">
                          {item.date}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-700">
                          {item.description}
                        </td>
                        <td className="py-4 px-4 text-sm text-right font-bold text-emerald-600">
                          {item.amount}
                        </td>
                        <td className="py-4 px-3 text-center">
                          <button
                            onClick={() => handleDelete(item.id, item.description, item.amount)}
                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
