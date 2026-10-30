import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, AlertCircle, ArrowRight, LayoutDashboard, ArrowLeft } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || null;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const loggedUser = await login(email, password);

      // Redirect based on role or intended destination
      if (from) {
        navigate(from, { replace: true });
      } else if (loggedUser.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center space-x-2 group">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#E65100] via-[#FF6F00] to-[#D4AF37] p-0.5 shadow-md">
            <div className="w-full h-full bg-[#FDFBF7] rounded-full flex items-center justify-center">
              <span className="text-2xl">🕉️</span>
            </div>
          </div>
          <span className="font-serif text-3xl font-black text-[#6B1D2F]">
            DarshanEase
          </span>
        </Link>
        <h2 className="mt-4 text-xl sm:text-2xl font-serif font-bold text-gray-900">
          Sign In to Your Account
        </h2>
        <p className="mt-1 text-xs text-[#8D8070]">
          Access your temple passes, bookings, and spiritual pilgrimage history
        </p>

        {/* View Dashboard Before Login Action */}
        <div className="mt-3">
          <Link
            to="/"
            className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#FFF9F0] text-[#E65100] border border-amber-300 hover:bg-[#FFE0B2] transition-colors"
          >
            <LayoutDashboard className="w-3.5 h-3.5 mr-1.5" />
            <span>Explore Dashboard</span>
          </Link>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-[#D4AF37]/30 shadow-xl space-y-6">
          
          {/* Error Message */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#E65100]"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#E65100]"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF6F00] to-[#E65100] text-white text-xs font-bold shadow-md hover:shadow-lg hover:brightness-105 transition-all disabled:opacity-50 flex items-center justify-center cursor-pointer"
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </>
              )}
            </button>
          </form>

          {/* Registration link and Return to Home */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
            <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-900">
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              <span>Back to Home</span>
            </Link>

            <div>
              <span>New devotee? </span>
              <Link to="/register" className="font-bold text-[#E65100] hover:underline">
                Register here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
