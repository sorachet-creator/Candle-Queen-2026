import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import lanternImg from '@/assets/lantern.png';

interface LanternReleaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const LanternReleaseModal = ({ isOpen, onClose, onComplete }: LanternReleaseModalProps) => {
  const [isReleased, setIsReleased] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsReleased(false);
      setShowSuccess(false);
    }
  }, [isOpen]);

  const handleRelease = () => {
    setIsReleased(true);
    onComplete();
    setTimeout(() => {
      setShowSuccess(true);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/95 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Stars background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gold/50 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2 text-foreground/50 hover:text-foreground transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Content */}
          <div className="relative z-10 w-full max-w-lg text-center">
            {!showSuccess ? (
              <>
                {/* Lantern */}
                <motion.div
                  className="relative mx-auto mb-8"
                  animate={isReleased ? {
                    y: [-50, -500],
                    opacity: [1, 0],
                    scale: [1, 0.3],
                  } : {
                    y: [0, -10, 0],
                  }}
                  transition={isReleased ? {
                    duration: 3,
                    ease: "easeOut",
                  } : {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <img 
                    src={lanternImg} 
                    alt="Lantern" 
                    className="w-32 h-auto mx-auto drop-shadow-[0_0_30px_rgba(212,175,55,0.8)]"
                  />
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gold/20 blur-3xl rounded-full"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>

                {!isReleased && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-2xl md:text-3xl font-semibold text-gold mb-4">
                      น้อมถวายความอาลัย
                    </h3>
                    <p className="text-foreground/70 mb-8">
                      กดปุ่มด้านล่างเพื่อปล่อยโคมลอยขึ้นสู่ฟ้า
                    </p>

                    <motion.button
                      onClick={handleRelease}
                      className="px-8 py-4 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-primary-foreground font-semibold rounded-full text-lg glow-gold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      ปล่อยโคมลอย
                    </motion.button>
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="text-6xl mb-6"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  🙏
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-semibold text-gold mb-4">
                  ขอบคุณที่ร่วมน้อมรำลึก
                </h3>
                <p className="text-foreground/70 mb-8">
                  โคมลอยของท่านได้ลอยขึ้นสู่ฟ้าแล้ว
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 border border-gold text-gold hover:bg-gold/10 rounded-full transition-colors"
                >
                  ปิดหน้าต่าง
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LanternReleaseModal;
