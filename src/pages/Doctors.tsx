import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { doctors, departments } from '../data/mockData';
import { Calendar, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Doctors() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDepartment = searchParams.get('department') || 'all';
  const [selectedDept, setSelectedDept] = useState(initialDepartment);

  // Sync state if query param changes directly via link
  useEffect(() => {
    setSelectedDept(searchParams.get('department') || 'all');
  }, [searchParams]);

  const handleDeptChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDept(e.target.value);
    if (e.target.value === 'all') {
      searchParams.delete('department');
    } else {
      searchParams.set('department', e.target.value);
    }
    setSearchParams(searchParams, { replace: true });
  };

  const filteredDoctors = useMemo(() => {
    if (selectedDept === 'all') return doctors;
    return doctors.filter(doc => doc.departmentId === selectedDept);
  }, [selectedDept]);

  return (
    <div className="bg-slate-50 min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Our Medical Specialists</h1>
            <p className="text-xl text-slate-500 max-w-2xl">
              Meet our team of board-certified clinical experts dedicated to providing exceptional care.
            </p>
          </div>
          
          <div className="flex-shrink-0 w-full md:w-auto">
            <label htmlFor="department" className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filter by Department
            </label>
            <select
              id="department"
              value={selectedDept}
              onChange={handleDeptChange}
              className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-slate-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-xl border bg-white shadow-sm"
            >
              <option value="all">All Departments</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredDoctors.map((doctor, index) => {
              const dept = departments.find(d => d.id === doctor.departmentId);
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={doctor.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-lg hover:border-primary-200 transition-all flex flex-col group"
                >
                  <div className="h-64 overflow-hidden relative">
                    <img 
                      src={doctor.image} 
                      alt={doctor.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary-700 shadow-sm">
                      {dept?.name}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{doctor.name}</h3>
                    <p className="text-primary-600 font-medium text-sm mb-4">{doctor.title}</p>
                    
                    <p className="text-slate-500 text-sm mb-6 flex-1">
                      {doctor.about}
                    </p>
                    
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                      <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                        {doctor.experience} Exp.
                      </span>
                      <Link
                        to={`/book-appointment?doctor=${doctor.id}&department=${doctor.departmentId}`}
                        className="inline-flex items-center justify-center p-2 rounded-full text-primary-600 hover:bg-primary-50 transition-colors"
                        title="Book Appointment"
                      >
                        <Calendar className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-2xl border border-slate-200 border-dashed">
            <p className="text-lg text-slate-500">No doctors found for this department.</p>
            <button
              onClick={() => setSelectedDept('all')}
              className="mt-4 text-primary-600 font-medium hover:text-primary-700"
            >
              Clear Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
