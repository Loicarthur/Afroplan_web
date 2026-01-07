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
    <section id="comment-ca-marche" className="py-8 md:py-16 px-4 md:px-8 bg-[#f9f8f8] rounded-[20px] md:rounded-[30px] my-12 md:my-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 md:mb-12"
      >
        <h2 className="text-2xl md:text-[32px] text-[#191919] mb-3 md:mb-4">Comment ça marche ?</h2>
        <p className="text-base md:text-[20px] text-[#191919] opacity-70">
          Réservez votre coiffeur en 4 étapes simples
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
          >
            <div className="bg-white rounded-[20px] md:rounded-[30px] p-6 md:p-8 text-center h-full flex flex-col items-center border-2 border-transparent hover:border-[#191919] transition-all duration-300">
              {/* Step Number */}
              <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 bg-[#191919] text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-lg md:text-xl">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="bg-[#f9f8f8] rounded-full p-4 md:p-6 mb-3 md:mb-4 text-[#191919]">
                <div className="w-6 h-6 md:w-8 md:h-8">
                  {step.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-[22px] text-[#191919] mb-2 md:mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[#191919] opacity-70 text-xs md:text-sm leading-relaxed">
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
