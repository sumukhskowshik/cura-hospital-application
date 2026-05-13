import { motion } from 'motion/react';
import { ArrowRight, Activity, Clock, Users, ShieldCheck, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { departments } from '../data/mockData';

export function Home() {
  const features = [
    { name: '24/7 Emergency Care', description: 'Always open, always ready. Our comprehensive ER is prepared for any situation.', icon: Clock },
    { name: 'Expert Doctors', description: 'Our medical staff includes top specialists globally recognized in their fields.', icon: Users },
    { name: 'Advanced Technology', description: 'State-of-the-art medical equipment for precise diagnosis and treatments.', icon: Activity },
    { name: 'Patient-first Approach', description: 'Highest safety standards and compassionate care tailored to each individual.', icon: ShieldCheck },
  ];

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 lg:min-h-[80vh] flex items-center">
            
            {/* SVG shape for cutting the image */}
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="sm:text-center lg:text-left"
              >
                <span className="inline-block py-1 px-3 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-4 border border-primary-100">
                  Leading Healthcare Provider
                </span>
                <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl lg:leading-[1.1]">
                  <span className="block xl:inline">Your Health is our</span>{' '}
                  <span className="block text-primary-600">Greatest Priority</span>
                </h1>
                <p className="mt-3 text-base text-slate-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 leading-relaxed">
                  Cura Hospital offers world-class medical excellence combined with deep compassionate care. Join the thousands of families who trust us with their well-being.
                </p>
                <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start gap-4">
                  <Link
                    to="/book-appointment"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10 shadow-lg shadow-primary-600/20 transition-all hover:-translate-y-0.5"
                  >
                    Book an Appointment
                  </Link>
                  <Link
                    to="/departments"
                    className="mt-3 w-full flex items-center justify-center px-8 py-3 border-2 border-slate-200 text-base font-medium rounded-full text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 md:py-4 md:text-lg md:px-10 sm:mt-0 transition-all"
                  >
                    Explore Services
                  </Link>
                </div>
              </motion.div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80"
            alt="Hospital exterior and modern medical facilities"
          />
        </div>
      </section>

      {/* Featured Features Section */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Why Choose Us</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl text-balance">
              Excellence in Medical Care
            </p>
            <p className="mt-4 max-w-2xl text-xl text-slate-500 lg:mx-auto">
              We bring together the best in medical science and technology to deliver outstanding patient outcomes.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    key={feature.name} 
                    className="pt-6"
                  >
                    <div className="flow-root bg-white rounded-2xl px-6 pb-8 h-full shadow-sm border border-slate-100 hover:shadow-md hover:border-primary-100 transition-all">
                      <div className="-mt-6">
                        <div>
                          <span className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-xl shadow-sm text-primary-600">
                            <Icon className="h-6 w-6" aria-hidden="true" />
                          </span>
                        </div>
                        <h3 className="mt-8 text-lg font-bold text-slate-900 tracking-tight">{feature.name}</h3>
                        <p className="mt-3 text-base text-slate-500 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Departments Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Featured Departments</h2>
              <p className="mt-3 text-lg text-slate-500 max-w-2xl">Discover our specialized centers of excellence, staffed by world-renowned experts.</p>
            </div>
            <Link to="/departments" className="hidden sm:flex items-center text-primary-600 font-semibold hover:text-primary-700">
              View all departments <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.slice(0, 3).map((dept) => (
              <Link key={dept.id} to={`/departments`} className="group">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100">
                  <img src={dept.image} alt={dept.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{dept.name}</h3>
                    <div className="text-slate-200 text-sm line-clamp-2">{dept.description}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 sm:hidden">
             <Link to="/departments" className="flex items-center text-primary-600 font-semibold hover:text-primary-700">
              View all departments <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80')] mix-blend-overlay object-cover"></div>
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:py-24 relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-2/3">
            <h2 className="text-3xl font-extrabold tracking-tight text-white mb-4 sm:text-4xl text-balance">
              <span className="block">Ready to take care of your health?</span>
            </h2>
            <p className="text-lg leading-relaxed text-primary-100 max-w-2xl">
              Schedule your appointment today or contact our 24/7 help desk for immediate assistance. Our team is ready to help you on your health journey.
            </p>
          </div>
          <div className="mt-8 md:mt-0 md:w-1/3 flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 justify-end w-full">
            <div className="inline-flex rounded-full shadow">
              <Link
                to="/book-appointment"
                className="inline-flex items-center justify-center px-6 py-4 border border-transparent text-base font-bold rounded-full text-primary-900 bg-white hover:bg-slate-50 w-full whitespace-nowrap"
              >
                Book Appointment
              </Link>
            </div>
            <div className="inline-flex">
              <a
                href="tel:+919876543210"
                className="inline-flex items-center justify-center px-6 py-4 border border-transparent text-base font-bold rounded-full text-white bg-primary-700 hover:bg-primary-600 w-full whitespace-nowrap gap-2"
              >
                <Phone className="w-5 h-5" />
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
