import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, MapPin, Check } from 'lucide-react';
import lanternImg from '@/assets/lantern.png';

interface LanternFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const regions = [
  { id: 'central', name: 'ภาคกลาง' },
  { id: 'north', name: 'ภาคเหนือ' },
  { id: 'northeast', name: 'ภาคตะวันออกเฉียงเหนือ' },
  { id: 'east', name: 'ภาคตะวันออก' },
  { id: 'west', name: 'ภาคตะวันตก' },
  { id: 'south', name: 'ภาคใต้' },
];

const provincesByRegion: Record<string, string[]> = {
  central: [
    'กรุงเทพมหานคร', 'นนทบุรี', 'ปทุมธานี', 'สมุทรปราการ', 'นครปฐม',
    'อยุธยา', 'อ่างทอง', 'ลพบุรี', 'สิงห์บุรี', 'ชัยนาท', 'สระบุรี',
    'นครนายก', 'สมุทรสาคร', 'สมุทรสงคราม'
  ],
  north: [
    'เชียงใหม่', 'เชียงราย', 'ลำปาง', 'ลำพูน', 'แม่ฮ่องสอน',
    'น่าน', 'พะเยา', 'แพร่', 'อุตรดิตถ์'
  ],
  northeast: [
    'นครราชสีมา', 'ขอนแก่น', 'อุดรธานี', 'อุบลราชธานี', 'บุรีรัมย์',
    'สุรินทร์', 'ศรีสะเกษ', 'ร้อยเอ็ด', 'มหาสารคาม', 'กาฬสินธุ์',
    'สกลนคร', 'นครพนม', 'มุกดาหาร', 'ยโสธร', 'อำนาจเจริญ',
    'หนองคาย', 'หนองบัวลำภู', 'เลย', 'ชัยภูมิ', 'บึงกาฬ'
  ],
  east: [
    'ชลบุรี', 'ระยอง', 'จันทบุรี', 'ตราด', 'ฉะเชิงเทรา',
    'ปราจีนบุรี', 'สระแก้ว'
  ],
  west: [
    'กาญจนบุรี', 'ราชบุรี', 'เพชรบุรี', 'ประจวบคีรีขันธ์', 'ตาก', 'สุพรรณบุรี'
  ],
  south: [
    'ภูเก็ต', 'กระบี่', 'พังงา', 'สุราษฎร์ธานี', 'นครศรีธรรมราช',
    'สงขลา', 'ปัตตานี', 'ยะลา', 'นราธิวาส', 'ตรัง', 'พัทลุง',
    'สตูล', 'ชุมพร', 'ระนอง'
  ],
};

const questions = [
  {
    id: 1,
    question: 'ท่านเคยได้รับพระมหากรุณาธิคุณจากพระราชกรณียกิจใดบ้าง?',
    options: [
      'โครงการพระราชดำริด้านการเกษตร',
      'โครงการด้านการศึกษา',
      'โครงการด้านการสาธารณสุข',
      'โครงการอนุรักษ์ทรัพยากรธรรมชาติ',
      'อื่นๆ / ไม่ระบุ'
    ]
  }
];

type Step = 'region' | 'province' | 'question' | 'release' | 'success';

const LanternFlowModal = ({ isOpen, onClose, onComplete }: LanternFlowModalProps) => {
  const [step, setStep] = useState<Step>('region');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isReleased, setIsReleased] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setTimeout(() => {
        setStep('region');
        setSelectedRegion(null);
        setSelectedProvince(null);
        setSelectedAnswer(null);
        setIsReleased(false);
      }, 300);
    }
  }, [isOpen]);

  const handleRegionSelect = (regionId: string) => {
    setSelectedRegion(regionId);
    setStep('province');
  };

  const handleProvinceSelect = (province: string) => {
    setSelectedProvince(province);
    setStep('question');
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setStep('release');
  };

  const handleRelease = () => {
    setIsReleased(true);
    onComplete();
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  const goBack = () => {
    if (step === 'province') setStep('region');
    else if (step === 'question') setStep('province');
    else if (step === 'release') setStep('question');
  };

  const getStepNumber = () => {
    switch (step) {
      case 'region': return 1;
      case 'province': return 2;
      case 'question': return 3;
      case 'release': return 4;
      default: return 4;
    }
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
          <div className="relative z-10 w-full max-w-lg">
            {/* Progress indicator */}
            {step !== 'success' && (
              <div className="flex items-center justify-center gap-2 mb-8">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                        num <= getStepNumber()
                          ? 'bg-gold text-primary-foreground'
                          : 'bg-secondary text-muted-foreground'
                      }`}
                    >
                      {num < getStepNumber() ? <Check className="w-4 h-4" /> : num}
                    </div>
                    {num < 4 && (
                      <div
                        className={`w-8 h-0.5 transition-colors ${
                          num < getStepNumber() ? 'bg-gold' : 'bg-secondary'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            <AnimatePresence mode="wait">
              {/* Step 1: Select Region */}
              {step === 'region' && (
                <motion.div
                  key="region"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="text-center"
                >
                  <MapPin className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h3 className="text-2xl md:text-3xl font-semibold text-gold mb-2">
                    เลือกภาค
                  </h3>
                  <p className="text-foreground/70 mb-8">
                    กรุณาเลือกภาคที่ท่านอาศัยอยู่
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {regions.map((region) => (
                      <motion.button
                        key={region.id}
                        onClick={() => handleRegionSelect(region.id)}
                        className="p-4 bg-secondary/50 border border-border hover:border-gold hover:bg-gold/10 rounded-xl text-foreground transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {region.name}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Select Province */}
              {step === 'province' && selectedRegion && (
                <motion.div
                  key="province"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="text-center"
                >
                  <button
                    onClick={goBack}
                    className="absolute top-0 left-0 flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span>ย้อนกลับ</span>
                  </button>

                  <MapPin className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h3 className="text-2xl md:text-3xl font-semibold text-gold mb-2">
                    เลือกจังหวัด
                  </h3>
                  <p className="text-foreground/70 mb-6">
                    {regions.find(r => r.id === selectedRegion)?.name}
                  </p>

                  <div className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gold/30 scrollbar-track-transparent pr-2">
                    <div className="grid grid-cols-2 gap-2">
                      {provincesByRegion[selectedRegion].map((province) => (
                        <motion.button
                          key={province}
                          onClick={() => handleProvinceSelect(province)}
                          className="p-3 bg-secondary/50 border border-border hover:border-gold hover:bg-gold/10 rounded-lg text-foreground text-sm transition-all"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {province}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Question */}
              {step === 'question' && (
                <motion.div
                  key="question"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="text-center"
                >
                  <button
                    onClick={goBack}
                    className="absolute top-0 left-0 flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span>ย้อนกลับ</span>
                  </button>

                  <div className="text-4xl mb-4">📝</div>
                  <h3 className="text-xl md:text-2xl font-semibold text-gold mb-2">
                    {questions[0].question}
                  </h3>
                  <p className="text-foreground/70 text-sm mb-6">
                    จังหวัด{selectedProvince}
                  </p>

                  <div className="space-y-3">
                    {questions[0].options.map((option) => (
                      <motion.button
                        key={option}
                        onClick={() => handleAnswerSelect(option)}
                        className="w-full p-4 bg-secondary/50 border border-border hover:border-gold hover:bg-gold/10 rounded-xl text-foreground text-left transition-all flex items-center gap-3"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <ChevronRight className="w-5 h-5 text-gold flex-shrink-0" />
                        <span>{option}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Release Lantern */}
              {step === 'release' && (
                <motion.div
                  key="release"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="text-center"
                >
                  {!isReleased && (
                    <button
                      onClick={goBack}
                      className="absolute top-0 left-0 flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      <span>ย้อนกลับ</span>
                    </button>
                  )}

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
                    >
                      <h3 className="text-2xl md:text-3xl font-semibold text-gold mb-4">
                        น้อมถวายความอาลัย
                      </h3>
                      <p className="text-foreground/70 mb-2">
                        จังหวัด{selectedProvince}
                      </p>
                      <p className="text-foreground/50 text-sm mb-8">
                        {selectedAnswer}
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
                </motion.div>
              )}

              {/* Success */}
              {step === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
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
                  <p className="text-foreground/70 mb-2">
                    โคมลอยของท่านจากจังหวัด{selectedProvince}
                  </p>
                  <p className="text-foreground/50 text-sm mb-8">
                    ได้ลอยขึ้นสู่ฟ้าแล้ว
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 border border-gold text-gold hover:bg-gold/10 rounded-full transition-colors"
                  >
                    ปิดหน้าต่าง
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LanternFlowModal;
