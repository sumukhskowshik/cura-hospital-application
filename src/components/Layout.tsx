import { Link, Outlet, useLocation } from 'react-router-dom';
import { HeartPulse, Menu, X, Calendar, Phone, Mail, MapPin, LogOut } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { auth } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [user] = useAuthState(auth);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Departments', href: '/departments' },
    { name: 'Doctors', href: '/doctors' },
  ];

  if (user) {
    navigation.push({ name: 'My Bookings', href: '/my-bookings' });
    if (user.email === 'sumukhskowshik440@gmail.com') {
      navigation.push({ name: 'Admin Panel', href: '/admin' });
    }
  }

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Top Info Bar */}
      <div className="hidden md:block bg-primary-900 text-white py-2 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2 text-primary-300" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2 text-primary-300" />
              <span>contact@curahospitals.in</span>
            </div>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-primary-300" />
            <span>123 Health Avenue, Medical District, Mysuru, Karnataka 570002</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="bg-primary-50 p-2 rounded-xl group-hover:bg-primary-100 transition-colors">
                  <HeartPulse className="h-8 w-8 text-primary-600" />
                </div>
                <span className="text-2xl font-bold text-slate-900 tracking-tight">Cura</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary-600",
                    location.pathname === item.href ? "text-primary-600" : "text-slate-600"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              
              <Link
                to="/book-appointment"
                className="inline-flex items-center justify-center rounded-full bg-primary-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all active:scale-95"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </Link>
              
              {user && (
                <button
                  onClick={() => signOut(auth)}
                  className="inline-flex items-center justify-center text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5 mr-1" />
                  Sign Out
                </button>
              )}
            </nav>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-200 overflow-hidden bg-white"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={closeMobileMenu}
                    className={cn(
                      "block px-3 py-3 rounded-md text-base font-medium",
                      location.pathname === item.href
                        ? "bg-primary-50 text-primary-700"
                        : "text-slate-700 hover:bg-slate-50 hover:text-primary-600"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {user && (
                  <button
                    onClick={() => {
                      signOut(auth);
                      closeMobileMenu();
                    }}
                    className="flex w-full text-left px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-primary-600 items-center"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Sign Out
                  </button>
                )}
                
                <div className="px-3 pt-3">
                  <Link
                    to="/book-appointment"
                    onClick={closeMobileMenu}
                    className="flex w-full items-center justify-center rounded-full bg-primary-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Appointment
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <div className="flex items-center gap-2">
                <HeartPulse className="h-8 w-8 text-primary-500" />
                <span className="text-2xl font-bold text-white tracking-tight">Cura</span>
              </div>
              <p className="text-slate-400 text-base leading-relaxed">
                Making advanced healthcare accessible to everyone. Your wellness is our highest priority.
              </p>
              <div className="flex space-x-6">
                <p className="text-slate-400 text-sm">
                  123 Health Avenue, Medical District<br/>
                  Mysuru, Karnataka 570002, India
                </p>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">Services</h3>
                  <ul className="mt-4 space-y-4">
                    {['Cardiology', 'Neurology', 'Orthopedics', 'Emergency Care'].map((item) => (
                      <li key={item}>
                        <Link to="/departments" className="text-base text-slate-400 hover:text-white transition-colors">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">Quick Links</h3>
                  <ul className="mt-4 space-y-4">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link to={item.href} className="text-base text-slate-400 hover:text-white transition-colors">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-1 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">Contact Us</h3>
                  <ul className="mt-4 space-y-4 text-base text-slate-400">
                    <li className="flex items-center">
                      <span className="text-primary-500 mr-2">Helpline:</span> +91 98765 43210
                    </li>
                    <li className="flex items-center">
                      <span className="text-primary-500 mr-2">Email:</span> contact@curahospitals.in
                    </li>
                    <li className="flex items-center">
                      <span className="text-primary-500 mr-2">Emergency:</span> 112 / 108
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-800 pt-8">
            <p className="text-base text-slate-400 xl:text-center">
              &copy; {new Date().getFullYear()} Cura Hospital. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
