import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import lanternImg from '@/assets/lantern.png';
import LanternFlowModal from './LanternFlowModal';
import ProvinceStatsModal from './ProvinceStatsModal';
import { useLanguage } from '@/contexts/LanguageContext';

import queenHeroImg from '@/assets/queen-hero.png';

const HeroSection = () => {
  const [count, setCount] = useState(86080000);
  const [isLanternModalOpen, setIsLanternModalOpen] = useState(false);
  const [isProvinceModalOpen, setIsProvinceModalOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 10));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleLanternComplete = () => {
    setCount((prev) => prev + 1);
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US');
  };

  return (
    <>
      <section id="lanterns" className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Queen Image */}
          <div className="relative w-64 h-72 md:w-80 md:h-96 mx-auto mb-8">
            {/* Golden glow effect */}
            <div className="absolute inset-0 bg-gradient-radial from-gold/40 via-gold/20 to-transparent blur-3xl animate-pulse" />
            <img
              src={queenHeroImg}
              alt={t.hero.queenAlt}
              className="relative w-full h-full object-contain drop-shadow-[0_0_40px_rgba(212,175,55,0.6)] [filter:drop-shadow(0_0_20px_rgba(212,175,55,0.4))_drop-shadow(0_0_60px_rgba(212,175,55,0.3))]"
            />
          </div>

          <h2 className="text-3xl md:text-5xl font-semibold gradient-gold-text mb-6 text-shadow-gold">
            {t.hero.title}
          </h2>

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
            <div className="w-3 h-3 rotate-45 border border-gold" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent via-gold to-transparent" />
          </div>

          <p className="text-foreground/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>

          {/* Counter Card */}
          <motion.div
            className="relative bg-secondary/50 backdrop-blur-sm border border-border rounded-2xl p-8 mb-6 max-w-md mx-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <img 
              src={lanternImg} 
              alt="Lantern" 
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-auto animate-pulse-glow"
            />
            <img 
              src={lanternImg} 
              alt="Lantern" 
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-auto animate-pulse-glow"
            />
            
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-muted-foreground text-sm">{t.hero.lanternCount}</span>
              <span className="text-gold">👑</span>
            </div>
            
            <motion.div
              key={count}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              className="text-4xl md:text-5xl font-bold text-gold tabular-nums"
            >
              {formatNumber(count)}
            </motion.div>
          </motion.div>

          <button 
            onClick={() => setIsProvinceModalOpen(true)}
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors mb-8 cursor-pointer"
          >
            {t.hero.viewProvinces}
            <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
          </button>

          <p className="text-muted-foreground mb-4">
            {t.hero.pressButton}
          </p>

          <motion.button
            onClick={() => setIsLanternModalOpen(true)}
            className="relative px-8 py-4 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-primary-foreground font-semibold rounded-full text-lg glow-gold hover:brightness-110 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t.hero.lightLanternBtn}
          </motion.button>

          <motion.a
            href="#royal-duties"
            className="mt-16 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span>{t.hero.scrollDown}</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-6 h-6 text-gold" />
            </motion.div>
          </motion.a>
        </motion.div>
      </section>

      <LanternFlowModal
        isOpen={isLanternModalOpen}
        onClose={() => setIsLanternModalOpen(false)}
        onComplete={handleLanternComplete}
      />
      
      <ProvinceStatsModal
        isOpen={isProvinceModalOpen}
        onClose={() => setIsProvinceModalOpen(false)}
      />
    </>
  );
};

export default HeroSection;