import React from 'react';
import { useNotifications } from '../context/NotificationContext';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import {
  Bell,
  CheckCheck,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Info,
  CalendarCheck
} from 'lucide-react';

const NotificationsPage = () => {
  const { notifications, unreadCount, loading, markAsRead, markAllAsRead } = useNotifications();

  const getIcon = (type) => {
    switch (type) {
      case 'booking_confirmed':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'booking_cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'schedule_change':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'reminder':
        return <Clock className="w-5 h-5 text-[#E65100]" />;
      default:
        return <Info className="w-5 h-5 text-[#D4AF37]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#D4AF37]/25 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#6B1D2F]">
                Notification Center
              </h1>
              {unreadCount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E65100] text-white">
                  {unreadCount} unread
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-[#8D8070] mt-1">
              Important alerts regarding your temple bookings, darshan timings, and schedule updates.
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="inline-flex items-center px-4 py-2 rounded-xl border border-[#D4AF37]/50 bg-white hover:bg-[#F7F3EA] text-xs font-semibold text-[#6B1D2F] shadow-sm transition-all"
            >
              <CheckCheck className="w-4 h-4 mr-1.5 text-[#E65100]" />
              <span>Mark All as Read</span>
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="mt-8 space-y-3">
          {loading ? (
            <LoadingSpinner text="Checking inbox for new alerts..." />
          ) : notifications.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
              <Bell className="w-12 h-12 text-[#D4AF37] mx-auto mb-3 opacity-50" />
              <h3 className="font-serif text-lg font-bold text-gray-800">No Notifications</h3>
              <p className="text-xs text-gray-500 mt-1">
                You do not have any alerts at this time. All updates will appear here.
              </p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif._id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex items-start space-x-4 ${
                  !notif.isRead
                    ? 'bg-white border-[#E65100]/40 shadow-sm ring-1 ring-[#E65100]/15'
                    : 'bg-white/80 border-gray-200 opacity-90'
                }`}
              >
                <div className="p-2 rounded-xl bg-[#F7F3EA] shrink-0 mt-0.5">
                  {getIcon(notif.type)}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-sm sm:text-base text-gray-900">
                      {notif.title}
                    </h3>
                    <span className="text-[11px] text-gray-400">
                      {new Date(notif.createdAt).toLocaleDateString()}{' '}
                      {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed font-light">
                    {notif.message}
                  </p>

                  {notif.bookingReference && (
                    <div className="pt-1">
                      <span className="text-[10px] font-mono font-bold text-[#E65100] bg-[#FF6F00]/10 px-2 py-0.5 rounded">
                        Ref: {notif.bookingReference}
                      </span>
                    </div>
                  )}
                </div>

                {!notif.isRead && (
                  <button
                    onClick={() => markAsRead(notif._id)}
                    className="shrink-0 text-xs text-[#E65100] hover:text-[#BF360C] font-semibold p-1"
                    title="Mark as read"
                  >
                    Mark Read
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotificationsPage;
