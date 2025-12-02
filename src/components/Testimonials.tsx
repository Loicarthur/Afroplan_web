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
    <section className="py-16 my-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-[32px] text-[#191919] mb-4">Ce que disent nos utilisateurs</h2>
        <p className="text-[20px] text-[#191919] opacity-70">
          Des milliers de clients satisfaits
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-[30px] p-8 border-2 border-[#f9f8f8] hover:border-[#191919] transition-all duration-300 shadow-sm hover:shadow-xl relative"
          >
            {/* Quote Icon */}
            <div className="absolute -top-4 -left-4 bg-[#191919] rounded-full p-3">
              <Quote className="text-white" size={20} />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} size={18} className="fill-[#191919] text-[#191919]" />
              ))}
            </div>

            {/* Comment */}
            <p className="text-[#191919] mb-6 leading-relaxed">
              "{testimonial.comment}"
            </p>

            {/* User Info */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-[#191919]">{testimonial.name}</p>
                <p className="text-sm text-[#191919] opacity-60">{testimonial.service}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
