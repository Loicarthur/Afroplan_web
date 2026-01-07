import { motion } from 'motion/react';
import imgLogo from "@/assets/logo.png";

export function LoadingState() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <motion.div
        className="flex flex-col items-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img 
            src={imgLogo} 
            alt="AfroPlan Logo" 
            className="h-20 w-auto object-contain"
          />
        </motion.div>
        
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-[#191919] rounded-full"
              animate={{ 
                y: [0, -10, 0],
                opacity: [1, 0.5, 1]
              }}
              transition={{ 
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        <p className="text-[#191919] opacity-70">Chargement d'AfroPlan...</p>
      </motion.div>
    </div>
  );
}

export function SmallLoader() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-[#191919] rounded-full"
            animate={{ 
              y: [0, -8, 0],
              opacity: [1, 0.5, 1]
            }}
            transition={{ 
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}
