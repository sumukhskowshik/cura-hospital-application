import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Calendar, Clock, User, Stethoscope } from 'lucide-react';
import { departments, doctors } from '../data/mockData';
import { Link } from 'react-router-dom';

interface Appointment {
  id: string;
  departmentId: string;
  doctorId: string;
  date: string;
  time: string;
  patientName: string;
  status: string;
  createdAt: any;
}

export function MyBookings() {
  const [user, loading] = useAuthState(auth);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user) return;
      
      try {
        const q = query(
          collection(db, 'appointments'),
          where('userId', '==', user.uid),
          // orderBy requires an index to be built in firestore for composite queries, so we'll just sort client-side for simplicity if needed
        );
        
        const querySnapshot = await getDocs(q);
        const appsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Appointment[];
        
        // Sort by creation date descending
        appsData.sort((a, b) => {
          const timeA = a.createdAt?.toMillis?.() || 0;
          const timeB = b.createdAt?.toMillis?.() || 0;
          return timeB - timeA;
        });
        
        setAppointments(appsData);
      } catch (err: any) {
        console.error("Error fetching appointments:", err);
        setError(err.message || 'Failed to load bookings');
      } finally {
        setFetching(false);
      }
    };

    if (!loading) {
      if (user) {
        fetchAppointments();
      } else {
        setFetching(false);
      }
    }
  }, [user, loading]);

  if (loading || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Please Sign In</h2>
          <p className="text-slate-600 mb-6">You need to sign in to view your bookings.</p>
          <Link to="/book-appointment" className="text-primary-600 font-medium hover:underline">
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl font-extrabold text-slate-900">My Appointments</h1>
          <p className="mt-2 text-lg text-slate-600">View and manage your upcoming visits.</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 text-red-700 rounded-xl">
            {error}
          </div>
        )}

        {!error && appointments.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-3xl shadow-sm border border-slate-100">
            <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No Appointments Yet</h3>
            <p className="text-slate-500 mb-6">You haven't booked any appointments with us.</p>
            <Link
              to="/book-appointment"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 shadow-sm"
            >
              Book an Appointment
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {appointments.map((apt, index) => {
              const deptName = departments.find(d => d.id === apt.departmentId)?.name || 'General';
              const doctorName = doctors.find(d => d.id === apt.doctorId)?.name || 'Any Doctor';
              const createdDate = apt.createdAt?.toDate ? apt.createdAt.toDate().toLocaleDateString() : '';

              return (
                <motion.div
                  key={apt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                      apt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      apt.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {apt.status ? apt.status.charAt(0).toUpperCase() + apt.status.slice(1) : 'Pending'}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{createdDate && `${createdDate}`}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-1">{deptName}</h3>
                  <div className="flex items-center text-slate-600 mb-4 text-sm">
                    <Stethoscope className="w-4 h-4 mr-2" />
                    <span>{doctorName}</span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-slate-700">
                      <div className="bg-slate-100 p-2 rounded-lg mr-3">
                        <Calendar className="w-4 h-4 text-primary-600" />
                      </div>
                      <span className="font-medium text-sm">{apt.date}</span>
                    </div>
                    <div className="flex items-center text-slate-700">
                      <div className="bg-slate-100 p-2 rounded-lg mr-3">
                        <Clock className="w-4 h-4 text-primary-600" />
                      </div>
                      <span className="font-medium text-sm">{apt.time}</span>
                    </div>
                    <div className="flex items-center text-slate-700">
                      <div className="bg-slate-100 p-2 rounded-lg mr-3">
                        <User className="w-4 h-4 text-primary-600" />
                      </div>
                      <span className="font-medium text-sm">{apt.patientName}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
