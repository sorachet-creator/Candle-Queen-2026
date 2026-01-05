import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, MapPin, Check, Facebook, Twitter } from 'lucide-react';
import lanternImg from '@/assets/lantern.png';
import queenImg from '@/assets/queen-thumbnail.png';
import { useLanguage } from '@/contexts/LanguageContext';

interface LanternFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const regionKeys = ['central', 'north', 'northeast', 'east', 'west', 'south', 'international'] as const;

const provincesByRegion: Record<string, string[]> = {
  central: ['กรุงเทพมหานคร', 'นนทบุรี', 'ปทุมธานี', 'สมุทรปราการ', 'นครปฐม', 'อยุธยา', 'อ่างทอง', 'ลพบุรี', 'สิงห์บุรี', 'ชัยนาท', 'สระบุรี', 'นครนายก', 'สมุทรสาคร', 'สมุทรสงคราม'],
  north: ['เชียงใหม่', 'เชียงราย', 'ลำปาง', 'ลำพูน', 'แม่ฮ่องสอน', 'น่าน', 'พะเยา', 'แพร่', 'อุตรดิตถ์'],
  northeast: ['นครราชสีมา', 'ขอนแก่น', 'อุดรธานี', 'อุบลราชธานี', 'บุรีรัมย์', 'สุรินทร์', 'ศรีสะเกษ', 'ร้อยเอ็ด', 'มหาสารคาม', 'กาฬสินธุ์', 'สกลนคร', 'นครพนม', 'มุกดาหาร', 'ยโสธร', 'อำนาจเจริญ', 'หนองคาย', 'หนองบัวลำภู', 'เลย', 'ชัยภูมิ', 'บึงกาฬ'],
  east: ['ชลบุรี', 'ระยอง', 'จันทบุรี', 'ตราด', 'ฉะเชิงเทรา', 'ปราจีนบุรี', 'สระแก้ว'],
  west: ['กาญจนบุรี', 'ราชบุรี', 'เพชรบุรี', 'ประจวบคีรีขันธ์', 'ตาก', 'สุพรรณบุรี'],
  south: ['ภูเก็ต', 'กระบี่', 'พังงา', 'สุราษฎร์ธานี', 'นครศรีธรรมราช', 'สงขลา', 'ปัตตานี', 'ยะลา', 'นราธิวาส', 'ตรัง', 'พัทลุง', 'สตูล', 'ชุมพร', 'ระนอง']
};

// Quiz questions based on real royal duties
const quizQuestions = {
  TH: [{
    id: 1,
    question: 'มูลนิธิส่งเสริมศิลปาชีพฯ (SUPPORT Foundation) ก่อตั้งขึ้นเมื่อปีใด?',
    options: ['พ.ศ. 2515', 'พ.ศ. 2519', 'พ.ศ. 2525', 'พ.ศ. 2530'],
    correctAnswer: 'พ.ศ. 2519'
  }, {
    id: 2,
    question: 'โครงการป่ารักน้ำ มีวัตถุประสงค์หลักเพื่ออะไร?',
    options: ['ส่งเสริมการท่องเที่ยว', 'ฟื้นฟูสภาพป่าต้นน้ำ', 'สร้างเขื่อนกั้นน้ำ', 'ปลูกพืชเศรษฐกิจ'],
    correctAnswer: 'ฟื้นฟูสภาพป่าต้นน้ำ'
  }, {
    id: 3,
    question: 'โครงการฟาร์มตัวอย่างเริ่มดำเนินการในปีใด?',
    options: ['พ.ศ. 2535', 'พ.ศ. 2538', 'พ.ศ. 2541', 'พ.ศ. 2545'],
    correctAnswer: 'พ.ศ. 2541'
  }, {
    id: 4,
    question: 'โครงการคืนช้างสู่ธรรมชาติมีจุดประสงค์หลักคืออะไร?',
    options: ['ฝึกช้างเพื่อการท่องเที่ยว', 'ฟื้นฟูประชากรช้างป่าไทย', 'ส่งออกช้างไปต่างประเทศ', 'เลี้ยงช้างเพื่อการเกษตร'],
    correctAnswer: 'ฟื้นฟูประชากรช้างป่าไทย'
  }, {
    id: 5,
    question: 'สมเด็จพระนางเจ้าสิริกิติ์ฯ พระราชทานเกาะใดเป็นสถานที่อนุรักษ์พันธุ์เต่าทะเล?',
    options: ['เกาะสมุย', 'เกาะมันใน', 'เกาะเต่า', 'เกาะพีพี'],
    correctAnswer: 'เกาะมันใน'
  }, {
    id: 6,
    question: 'การอนุรักษ์โขนได้รับการสืบสานจากสมเด็จพระนางเจ้าสิริกิติ์ฯ ตั้งแต่ปีใด?',
    options: ['พ.ศ. 2540', 'พ.ศ. 2543', 'พ.ศ. 2546', 'พ.ศ. 2550'],
    correctAnswer: 'พ.ศ. 2546'
  }],
  EN: [{
    id: 1,
    question: 'When was the SUPPORT Foundation established?',
    options: ['1972', '1976', '1982', '1987'],
    correctAnswer: '1976'
  }, {
    id: 2,
    question: 'What is the main objective of the Forest Loves Water Project?',
    options: ['Promote tourism', 'Restore watershed forests', 'Build dams', 'Plant commercial crops'],
    correctAnswer: 'Restore watershed forests'
  }, {
    id: 3,
    question: 'When did the Model Farm Project begin?',
    options: ['1992', '1995', '1998', '2002'],
    correctAnswer: '1998'
  }, {
    id: 4,
    question: 'What is the main purpose of the Elephant Reintroduction Project?',
    options: ['Train elephants for tourism', 'Restore Thai wild elephant population', 'Export elephants abroad', 'Raise elephants for agriculture'],
    correctAnswer: 'Restore Thai wild elephant population'
  }, {
    id: 5,
    question: 'Which island did Her Majesty donate for sea turtle conservation?',
    options: ['Koh Samui', 'Koh Mannai', 'Koh Tao', 'Koh Phi Phi'],
    correctAnswer: 'Koh Mannai'
  }, {
    id: 6,
    question: 'Since when has Khon performance been preserved under Her Majesty\'s patronage?',
    options: ['1997', '2000', '2003', '2007'],
    correctAnswer: '2003'
  }],
  CN: [{
    id: 1,
    question: 'SUPPORT基金会是什么时候成立的?',
    options: ['1972年', '1976年', '1982年', '1987年'],
    correctAnswer: '1976年'
  }, {
    id: 2,
    question: '森林爱水项目的主要目标是什么?',
    options: ['促进旅游业', '恢复流域森林', '建造水坝', '种植经济作物'],
    correctAnswer: '恢复流域森林'
  }, {
    id: 3,
    question: '示范农场项目是什么时候开始的?',
    options: ['1992年', '1995年', '1998年', '2002年'],
    correctAnswer: '1998年'
  }, {
    id: 4,
    question: '大象重归自然项目的主要目的是什么?',
    options: ['训练大象用于旅游', '恢复泰国野生大象种群', '出口大象到国外', '饲养大象用于农业'],
    correctAnswer: '恢复泰国野生大象种群'
  }, {
    id: 5,
    question: '陛下捐赠了哪个岛屿用于海龟保护?',
    options: ['苏梅岛', '曼乃岛', '涛岛', '皮皮岛'],
    correctAnswer: '曼乃岛'
  }, {
    id: 6,
    question: '在陛下的赞助下,泰国传统戏剧从何时开始得到保护?',
    options: ['1997年', '2000年', '2003年', '2007年'],
    correctAnswer: '2003年'
  }]
};

type Step = 'region' | 'province' | 'question' | 'release' | 'success';

const LanternFlowModal = ({
  isOpen,
  onClose,
  onComplete
}: LanternFlowModalProps) => {
  const { t, language } = useLanguage();
  const [step, setStep] = useState<Step>('region');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isReleased, setIsReleased] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(() => {
    const questions = quizQuestions[language];
    return questions[Math.floor(Math.random() * questions.length)];
  });
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);
  const [wrongAnswerText, setWrongAnswerText] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep('region');
        setSelectedRegion(null);
        setSelectedProvince(null);
        setSelectedAnswer(null);
        setIsReleased(false);
        const questions = quizQuestions[language];
        setCurrentQuestion(questions[Math.floor(Math.random() * questions.length)]);
        setIsWrongAnswer(false);
        setWrongAnswerText(null);
      }, 300);
    }
  }, [isOpen, language]);

  useEffect(() => {
    const questions = quizQuestions[language];
    setCurrentQuestion(questions[Math.floor(Math.random() * questions.length)]);
  }, [language]);

  const handleRegionSelect = (regionId: string) => {
    setSelectedRegion(regionId);
    if (regionId === 'international') {
      setSelectedProvince(t.lanternFlow.regions.international);
      setStep('question');
    } else {
      setStep('province');
    }
  };

  const handleProvinceSelect = (province: string) => {
    setSelectedProvince(province);
    setStep('question');
  };

  const handleAnswerSelect = (answer: string) => {
    if (answer === currentQuestion.correctAnswer) {
      setSelectedAnswer(answer);
      setIsWrongAnswer(false);
      setWrongAnswerText(null);
      setStep('release');
    } else {
      setIsWrongAnswer(true);
      setWrongAnswerText(answer);
    }
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
    else if (step === 'question') {
      if (selectedRegion === 'international') {
        setStep('region');
      } else {
        setStep('province');
      }
    }
    else if (step === 'release') setStep('question');
  };

  const getStepNumber = () => {
    switch (step) {
      case 'region':
        return 1;
      case 'province':
        return 2;
      case 'question':
        return selectedRegion === 'international' ? 2 : 3;
      case 'release':
        return selectedRegion === 'international' ? 3 : 4;
      default:
        return 4;
    }
  };

  const totalSteps = selectedRegion === 'international' ? 3 : 4;

  const getRegionName = (key: string) => {
    return t.lanternFlow.regions[key as keyof typeof t.lanternFlow.regions];
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
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.5, 1]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
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
                {Array.from({ length: totalSteps }, (_, i) => i + 1).map(num => (
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
                    {num < totalSteps && (
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
                    {t.lanternFlow.selectRegion}
                  </h3>
                  <p className="text-foreground/70 mb-8">
                    {t.lanternFlow.selectRegionDesc}
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {regionKeys.map(key => (
                      <motion.button
                        key={key}
                        onClick={() => handleRegionSelect(key)}
                        className="p-4 bg-secondary/50 border border-border hover:border-gold hover:bg-gold/10 rounded-xl text-foreground transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {getRegionName(key)}
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
                    <span>{t.lanternFlow.back}</span>
                  </button>

                  <MapPin className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h3 className="text-2xl md:text-3xl font-semibold text-gold mb-2">
                    {t.lanternFlow.selectProvince}
                  </h3>
                  <p className="text-foreground/70 mb-6">
                    {getRegionName(selectedRegion)}
                  </p>

                  <div className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gold/30 scrollbar-track-transparent pr-2">
                    <div className="grid grid-cols-2 gap-2">
                      {provincesByRegion[selectedRegion]?.map(province => (
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
                    onClick={() => {
                      goBack();
                      setIsWrongAnswer(false);
                      setWrongAnswerText(null);
                    }}
                    className="absolute top-0 left-0 flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span>{t.lanternFlow.back}</span>
                  </button>

                  <div className="text-4xl mb-4">📝</div>
                  <h3 className="text-xl md:text-2xl font-semibold text-gold mb-2">
                    {currentQuestion.question}
                  </h3>
                  <p className="text-foreground/70 text-sm mb-4">
                    {t.lanternFlow.province}{selectedProvince}
                  </p>

                  {isWrongAnswer && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-3 bg-destructive/20 border border-destructive/50 rounded-lg"
                    >
                      <p className="text-destructive text-sm">
                        ❌ {t.lanternFlow.wrongAnswer}
                      </p>
                    </motion.div>
                  )}

                  <div className="space-y-3">
                    {currentQuestion.options.map(option => (
                      <motion.button
                        key={option}
                        onClick={() => handleAnswerSelect(option)}
                        className={`w-full p-4 bg-secondary/50 border rounded-xl text-foreground text-left transition-all flex items-center gap-3 ${
                          wrongAnswerText === option
                            ? 'border-destructive/50 bg-destructive/10'
                            : 'border-border hover:border-gold hover:bg-gold/10'
                        }`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <ChevronRight
                          className={`w-5 h-5 flex-shrink-0 ${
                            wrongAnswerText === option ? 'text-destructive' : 'text-gold'
                          }`}
                        />
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
                      <span>{t.lanternFlow.back}</span>
                    </button>
                  )}

                  {/* Lantern */}
                  <motion.div
                    className="relative mx-auto mb-8"
                    animate={
                      isReleased
                        ? { y: [-50, -500], opacity: [1, 0], scale: [1, 0.3] }
                        : { y: [0, -10, 0] }
                    }
                    transition={
                      isReleased
                        ? { duration: 3, ease: 'easeOut' }
                        : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                    }
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
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                    />
                  </motion.div>

                  {!isReleased && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <h3 className="text-2xl md:text-3xl font-semibold text-gold mb-4">
                        {t.lanternFlow.payTribute}
                      </h3>
                      <p className="text-foreground/70 mb-2">
                        {t.lanternFlow.province}{selectedProvince}
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
                        {t.lanternFlow.releaseLantern}
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
                  {/* Queen Image */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                  >
                    <img
                      src={queenImg}
                      alt={t.hero.queenAlt}
                      className="w-48 h-auto mx-auto drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                    />
                  </motion.div>

                  <motion.div
                    className="text-6xl mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ​
                  </motion.div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-gold mb-4">
                    {t.lanternFlow.thankYou}
                  </h3>
                  <p className="text-foreground/70 mb-2">
                    {t.lanternFlow.yourLanternFrom}{selectedProvince}
                  </p>
                  <p className="text-foreground/50 text-sm mb-6">
                    {t.lanternFlow.hasRisen}
                  </p>

                  {/* Share Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-6"
                  >
                    <p className="text-foreground/50 text-sm mb-3">{t.lanternFlow.shareTo}</p>
                    <div className="flex items-center justify-center gap-4">
                      <motion.a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(t.lanternFlow.shareText)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-[#1877F2] rounded-full flex items-center justify-center text-white hover:brightness-110 transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Facebook className="w-6 h-6" />
                      </motion.a>
                      <motion.a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(t.lanternFlow.shareText)}&url=${encodeURIComponent(window.location.href)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-[#000000] rounded-full flex items-center justify-center text-white hover:brightness-110 transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Twitter className="w-6 h-6" />
                      </motion.a>
                      <motion.a
                        href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(t.lanternFlow.shareText)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-[#00B900] rounded-full flex items-center justify-center text-white hover:brightness-110 transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                        </svg>
                      </motion.a>
                    </div>
                  </motion.div>

                  <button
                    onClick={onClose}
                    className="px-6 py-3 border border-gold text-gold hover:bg-gold/10 rounded-full transition-colors"
                  >
                    {t.lanternFlow.close}
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