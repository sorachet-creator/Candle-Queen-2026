import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, MapPin, Check, Facebook, Twitter } from 'lucide-react';
import lanternImg from '@/assets/lantern.png';
import queenImg from '@/assets/queen-thumbnail-glow.png';
import queenBeforeLanternImg from '@/assets/queen-before-lantern.png';
import moonSceneImg from '@/assets/moon-scene.png';
import queenOverlayImg from '@/assets/queen-overlay.png';
import queenAfterLanternImg from '@/assets/queen-after-lantern.png';
import floatingLanternImg from '@/assets/floating-lantern.png';
import lanternReleaseImg from '@/assets/lantern-release.png';
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

// Quiz questions focused on project benefits and youth-relevant topics (environment, inequality)
const quizQuestions = {
  TH: [{
    id: 1,
    question: 'โครงการป่ารักน้ำช่วยลดปัญหาสิ่งแวดล้อมด้านใดมากที่สุด?',
    options: ['มลพิษทางอากาศ', 'การขาดแคลนน้ำและน้ำท่วม', 'ขยะพลาสติก', 'โลกร้อน'],
    correctAnswer: 'การขาดแคลนน้ำและน้ำท่วม',
    benefit: 'ป่าต้นน้ำช่วยซับน้ำฝนและปล่อยน้ำอย่างช้าๆ ลดน้ำท่วมและภัยแล้ง'
  }, {
    id: 2,
    question: 'มูลนิธิส่งเสริมศิลปาชีพฯ ช่วยลดความเหลื่อมล้ำอย่างไร?',
    options: ['แจกเงินให้ชาวบ้าน', 'สร้างอาชีพและรายได้ให้ชุมชนยากจน', 'ย้ายคนเข้าเมือง', 'ให้ทุนการศึกษา'],
    correctAnswer: 'สร้างอาชีพและรายได้ให้ชุมชนยากจน',
    benefit: 'ชาวบ้านมีอาชีพทอผ้า งานหัตถกรรม สร้างรายได้โดยไม่ต้องย้ายถิ่น'
  }, {
    id: 3,
    question: 'โครงการคืนช้างสู่ธรรมชาติมีประโยชน์ต่อระบบนิเวศอย่างไร?',
    options: ['ดึงดูดนักท่องเที่ยว', 'ช้างช่วยกระจายเมล็ดพันธุ์และสร้างเส้นทางน้ำ', 'ลดจำนวนช้างที่มากเกินไป', 'ฝึกช้างทำงาน'],
    correctAnswer: 'ช้างช่วยกระจายเมล็ดพันธุ์และสร้างเส้นทางน้ำ',
    benefit: 'ช้างเป็น "วิศวกรของป่า" ช่วยรักษาความหลากหลายทางชีวภาพ'
  }, {
    id: 4,
    question: 'โครงการอนุรักษ์เต่าทะเลที่เกาะมันในช่วยแก้ปัญหาอะไร?',
    options: ['เต่าทะเลใกล้สูญพันธุ์', 'การท่องเที่ยวไม่เติบโต', 'ชาวประมงตกงาน', 'ขาดแหล่งอาหารทะเล'],
    correctAnswer: 'เต่าทะเลใกล้สูญพันธุ์',
    benefit: 'เต่าทะเลช่วยรักษาสมดุลของหญ้าทะเลและแนวปะการัง'
  }, {
    id: 5,
    question: 'โครงการฟาร์มตัวอย่างช่วยเรื่องความมั่นคงทางอาหารอย่างไร?',
    options: ['นำเข้าอาหารจากต่างประเทศ', 'สอนเกษตรกรผลิตอาหารปลอดภัยและพึ่งพาตนเอง', 'แจกอาหารฟรี', 'สร้างซูเปอร์มาร์เก็ต'],
    correctAnswer: 'สอนเกษตรกรผลิตอาหารปลอดภัยและพึ่งพาตนเอง',
    benefit: 'ชุมชนสามารถผลิตอาหารเองได้อย่างยั่งยืน'
  }, {
    id: 6,
    question: 'สถานีพัฒนาเกษตรที่สูงช่วยลดปัญหาสิ่งแวดล้อมบนภูเขาอย่างไร?',
    options: ['สร้างถนนขึ้นดอย', 'ส่งเสริมเกษตรทดแทนการทำไร่เลื่อนลอย', 'ย้ายชาวเขาลงมาอยู่เมือง', 'ปลูกพืชอุตสาหกรรม'],
    correctAnswer: 'ส่งเสริมเกษตรทดแทนการทำไร่เลื่อนลอย',
    benefit: 'ลดการตัดไม้ทำลายป่าต้นน้ำ รักษาระบบนิเวศบนภูเขา'
  }],
  EN: [{
    id: 1,
    question: 'What environmental problem does the Forest Loves Water project address most?',
    options: ['Air pollution', 'Water scarcity and flooding', 'Plastic waste', 'Global warming'],
    correctAnswer: 'Water scarcity and flooding',
    benefit: 'Watershed forests absorb rainwater and release it slowly, reducing floods and droughts'
  }, {
    id: 2,
    question: 'How does the SUPPORT Foundation reduce inequality?',
    options: ['Gives money to villagers', 'Creates jobs and income for poor communities', 'Moves people to cities', 'Provides scholarships'],
    correctAnswer: 'Creates jobs and income for poor communities',
    benefit: 'Villagers can earn income from weaving and handicrafts without migrating'
  }, {
    id: 3,
    question: 'How does the Elephant Reintroduction project benefit the ecosystem?',
    options: ['Attracts tourists', 'Elephants spread seeds and create water paths', 'Reduces elephant overpopulation', 'Trains elephants for work'],
    correctAnswer: 'Elephants spread seeds and create water paths',
    benefit: 'Elephants are "forest engineers" that maintain biodiversity'
  }, {
    id: 4,
    question: 'What problem does the Sea Turtle Conservation at Koh Mannai solve?',
    options: ['Sea turtles facing extinction', 'Slow tourism growth', 'Fishermen unemployment', 'Lack of seafood'],
    correctAnswer: 'Sea turtles facing extinction',
    benefit: 'Sea turtles help maintain seagrass and coral reef balance'
  }, {
    id: 5,
    question: 'How does the Model Farm project support food security?',
    options: ['Imports food from abroad', 'Teaches farmers to produce safe food and be self-sufficient', 'Distributes free food', 'Builds supermarkets'],
    correctAnswer: 'Teaches farmers to produce safe food and be self-sufficient',
    benefit: 'Communities can produce their own food sustainably'
  }, {
    id: 6,
    question: 'How does Highland Agriculture reduce environmental problems in mountains?',
    options: ['Builds roads up mountains', 'Promotes sustainable farming over slash-and-burn', 'Moves hill tribes to cities', 'Plants industrial crops'],
    correctAnswer: 'Promotes sustainable farming over slash-and-burn',
    benefit: 'Reduces deforestation of watershed forests and preserves mountain ecosystems'
  }],
  CN: [{
    id: 1,
    question: '森林爱水项目主要解决哪个环境问题？',
    options: ['空气污染', '水资源短缺和洪水', '塑料垃圾', '全球变暖'],
    correctAnswer: '水资源短缺和洪水',
    benefit: '流域森林吸收雨水并缓慢释放，减少洪水和干旱'
  }, {
    id: 2,
    question: 'SUPPORT基金会如何减少不平等？',
    options: ['给村民发钱', '为贫困社区创造就业和收入', '将人们迁移到城市', '提供奖学金'],
    correctAnswer: '为贫困社区创造就业和收入',
    benefit: '村民可以通过编织和手工艺赚取收入，无需迁移'
  }, {
    id: 3,
    question: '大象重归自然项目对生态系统有什么好处？',
    options: ['吸引游客', '大象传播种子并创造水路', '减少大象过度繁殖', '训练大象工作'],
    correctAnswer: '大象传播种子并创造水路',
    benefit: '大象是"森林工程师"，帮助维持生物多样性'
  }, {
    id: 4,
    question: '曼乃岛海龟保护项目解决了什么问题？',
    options: ['海龟濒临灭绝', '旅游业增长缓慢', '渔民失业', '海鲜短缺'],
    correctAnswer: '海龟濒临灭绝',
    benefit: '海龟有助于维持海草和珊瑚礁的平衡'
  }, {
    id: 5,
    question: '示范农场项目如何支持粮食安全？',
    options: ['从国外进口食品', '教农民生产安全食品并自给自足', '免费分发食品', '建设超市'],
    correctAnswer: '教农民生产安全食品并自给自足',
    benefit: '社区可以可持续地生产自己的食品'
  }, {
    id: 6,
    question: '高地农业如何减少山区环境问题？',
    options: ['修建山路', '推广可持续农业代替刀耕火种', '将山地部落迁移到城市', '种植工业作物'],
    correctAnswer: '推广可持续农业代替刀耕火种',
    benefit: '减少流域森林砍伐，保护山区生态系统'
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
  const [showAnswerRevealed, setShowAnswerRevealed] = useState(false);
  const [earnedBonus, setEarnedBonus] = useState(false);
  const [lanternCount, setLanternCount] = useState(1);

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
        setShowAnswerRevealed(false);
        setEarnedBonus(false);
        setLanternCount(1);
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
      setEarnedBonus(true);
      setLanternCount(2); // Bonus lantern for correct answer
      setStep('release');
    } else {
      setIsWrongAnswer(true);
      setWrongAnswerText(answer);
    }
  };

  const handleSkipQuestion = () => {
    setSelectedAnswer(null);
    setShowAnswerRevealed(true);
  };

  const handleShowAnswer = () => {
    setShowAnswerRevealed(true);
  };

  const handleContinueAfterReveal = () => {
    setSelectedAnswer(currentQuestion.correctAnswer);
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
                  <h3 className="text-2xl md:text-3xl font-semibold gradient-gold-text mb-2">
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
                  <h3 className="text-2xl md:text-3xl font-semibold gradient-gold-text mb-2">
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
                      setShowAnswerRevealed(false);
                    }}
                    className="absolute top-0 left-0 flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span>{t.lanternFlow.back}</span>
                  </button>

                  <div className="text-4xl mb-4">📝</div>
                  <h3 className="text-xl md:text-2xl font-semibold gradient-gold-text mb-2">
                    {currentQuestion.question}
                  </h3>
                  <p className="text-foreground/70 text-sm mb-4">
                    {selectedRegion === 'international' ? selectedProvince : `${t.lanternFlow.province}${selectedProvince}`}
                  </p>

                  {/* Wrong answer message */}
                  {isWrongAnswer && !showAnswerRevealed && (
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

                  {/* Show Answer Revealed State */}
                  {showAnswerRevealed ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-4"
                    >
                      <div className="p-4 bg-gold/20 border border-gold/50 rounded-xl">
                        <p className="text-foreground/70 text-sm mb-2">{t.lanternFlow.skippedInfo}</p>
                        <p className="text-gold font-semibold text-lg">{currentQuestion.correctAnswer}</p>
                        <p className="text-foreground/60 text-sm mt-2">{currentQuestion.benefit}</p>
                      </div>
                      <motion.button
                        onClick={handleContinueAfterReveal}
                        className="px-6 py-3 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-primary-foreground font-semibold rounded-full"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {t.lanternFlow.releaseLantern} 🏮
                      </motion.button>
                    </motion.div>
                  ) : (
                    <>
                      {/* Answer options */}
                      <div className="space-y-3 mb-6">
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

                      {/* Skip / Show Answer buttons */}
                      <div className="flex justify-center gap-3">
                        <motion.button
                          onClick={handleSkipQuestion}
                          className="px-4 py-2 bg-secondary/50 border border-border hover:border-gold/50 rounded-full text-foreground/70 text-sm transition-all"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {t.lanternFlow.skipQuestion}
                        </motion.button>
                        <motion.button
                          onClick={handleShowAnswer}
                          className="px-4 py-2 bg-secondary/50 border border-border hover:border-gold/50 rounded-full text-foreground/70 text-sm transition-all"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {t.lanternFlow.showAnswer}
                        </motion.button>
                      </div>
                    </>
                  )}
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

                  {/* Bonus lantern indicator */}
                  {earnedBonus && !isReleased && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-3 bg-gold/20 border border-gold/50 rounded-xl"
                    >
                      <p className="text-gold text-sm font-medium">
                        {t.lanternFlow.correctAnswer}
                      </p>
                    </motion.div>
                  )}

                  {/* Lantern - uses new lantern image, no queen */}
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
                      src={lanternReleaseImg}
                      alt="Lantern"
                      className="w-40 md:w-48 h-auto mx-auto drop-shadow-[0_0_30px_rgba(212,175,55,0.8)]"
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
                      <h3 className="text-2xl md:text-3xl font-semibold gradient-gold-text mb-4">
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
                  className="text-center relative"
                >
                  {/* Floating Lanterns Background - Random positions, sizes and angles with glow */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                    {[
                      { left: '10%', top: '10%', size: 'w-12 md:w-16', angle: -12 },
                      { left: '30%', top: '5%', size: 'w-10 md:w-14', angle: 8 },
                      { left: '50%', top: '3%', size: 'w-14 md:w-20', angle: 0 },
                      { left: '70%', top: '5%', size: 'w-10 md:w-14', angle: -8 },
                      { left: '90%', top: '10%', size: 'w-12 md:w-16', angle: 12 },
                    ].map((lantern, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        style={{
                          left: lantern.left,
                          top: lantern.top,
                        }}
                        initial={{ y: 0, opacity: 0, rotate: lantern.angle }}
                        animate={{
                          y: [0, -8, -3, -12, -5, 0],
                          opacity: [0.7, 0.9, 0.8, 1, 0.85, 0.7],
                          rotate: [lantern.angle, lantern.angle + 2, lantern.angle - 1, lantern.angle + 3, lantern.angle - 2, lantern.angle],
                        }}
                        transition={{
                          duration: 6 + i * 0.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: i * 0.3,
                        }}
                      >
                        <img
                          src={floatingLanternImg}
                          alt=""
                          className={`${lantern.size} drop-shadow-[0_0_20px_rgba(255,180,80,0.8)] filter brightness-110`}
                        />
                        {/* Glow effect behind lantern */}
                        <div 
                          className="absolute inset-0 rounded-full blur-xl opacity-60"
                          style={{
                            background: 'radial-gradient(circle, rgba(255,200,100,0.6) 0%, rgba(255,150,50,0.3) 50%, transparent 70%)',
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Queen Image with Glow Effect */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="relative mb-4 z-10"
                  >
                    {/* Radial glow behind queen */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <motion.div
                        className="w-72 h-72 rounded-full"
                        style={{
                          background: 'radial-gradient(circle, rgba(255,223,100,0.4) 0%, rgba(255,200,50,0.2) 40%, transparent 70%)'
                        }}
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.8, 1, 0.8]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    </div>
                    <img
                      src={queenAfterLanternImg}
                      alt={t.hero.queenAlt}
                      className="relative w-72 md:w-80 h-auto mx-auto"
                    />
                  </motion.div>

                  {/* Thank you text */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-foreground/60 text-sm mb-2"
                  >
                    {t.lanternFlow.thankYou}
                  </motion.p>
                  
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl md:text-2xl font-semibold gradient-gold-text mb-4"
                  >
                    {t.lanternFlow.yourLanternFrom}{selectedProvince} {t.lanternFlow.hasRisen}
                  </motion.h3>

                  {/* Share Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-6"
                  >
                    <p className="text-foreground/50 text-sm mb-3">{t.lanternFlow.shareTo}</p>
                    <div className="flex items-center justify-center gap-3">
                      <motion.a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(t.lanternFlow.shareText)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#1877F2] rounded-full text-white text-sm font-medium hover:brightness-110 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Facebook className="w-5 h-5" />
                        <span>Facebook</span>
                      </motion.a>
                      <motion.a
                        href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(t.lanternFlow.shareText)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#00B900] rounded-full text-white text-sm font-medium hover:brightness-110 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                        </svg>
                        <span>LINE</span>
                      </motion.a>
                    </div>
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    onClick={onClose}
                    className="w-full max-w-xs px-6 py-3 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-primary-foreground font-medium rounded-full transition-colors"
                  >
                    {t.lanternFlow.close}
                  </motion.button>
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