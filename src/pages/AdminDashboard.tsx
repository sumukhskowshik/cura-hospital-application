import { useEffect, useState } from 'react';
import { collection, query, getDocs, doc, updateDoc, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { departments, doctors } from '../data/mockData';
import { motion } from 'motion/react';
import { Calendar, Clock, User, Stethoscope, CheckCircle, XCircle, Trash2, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const ADMIN_EMAIL = 'sumukhskowshik440@gmail.com';

export function AdminDashboard() {
  const [user, loading] = useAuthState(auth);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '', email: '', phone: '', departmentId: '', doctorId: '', date: '', time: ''
  });

  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = async () => {
    try {
      setError(null);
      const q = query(collection(db, 'appointments'));
      const querySnapshot = await getDocs(q);
      const appsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      appsData.sort((a, b) => {
        const timeA = a.createdAt?.toMillis?.() || 0;
        const timeB = b.createdAt?.toMillis?.() || 0;
        return timeB - timeA;
      });
      
      setAppointments(appsData);
    } catch (err: any) {
      console.error("Error fetching appointments:", err);
      setError(err.message || 'Error fetching appointments');
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      if (user && user.email === ADMIN_EMAIL) {
        fetchAppointments();
      } else {
        setFetching(false);
      }
    }
  }, [user, loading]);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'appointments', id), { status });
      fetchAppointments();
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await deleteDoc(doc(db, 'appointments', id));
        fetchAppointments();
      } catch (err) {
        console.error(err);
        alert('Failed to delete booking');
      }
    }
  };

  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'appointments'), {
        ...formData,
        userId: 'admin_created',
        createdAt: serverTimestamp(),
        status: 'confirmed'
      });
      setShowAddForm(false);
      setFormData({ patientName: '', email: '', phone: '', departmentId: '', doctorId: '', date: '', time: '' });
      fetchAppointments();
    } catch (err) {
      console.error(err);
      alert('Failed to create booking');
    }
  };

  if (loading || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center bg-white p-12 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Admin Access Required</h2>
          <p className="text-slate-600 mb-6">Please sign in as admin ({ADMIN_EMAIL}) to view this page.</p>
          <Link to="/book-appointment" className="text-primary-600 font-medium hover:underline">
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Admin Dashboard</h1>
            <p className="mt-2 text-lg text-slate-600">Manage all appointments across the hospital.</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition"
          >
            {showAddForm ? 'Cancel' : <><Plus className="w-5 h-5 mr-2" /> Add Booking</>}
          </button>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 text-red-700 rounded-xl font-medium border border-red-200">
            Error loading appointments: {error}
            <div className="text-sm mt-2 text-red-600 font-normal">If it says "Missing or insufficient permissions", you need to update your Firestore Database Rules to allow read/write access.</div>
          </div>
        )}

        {showAddForm && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">New Booking (Admin)</h2>
            <form onSubmit={handleCreateBooking} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input required placeholder="Patient Name" value={formData.patientName} onChange={e => setFormData({...formData, patientName: e.target.value})} className="border p-2 rounded-xl" />
              <input required type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="border p-2 rounded-xl" />
              <input required placeholder="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="border p-2 rounded-xl" />
              <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="border p-2 rounded-xl" />
              <input required type="time" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="border p-2 rounded-xl" />
              <select required value={formData.departmentId} onChange={e => setFormData({...formData, departmentId: e.target.value})} className="border p-2 rounded-xl">
                <option value="">Select Department</option>
                {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
              <select required value={formData.doctorId} onChange={e => setFormData({...formData, doctorId: e.target.value})} className="border p-2 rounded-xl">
                <option value="">Select Doctor</option>
                {doctors.filter(d => !formData.departmentId || d.departmentId === formData.departmentId).map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
              <div className="sm:col-span-2">
                <button type="submit" className="w-full bg-primary-600 text-white py-2 rounded-xl hover:bg-primary-700">Create Appointment</button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-xs uppercase tracking-wider">
                  <th className="p-4">Patient</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Appointment</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">No appointments found.</td>
                  </tr>
                ) : appointments.map((apt) => (
                  <tr key={apt.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-4 py-6 text-left whitespace-nowrap">
                      <div className="font-bold text-slate-900">{apt.patientName}</div>
                      <div className="text-sm text-slate-500 mt-1">Created: {apt.createdAt?.toDate ? apt.createdAt.toDate().toLocaleDateString() : 'N/A'}</div>
                    </td>
                    <td className="p-4 py-6 text-left whitespace-nowrap">
                      <div className="font-medium text-slate-700">{apt.email || 'No email provided'}</div>
                      <div className="text-sm text-slate-500 mt-1">{apt.phone || '0000000000'}</div>
                    </td>
                    <td className="p-4 py-6 text-left whitespace-nowrap">
                      <div className="font-bold text-slate-700">
                        {departments.find(d => d.id === apt.departmentId)?.name || 'N/A'} - {doctors.find(d => d.id === apt.doctorId)?.title?.includes('Dr.') ? '' : 'Dr. '}{doctors.find(d => d.id === apt.doctorId)?.name || 'N/A'}
                      </div>
                      <div className="text-sm text-slate-500 mt-1">{apt.date} at {apt.time}</div>
                    </td>
                    <td className="p-4 py-6 text-left whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                        apt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        apt.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {apt.status ? apt.status.charAt(0).toUpperCase() + apt.status.slice(1) : 'Pending'}
                      </span>
                    </td>
                    <td className="p-4 py-6 text-left whitespace-nowrap flex items-center justify-between">
                      <select
                        value={apt.status || 'pending'}
                        onChange={(e) => handleUpdateStatus(apt.id, e.target.value)}
                        className="font-bold text-slate-700 bg-transparent border-0 focus:ring-0 cursor-pointer hover:text-slate-900 p-0 inline-block pr-8"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <button
                        onClick={() => handleDelete(apt.id)}
                        className="ml-4 text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-lg hover:bg-red-100 transition-colors"
                        title="Delete record"
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
  );
}
