import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Sophie M.',
      service: 'Tresses africaines',
      rating: 5,
      comment: 'Interface super intuitive ! J\'ai trouvé une excellente coiffeuse en quelques minutes. La prise de rendez-vous est hyper simple.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop'
    },
    {
      name: 'Aminata D.',
      service: 'Locks entretien',
      rating: 5,
      comment: 'Enfin une plateforme qui comprend vraiment les besoins des cheveux afro ! Les professionnels sont tous qualifiés.',
      image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop'
    },
    {
      name: 'Marie K.',
      service: 'Tissage',
      rating: 5,
      comment: 'Je recommande à 100% ! Les prix sont transparents et les coiffeurs sont vraiment pros. Plus jamais sans AfroPlan !',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop'
    }
  ];

  return (
    <section className="py-8 md:py-16 my-12 md:my-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 md:mb-12 px-4"
      >
        <h2 className="text-2xl md:text-[32px] text-[#191919] mb-3 md:mb-4">Ce que disent nos utilisateurs</h2>
        <p className="text-base md:text-[20px] text-[#191919] opacity-70">
          Des milliers de clients satisfaits
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-[20px] md:rounded-[30px] p-6 md:p-8 border-2 border-[#f9f8f8] hover:border-[#191919] transition-all duration-300 shadow-sm hover:shadow-xl relative"
          >
            {/* Quote Icon */}
            <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 bg-[#191919] rounded-full p-2 md:p-3">
              <Quote className="text-white" size={16} />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-3 md:mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} size={16} className="fill-[#191919] text-[#191919]" />
              ))}
            </div>

            {/* Comment */}
            <p className="text-[#191919] text-sm md:text-base mb-4 md:mb-6 leading-relaxed">
              "{testimonial.comment}"
            </p>

            {/* User Info */}
            <div className="flex items-center gap-3 md:gap-4 pt-3 md:pt-4 border-t border-gray-100">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-[#191919] text-sm md:text-base">{testimonial.name}</p>
                <p className="text-xs md:text-sm text-[#191919] opacity-60">{testimonial.service}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
