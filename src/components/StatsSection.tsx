import { motion } from 'motion/react';
import { Users, Calendar, Star, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Stat {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
}

export function StatsSection() {
  const stats: Stat[] = [
    { icon: <Users size={32} />, value: 500, suffix: '+', label: 'Professionnels' },
    { icon: <Calendar size={32} />, value: 10000, suffix: '+', label: 'Réservations' },
    { icon: <Star size={32} />, value: 4.8, suffix: '/5', label: 'Note moyenne' },
    { icon: <MapPin size={32} />, value: 50, suffix: '+', label: 'Villes' },
  ];

  return (
    <section className="bg-[#191919] rounded-[30px] p-12 my-24">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center text-center gap-4"
          >
            <div className="text-white opacity-80">
              {stat.icon}
            </div>
            <CountUp 
              end={stat.value} 
              suffix={stat.suffix}
              duration={2}
            />
            <p className="text-white/70 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CountUp({ end, suffix, duration }: { end: number; suffix: string; duration: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return (
    <div className="text-white text-4xl">
      {count.toLocaleString('fr-FR')}{suffix}
    </div>
  );
}
