import { motion } from 'motion/react';
import { Target, Eye, HeartPulse, Award, ShieldCheck, Microscope } from 'lucide-react';

export function About() {
  const stats = [
    { label: 'Outpatients daily', value: '1,500+' },
    { label: 'Specialist Doctors', value: '150+' },
    { label: 'Successful Surgeries', value: '50k+' },
    { label: 'Years of Excellence', value: '25' },
  ];

  const values = [
    {
      name: 'Compassion',
      description: 'We treat every patient like our own family, delivering care with empathy, kindness, and deep respect.',
      icon: HeartPulse,
    },
    {
      name: 'Integrity',
      description: 'We adhere strictly to moral and ethical principles, ensuring transparency in all our interactions.',
      icon: ShieldCheck,
    },
    {
      name: 'Excellence',
      description: 'We strive for clinical excellence through continuous education and the adoption of cutting-edge technology.',
      icon: Award,
    },
    {
      name: 'Innovation',
      description: 'We embrace medical innovation, seeking new methods and technologies to improve patient outcomes.',
      icon: Microscope,
    },
  ];

  return (
    <div className="bg-white">
      {/* Header section */}
      <div className="bg-slate-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl"
          >
            About Cura Hospital
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 max-w-2xl mx-auto text-xl text-slate-500"
          >
            A legacy of medical excellence, compassion, and innovation dedicated to improving the health of our community.
          </motion.p>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80"
              alt="Team of doctors"
              className="w-full object-cover"
            />
            <div className="absolute inset-0 bg-primary-600/10 mix-blend-multiply"></div>
          </div>
          <div className="mt-12 lg:mt-0">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Healing the world, one patient at a time.
            </h2>
            <div className="mt-6 text-lg text-slate-500 space-y-6 leading-relaxed">
              <p>
                Founded in 1999, Cura Hospital began with a singular mission: to provide world-class healthcare accessible to everyone. What started as a modest 50-bed clinic has now grown into a premier multi-specialty tertiary care hospital.
              </p>
              <p>
                Our journey is defined by a relentless pursuit of medical innovation and a steadfast commitment to patient safety. We have continuously upgraded our facilities with state-of-the-art technology, enabling our experts to diagnose and treat complex medical conditions with unprecedented precision.
              </p>
              <p>
                But beyond the technology, it's our people who make Cura Hospital exceptional. Our dedicated team of doctors, nurses, and support staff work tirelessly to ensure that every patient receives optimal physical, emotional, and psychological care during their hospital stay.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-primary-900 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 text-white"
            >
              <Target className="w-12 h-12 text-primary-300 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-primary-100 text-lg leading-relaxed">
                To provide exceptional healthcare services by integrating clinical excellence, education, and research, ensuring a profound commitment to the health and well-being of the communities we serve.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 text-white"
            >
              <Eye className="w-12 h-12 text-primary-300 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-primary-100 text-lg leading-relaxed">
                To be the healthcare partner of choice, globally recognized for medical innovation, compassionate patient care, and outstanding clinical outcomes.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4 lg:gap-x-16 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="mx-auto flex max-w-xs flex-col gap-y-3">
                <dt className="text-base leading-7 text-slate-500">{stat.label}</dt>
                <dd className="order-first text-4xl font-extrabold tracking-tight text-primary-600 sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Our Core Values</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-500">The guiding principles that define our culture and drive our daily actions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  key={value.name}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{value.name}</h3>
                  <p className="text-slate-500 leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
