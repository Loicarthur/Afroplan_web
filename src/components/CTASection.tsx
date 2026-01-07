import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CTASection() {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-[#191919] to-[#2a2a2a] rounded-[20px] md:rounded-[30px] p-6 md:p-12 lg:p-16 my-12 md:my-24 relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 md:w-96 md:h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full mb-4 md:mb-6"
        >
          <Sparkles size={14} className="text-white md:w-4 md:h-4" />
          <span className="text-white text-xs md:text-sm">Pour les professionnels</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-2xl md:text-[36px] lg:text-[42px] text-white mb-4 md:mb-6 leading-tight px-2"
        >
          Vous êtes coiffeur ?<br />
          Rejoignez AfroPlan dès maintenant
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-white/80 text-sm md:text-[18px] lg:text-[20px] mb-6 md:mb-8 leading-relaxed px-2"
        >
          Développez votre activité, gérez vos rendez-vous facilement et touchez de nouveaux clients grâce à notre plateforme.
        </motion.p>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8"
        >
          {[
            'Visibilité accrue',
            'Gestion simplifiée',
            'Commission réduite'
          ].map((benefit, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-[15px] md:rounded-[20px] p-3 md:p-4">
              <p className="text-white text-sm md:text-base">{benefit}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-stretch sm:items-center"
        >
          <button className="bg-white text-[#191919] px-6 md:px-8 py-3 md:py-4 rounded-[20px] md:rounded-[30px] hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 group w-full sm:w-auto">
            <span className="text-sm md:text-[18px]">Devenir partenaire</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform md:w-5 md:h-5" />
          </button>
          <button className="bg-transparent text-white px-6 md:px-8 py-3 md:py-4 rounded-[20px] md:rounded-[30px] border-2 border-white hover:bg-white hover:text-[#191919] transition-colors w-full sm:w-auto">
            <span className="text-sm md:text-[18px]">En savoir plus</span>
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}
