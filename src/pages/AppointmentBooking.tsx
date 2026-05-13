import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Calendar, Clock, User, Phone, Mail, Stethoscope } from 'lucide-react';
import { departments, doctors } from '../data/mockData';
import { auth, db } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AuthCard } from '../components/AuthCard';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export function AppointmentBooking() {
  const [searchParams] = useSearchParams();
  const initialDept = searchParams.get('department') || '';
  const initialDoctor = searchParams.get('doctor') || '';

  const [user, loading, error] = useAuthState(auth);

  const [formData, setFormData] = useState({
    departmentId: initialDept,
    doctorId: initialDoctor,
    date: '',
    time: '',
    patientName: '',
    email: '',
    phone: '',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({ 
        ...prev, 
        email: prev.email || user.email || '',
        patientName: prev.patientName || user.displayName || ''
      }));
    }
  }, [user]);

  // When department changes, if the current selected doctor doesn't belong to it, reset doctor
  useEffect(() => {
    if (formData.departmentId && formData.doctorId) {
      const doctor = doctors.find(d => d.id === formData.doctorId);
      if (doctor && doctor.departmentId !== formData.departmentId) {
        setFormData(prev => ({ ...prev, doctorId: '' }));
      }
    }
  }, [formData.departmentId, formData.doctorId]);

  const filteredDoctors = formData.departmentId 
    ? doctors.filter(doc => doc.departmentId === formData.departmentId)
    : [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setSubmitError('');
    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, 'appointments'), {
        ...formData,
        userId: user.uid,
        createdAt: serverTimestamp(),
        status: 'pending'
      });
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setSubmitError(`Failed to book appointment: ${err.message || 'Please try again.'}`);
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-slate-50 min-h-screen py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900">Sign in to Book</h1>
            <p className="mt-2 text-slate-600">You must be signed in to book an appointment.</p>
          </div>
          <AuthCard />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden"
            >
              <div className="bg-primary-600 px-8 py-10 text-white relative">
                <h1 className="text-3xl font-extrabold tracking-tight mb-2">Book an Appointment</h1>
                <p className="text-primary-100 text-lg">
                  Fill out the form below and we'll schedule your visit.
                </p>
                <div className="absolute top-4 right-6 text-sm bg-primary-700 px-3 py-1 rounded-full border border-primary-500">
                  Logged in as {user.email}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-8">
                {submitError && (
                  <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm text-center font-medium">
                    {submitError}
                  </div>
                )}
                
                {/* Medical Details */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-primary-500" />
                    Medical Requirements
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="departmentId" className="block text-sm font-medium text-slate-700">Department *</label>
                      <select
                        id="departmentId"
                        name="departmentId"
                        required
                        value={formData.departmentId}
                        onChange={handleInputChange}
                        className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-slate-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded-xl border bg-slate-50"
                      >
                        <option value="" disabled>Select Department</option>
                        {departments.map(dept => (
                          <option key={dept.id} value={dept.id}>{dept.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="doctorId" className="block text-sm font-medium text-slate-700">Doctor (Optional)</label>
                      <select
                        id="doctorId"
                        name="doctorId"
                        value={formData.doctorId}
                        onChange={handleInputChange}
                        disabled={!formData.departmentId || filteredDoctors.length === 0}
                        className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-slate-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded-xl border bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="">Any available doctor</option>
                        {filteredDoctors.map(doc => (
                          <option key={doc.id} value={doc.id}>{doc.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-8 mt-8"></div>

                {/* Date & Time */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary-500" />
                    Schedule
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-slate-700">Preferred Date *</label>
                      <div className="mt-1 relative rounded-xl shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          type="date"
                          name="date"
                          id="date"
                          required
                          min={new Date().toISOString().split('T')[0]}
                          value={formData.date}
                          onChange={handleInputChange}
                          className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 py-3 sm:text-sm border-slate-300 rounded-xl border bg-slate-50"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-slate-700">Preferred Time *</label>
                      <div className="mt-1 relative rounded-xl shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Clock className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          type="time"
                          name="time"
                          id="time"
                          required
                          value={formData.time}
                          onChange={handleInputChange}
                          className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 py-3 sm:text-sm border-slate-300 rounded-xl border bg-slate-50"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-8 mt-8"></div>

                {/* Patient Details */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-primary-500" />
                    Patient Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="sm:col-span-2">
                      <label htmlFor="patientName" className="block text-sm font-medium text-slate-700">Full Name *</label>
                      <input
                        type="text"
                        name="patientName"
                        id="patientName"
                        required
                        value={formData.patientName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full py-3 px-4 border shadow-sm border-slate-300 rounded-xl bg-slate-50"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address *</label>
                      <div className="mt-1 relative rounded-xl shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="you@example.com"
                          className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 py-3 sm:text-sm border-slate-300 rounded-xl border bg-slate-50"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Phone Number *</label>
                      <div className="mt-1 relative rounded-xl shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 py-3 sm:text-sm border-slate-300 rounded-xl border bg-slate-50"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="notes" className="block text-sm font-medium text-slate-700">Additional Notes</label>
                      <textarea
                        id="notes"
                        name="notes"
                        rows={3}
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Briefly describe your symptoms or reason for visit..."
                        className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full py-3 px-4 border shadow-sm border-slate-300 rounded-xl bg-slate-50 resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-bold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Confirming...' : 'Confirm Appointment'}
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden p-10 text-center"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6"
              >
                <CheckCircle className="h-12 w-12 text-green-600" />
              </motion.div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Appointment Requested!</h2>
              <p className="text-slate-500 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                Thank you for choosing Cura Hospitals. Your appointment request has been received. Our team will contact you shortly to confirm the details.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/my-bookings"
                  className="inline-flex justify-center py-3 px-8 rounded-xl shadow-sm border border-transparent text-lg font-bold text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                >
                  View My Bookings
                </Link>
                <button
                  onClick={() => {
                    setFormData({
                      departmentId: '', doctorId: '', date: '', time: '', patientName: '', email: user?.email || '', phone: '', notes: ''
                    });
                    setIsSubmitted(false);
                  }}
                  className="inline-flex justify-center py-3 px-8 border-2 border-slate-200 rounded-xl text-lg font-bold text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 transition-colors"
                >
                  Book Another
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
