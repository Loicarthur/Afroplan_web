import { motion } from 'motion/react';
import { Search, Calendar, Scissors, Star } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: <Search size={32} />,
      title: 'Recherchez',
      description: 'Trouvez le salon parfait près de chez vous selon vos besoins'
    },
    {
      icon: <Calendar size={32} />,
      title: 'Réservez',
      description: 'Choisissez votre créneau et réservez en quelques clics'
    },
    {
      icon: <Scissors size={32} />,
      title: 'Profitez',
      description: 'Rendez-vous au salon et profitez de votre prestation'
    },
    {
      icon: <Star size={32} />,
      title: 'Évaluez',
      description: 'Partagez votre expérience et aidez la communauté'
    }
  ];

  return (
    <section className="py-16 px-8 bg-[#f9f8f8] rounded-[30px] my-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-[32px] text-[#191919] mb-4">Comment ça marche ?</h2>
        <p className="text-[20px] text-[#191919] opacity-70">
          Réservez votre coiffeur en 4 étapes simples
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
          >
            <div className="bg-white rounded-[30px] p-8 text-center h-full flex flex-col items-center border-2 border-transparent hover:border-[#191919] transition-all duration-300">
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 bg-[#191919] text-white rounded-full w-12 h-12 flex items-center justify-center text-xl">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="bg-[#f9f8f8] rounded-full p-6 mb-4 text-[#191919]">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-[22px] text-[#191919] mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[#191919] opacity-70 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Connector Arrow */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M12 8L20 16L12 24"
                    stroke="#191919"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
