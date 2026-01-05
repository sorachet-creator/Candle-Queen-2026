import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import lanternImg from '@/assets/lantern.png';

interface Lantern {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
}

const FloatingLanterns = () => {
  const [lanterns, setLanterns] = useState<Lantern[]>([]);

  useEffect(() => {
    const generateLanterns = () => {
      const newLanterns: Lantern[] = [];
      for (let i = 0; i < 20; i++) {
        newLanterns.push({
          id: i,
          x: Math.random() * 100,
          delay: Math.random() * 10,
          duration: 15 + Math.random() * 10,
          size: 30 + Math.random() * 40,
        });
      }
      setLanterns(newLanterns);
    };

    generateLanterns();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {lanterns.map((lantern) => (
        <motion.img
          key={lantern.id}
          src={lanternImg}
          alt=""
          className="absolute animate-pulse-glow"
          style={{
            left: `${lantern.x}%`,
            width: lantern.size,
            height: 'auto',
          }}
          initial={{ 
            y: '100vh', 
            x: 0,
            opacity: 0 
          }}
          animate={{ 
            y: '-100vh',
            x: [0, 50, -30, 80, 0],
            opacity: [0, 1, 1, 1, 0]
          }}
          transition={{
            duration: lantern.duration,
            delay: lantern.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

export default FloatingLanterns;
