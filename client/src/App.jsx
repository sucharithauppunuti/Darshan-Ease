import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Public & Devotee Pages
import Home from './pages/Home';
import TemplesList from './pages/TemplesList';
import TempleDetails from './pages/TempleDetails';
import BookingWizard from './pages/BookingWizard';
import BookingConfirmation from './pages/BookingConfirmation';
import MyBookings from './pages/MyBookings';
import NotificationsPage from './pages/NotificationsPage';
import ProfilePage from './pages/ProfilePage';
import Login from './pages/Login';
import Register from './pages/Register';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTemples from './pages/admin/AdminTemples';
import AdminTempleForm from './pages/admin/AdminTempleForm';
import AdminDarshanTypes from './pages/admin/AdminDarshanTypes';
import AdminSlots from './pages/admin/AdminSlots';
import AdminBookings from './pages/admin/AdminBookings';
import AdminEnquiries from './pages/admin/AdminEnquiries';
import MobileBottomNav from './components/common/MobileBottomNav';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <Routes>
            {/* Public Discovery Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/temples" element={<TemplesList />} />
            <Route path="/temples/:id" element={<TempleDetails />} />

            {/* Authentication */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Devotee Routes (Protected) */}
            <Route
              path="/book/:templeId"
              element={
                <ProtectedRoute>
                  <BookingWizard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking-confirmation/:bookingId"
              element={
                <ProtectedRoute>
                  <BookingConfirmation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-bookings"
              element={
                <ProtectedRoute>
                  <MyBookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-bookings/:bookingId"
              element={
                <ProtectedRoute>
                  <BookingConfirmation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <NotificationsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Dashboard & Admin Portal Routes */}
            <Route
              path="/dashboard"
              element={<AdminDashboard />}
            />
            <Route
              path="/admin"
              element={<Navigate to="/dashboard" replace />}
            />
            <Route
              path="/admin/dashboard"
              element={<AdminDashboard />}
            />
            <Route
              path="/admin/enquiries"
              element={
                <ProtectedRoute role="admin">
                  <AdminEnquiries />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/temples"
              element={
                <ProtectedRoute role="admin">
                  <AdminTemples />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/temples/new"
              element={
                <ProtectedRoute role="admin">
                  <AdminTempleForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/temples/:id/edit"
              element={
                <ProtectedRoute role="admin">
                  <AdminTempleForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/darshan-types"
              element={
                <ProtectedRoute role="admin">
                  <AdminDarshanTypes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/slots"
              element={
                <ProtectedRoute role="admin">
                  <AdminSlots />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/bookings"
              element={
                <ProtectedRoute role="admin">
                  <AdminBookings />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <MobileBottomNav />
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
