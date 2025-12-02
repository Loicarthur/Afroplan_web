import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CTASection() {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-[#191919] to-[#2a2a2a] rounded-[30px] p-12 md:p-16 my-24 relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
        >
          <Sparkles size={16} className="text-white" />
          <span className="text-white text-sm">Pour les professionnels</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-[36px] md:text-[42px] text-white mb-6 leading-tight"
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
          className="text-white/80 text-[18px] md:text-[20px] mb-8 leading-relaxed"
        >
          Développez votre activité, gérez vos rendez-vous facilement et touchez de nouveaux clients grâce à notre plateforme.
        </motion.p>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {[
            'Visibilité accrue',
            'Gestion simplifiée',
            'Commission réduite'
          ].map((benefit, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-[20px] p-4">
              <p className="text-white">{benefit}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button className="bg-white text-[#191919] px-8 py-4 rounded-[30px] hover:bg-gray-100 transition-colors flex items-center gap-2 group">
            <span className="text-[18px]">Devenir partenaire</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="bg-transparent text-white px-8 py-4 rounded-[30px] border-2 border-white hover:bg-white hover:text-[#191919] transition-colors">
            <span className="text-[18px]">En savoir plus</span>
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}
