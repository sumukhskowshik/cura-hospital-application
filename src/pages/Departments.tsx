import { motion } from 'motion/react';
import { departments } from '../data/mockData';
import { ArrowRight, Brain, Heart, Bone, Baby, Activity, Siren } from 'lucide-react';
import { Link } from 'react-router-dom';

const iconMap: Record<string, React.ElementType> = {
  'Heart': Heart,
  'Brain': Brain,
  'Bone': Bone,
  'Baby': Baby,
  'Activity': Activity,
  'Siren': Siren
};

export function Departments() {
  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-primary-900 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
          >
            Our Departments
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 max-w-2xl mx-auto text-xl text-primary-100"
          >
            Comprehensive medical services provided by expert specialists in cutting-edge facilities.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept, index) => {
            const IconComponent = iconMap[dept.icon] || Activity;
            
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={dept.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md shadow-slate-200/50 border border-slate-100 flex flex-col group"
              >
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-slate-900/20 mix-blend-multiply z-10"></div>
                  <img 
                    src={dept.image} 
                    alt={dept.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-4 right-4 z-20 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg text-primary-600">
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{dept.name}</h3>
                  <p className="text-slate-500 mb-6 flex-1 leading-relaxed">
                    {dept.description}
                  </p>
                  
                  <div className="pt-4 border-t border-slate-100">
                    <Link
                      to={`/doctors?department=${dept.id}`}
                      className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                    >
                      View {dept.name} Doctors <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
      
      {/* Consultation Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-primary-50 border border-primary-100 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl font-bold text-primary-900 mb-2">Unsure which department you need?</h2>
            <p className="text-primary-700">Book a general consultation and our physicians will guide you to the right specialist.</p>
          </div>
          <Link
            to="/book-appointment"
            className="flex-shrink-0 px-8 py-4 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20"
          >
            General Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
