import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosClient from '../api/axiosClient';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { User, Phone, Mail, Lock, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

const ProfilePage = () => {
  const { user, updateCurrentUser } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage({ type: '', text: '' });

      const payload = { name, phone };
      if (newPassword) {
        if (!currentPassword) {
          setMessage({ type: 'error', text: 'Current password is required to set a new password' });
          setLoading(false);
          return;
        }
        payload.currentPassword = currentPassword;
        payload.newPassword = newPassword;
      }

      const res = await axiosClient.put('/auth/profile', payload);
      if (res.data.success) {
        updateCurrentUser(res.data.user);
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setCurrentPassword('');
        setNewPassword('');
      }
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to update profile'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F0E4] temple-dashboard-bg flex flex-col font-sans text-[#1A1815]">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="mb-8 pb-4 border-b border-[#C5A15B]/30">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#321B1D]">
            Devotee Profile & Account
          </h1>
          <p className="text-xs sm:text-sm text-[#7D7060] mt-1">
            Manage your personal contact details and security preferences.
          </p>
        </div>

        {message.text && (
          <div
            className={`mb-6 p-4 rounded-xl text-xs flex items-center space-x-2 ${
              message.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#C5A15B]/35 shadow-sm space-y-6">
          {/* Avatar Header */}
          <div className="flex items-center space-x-4 pb-6 border-b border-gray-100">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#321B1D] to-[#E87519] text-[#E2C889] flex items-center justify-center font-serif text-2xl font-bold shadow-md border border-[#C5A15B]/40">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-[#321B1D]">{user?.name}</h2>
              <p className="text-xs text-gray-500">{user?.email}</p>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E87519]/10 text-[#E87519] border border-[#E87519]/20 uppercase tracking-wider">
                Role: {user?.role}
              </span>
            </div>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-800 focus:outline-none focus:border-[#E65100]"
                  required
                />
              </div>
            </div>

            {/* Email (Readonly) */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Email Address (Account ID)
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-xs text-gray-500"
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-1">Email address cannot be changed.</p>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Contact Phone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  placeholder="+91 9845012345"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-800 focus:outline-none focus:border-[#E65100]"
                />
              </div>
            </div>

            {/* Password Change Divider */}
            <div className="pt-4 border-t border-gray-100">
              <h3 className="font-serif text-sm font-bold text-gray-900 mb-3 flex items-center">
                <Lock className="w-4 h-4 mr-1.5 text-[#D4AF37]" />
                Change Password (Optional)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Current Password</label>
                  <input
                    type="password"
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#E65100]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password (min 6 chars)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#E65100]"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-full bg-[#E87519] text-white text-xs font-bold hover:bg-[#D4630A] transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {loading ? 'Saving Changes...' : 'Save Profile Changes'}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
