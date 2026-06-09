import { User, Mail, Phone, MapPin, Calendar, Shield, Edit2, Camera, Save, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type ProfilePageProps = {
  onLogout: () => void;
};

export default function ProfilePage({ onLogout }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Zaenal Anshori',
    email: 'zaenal.anshori@masjid.com',
    phone: '+62 812-3456-7890',
    role: 'Administrator',
    address: 'Jl. Masjid Raya No. 123, Jakarta',
    joinDate: '1 Januari 2024',
  });

  const [editData, setEditData] = useState(profileData);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(profileData);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
    toast.success('Profil berhasil diperbarui!', {
      description: 'Data profil Anda telah disimpan',
    });
  };

  const stats = [
    {
      label: 'Total Transaksi',
      value: '150',
      color: 'bg-blue-50',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
    },
    {
      label: 'Pemasukan Dicatat',
      value: '85',
      color: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-100',
    },
    {
      label: 'Pengeluaran Dicatat',
      value: '65',
      color: 'bg-orange-50',
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-100',
    },
  ];

  return (
    <div className="flex-1 p-3 sm:p-4 lg:p-8 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 lg:mb-8 gap-3 sm:gap-4">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 truncate">Profil Pengguna</h1>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 truncate">Kelola informasi dan pengaturan akun Anda</p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md border border-gray-200/50 overflow-hidden">
          {/* Header with Background */}
          <div className="h-32 sm:h-40 lg:h-48 bg-gradient-to-r from-emerald-600 to-emerald-700 relative">
            <div className="absolute -bottom-16 sm:-bottom-20 lg:-bottom-24 left-1/2 -translate-x-1/2 sm:left-6 lg:left-8 sm:translate-x-0">
              <div className="relative">
                <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full bg-white p-2 sm:p-2.5 lg:p-3 shadow-xl">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center">
                    <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">Z</span>
                  </div>
                </div>
                <button className="absolute bottom-2 right-2 w-10 h-10 sm:w-12 sm:h-12 bg-emerald-600 hover:bg-emerald-700 rounded-full flex items-center justify-center shadow-lg transition-colors">
                  <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-20 sm:pt-24 lg:pt-28 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-4 mb-6 sm:mb-8 pt-4 sm:pt-0">
              <div className="min-w-0 text-center sm:text-left">
                <h2 className="text-2xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-2 truncate">
                  {profileData.name}
                </h2>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-sm sm:text-sm text-gray-600 mb-2">
                  <Shield className="w-4 h-4 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" />
                  <span className="truncate">{profileData.role}</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm text-gray-500">
                  <Calendar className="w-4 h-4 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="truncate">Bergabung sejak {profileData.joinDate}</span>
                </div>
              </div>
              <div className="flex justify-center sm:justify-end w-full sm:w-auto">
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg sm:rounded-xl font-semibold transition-colors shadow-md hover:shadow-lg flex-shrink-0 text-sm sm:text-base w-full sm:w-auto"
                  >
                    <Edit2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Edit Profil</span>
                  </button>
                ) : (
                  <div className="flex gap-2 sm:gap-3 flex-shrink-0 w-full sm:w-auto">
                    <button
                      onClick={handleCancel}
                      className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg sm:rounded-xl font-semibold transition-colors text-sm sm:text-base flex-1 sm:flex-initial"
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="hidden sm:inline">Batal</span>
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg sm:rounded-xl font-semibold transition-colors shadow-md hover:shadow-lg text-sm sm:text-base flex-1 sm:flex-initial"
                    >
                      <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Simpan</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`${stat.color} rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 text-center border border-white/50 shadow-sm`}
                >
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-sm lg:text-base font-medium text-gray-600 leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Profile Details */}
            <div className="space-y-4 sm:space-y-5">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Informasi Pribadi</h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
                {/* Name */}
                <div>
                  <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
                    Nama Lengkap
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700 text-sm sm:text-base"
                    />
                  ) : (
                    <p className="text-sm sm:text-base text-gray-900 bg-gray-50 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl truncate">
                      {profileData.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700 text-sm sm:text-base"
                    />
                  ) : (
                    <p className="text-sm sm:text-base text-gray-900 bg-gray-50 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl truncate">
                      {profileData.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
                    Nomor Telepon
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700 text-sm sm:text-base"
                    />
                  ) : (
                    <p className="text-sm sm:text-base text-gray-900 bg-gray-50 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl truncate">
                      {profileData.phone}
                    </p>
                  )}
                </div>

                {/* Role */}
                <div>
                  <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
                    Role
                  </label>
                  <p className="text-sm sm:text-base text-gray-900 bg-gray-100 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl truncate">
                    {profileData.role}
                  </p>
                </div>

                {/* Address */}
                <div className="lg:col-span-2">
                  <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
                    Alamat
                  </label>
                  {isEditing ? (
                    <textarea
                      value={editData.address}
                      onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                      rows={3}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700 resize-none text-sm sm:text-base"
                    />
                  ) : (
                    <p className="text-sm sm:text-base text-gray-900 bg-gray-50 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl">
                      {profileData.address}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-md border border-gray-200/50">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6">Keamanan Akun</h3>
          <div className="space-y-3 sm:space-y-4">
            <button className="w-full flex items-center justify-between p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 rounded-lg sm:rounded-xl transition-colors group">
              <span className="text-sm sm:text-base font-medium text-gray-700">Ubah Password</span>
              <Edit2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-emerald-600 transition-colors" />
            </button>
            <button className="w-full flex items-center justify-between p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 rounded-lg sm:rounded-xl transition-colors group">
              <span className="text-sm sm:text-base font-medium text-gray-700">Aktivitas Login Terakhir</span>
              <Edit2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-emerald-600 transition-colors" />
            </button>
            <button
              onClick={() => {
                toast.warning('Konfirmasi Logout', {
                  description: 'Apakah Anda yakin ingin keluar?',
                  action: {
                    label: 'Logout',
                    onClick: onLogout,
                  },
                  cancel: {
                    label: 'Batal',
                    onClick: () => {},
                  },
                });
              }}
              className="w-full flex items-center justify-between p-3 sm:p-4 bg-red-50 hover:bg-red-100 rounded-lg sm:rounded-xl transition-colors group border border-red-200"
            >
              <span className="text-sm sm:text-base font-semibold text-red-700">Logout dari Akun</span>
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 group-hover:text-red-700 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
