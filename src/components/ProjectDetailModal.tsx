import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ExternalLink } from 'lucide-react';

interface Project {
  id: number;
  year: number;
  title: string;
  description: string;
  image: string;
}

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const projectDetails: Record<number, { fullDescription: string; achievements: string[] }> = {
  1: {
    fullDescription: 'มูลนิธิส่งเสริมศิลปาชีพ ในสมเด็จพระนางเจ้าสิริกิติ์ พระบรมราชินีนาถ ก่อตั้งขึ้นเพื่อส่งเสริมอาชีพงานหัตถกรรม ทอผ้าไหม และงานศิลปะแก่ราษฎร โดยเฉพาะในชนบทที่ห่างไกล เพื่อสร้างรายได้เสริมและอนุรักษ์ภูมิปัญญาไทยให้คงอยู่สืบไป',
    achievements: [
      'ส่งเสริมอาชีพแก่ราษฎรกว่า 100,000 ครอบครัว',
      'อนุรักษ์ลายผ้าไหมโบราณกว่า 200 ลาย',
      'สร้างรายได้รวมกว่า 1,000 ล้านบาท',
    ],
  },
  2: {
    fullDescription: 'โครงการป่ารักน้ำเกิดจากพระราชดำริที่ทรงเล็งเห็นว่าป่าไม้และน้ำมีความสัมพันธ์กันอย่างใกล้ชิด หากป่าถูกทำลาย น้ำก็จะหายไปด้วย จึงทรงริเริ่มโครงการนี้เพื่อฟื้นฟูป่าต้นน้ำ',
    achievements: [
      'ฟื้นฟูป่าต้นน้ำกว่า 500,000 ไร่',
      'สร้างฝายชะลอน้ำกว่า 10,000 แห่ง',
      'ชุมชนกว่า 50 หมู่บ้านมีน้ำใช้ตลอดปี',
    ],
  },
  3: {
    fullDescription: 'โครงการฟาร์มตัวอย่างเป็นโครงการที่สร้างแหล่งจ้างงาน ผลิตอาหารที่ปลอดภัย และเป็นแหล่งเรียนรู้ทางการเกษตรที่ทันสมัยแก่ราษฎรในพื้นที่',
    achievements: [
      'สร้างงานให้ชาวบ้านกว่า 2,000 คน',
      'ผลิตอาหารปลอดสารพิษส่งขายทั่วประเทศ',
      'เป็นแหล่งเรียนรู้รับผู้เยี่ยมชมปีละ 50,000 คน',
    ],
  },
  4: {
    fullDescription: 'สถานีพัฒนาเกษตรที่สูงเป็นโครงการส่งเสริมอาชีพเกษตรกรรมแก่ชาวไทยภูเขา เพื่อลดการทำลายป่าต้นน้ำจากการทำไร่เลื่อนลอย',
    achievements: [
      'ส่งเสริมชาวไทยภูเขากว่า 30,000 ครัวเรือน',
      'ลดพื้นที่ทำไร่เลื่อนลอยกว่า 100,000 ไร่',
      'ปลูกพืชเมืองหนาวทดแทนฝิ่นสำเร็จ',
    ],
  },
  5: {
    fullDescription: 'โครงการคืนช้างสู่ธรรมชาติเป็นโครงการฟื้นฟูประชากรช้างป่าไทย และจัดสรรพื้นที่ป่าให้เป็นที่อยู่อาศัยที่ปลอดภัย',
    achievements: [
      'คืนช้างสู่ป่าธรรมชาติกว่า 100 เชือก',
      'จัดสรรพื้นที่ป่ากว่า 100,000 ไร่',
      'ประชากรช้างป่าเพิ่มขึ้น 30%',
    ],
  },
  6: {
    fullDescription: 'โครงการอนุรักษ์พันธุ์เต่าทะเลที่เกาะมันใน เป็นสถานที่เพาะเลี้ยงและอนุรักษ์พันธุ์เต่าทะเล เพื่อปล่อยคืนสู่ธรรมชาติ',
    achievements: [
      'ปล่อยลูกเต่าทะเลกว่า 1,000,000 ตัว',
      'อัตราการรอดเพิ่มขึ้น 40%',
      'เป็นศูนย์การเรียนรู้ระดับนานาชาติ',
    ],
  },
  7: {
    fullDescription: 'การอนุรักษ์โขนเป็นการฟื้นฟูศาสตร์และศิลป์ของการแสดงโขน ตั้งแต่เครื่องแต่งกาย หัวโขน จนถึงกระบวนท่ารำ',
    achievements: [
      'อนุรักษ์ท่ารำโขนโบราณกว่า 108 ท่า',
      'สร้างช่างฝีมือหัวโขนกว่า 50 คน',
      'โขนได้รับการขึ้นทะเบียนมรดกโลก UNESCO',
    ],
  },
};

const ProjectDetailModal = ({ project, isOpen, onClose }: ProjectDetailModalProps) => {
  if (!project) return null;

  const details = projectDetails[project.id] || {
    fullDescription: project.description,
    achievements: [],
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
            className="absolute inset-0 bg-background/90 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-3xl max-h-[90vh] bg-card border border-border rounded-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Image */}
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-background/50 backdrop-blur-sm rounded-full text-foreground/70 hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Year badge */}
              <div className="absolute bottom-4 left-6 flex items-center gap-2 px-4 py-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full">
                <Calendar className="w-4 h-4 text-gold" />
                <span className="text-gold font-medium">พ.ศ. {project.year}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-320px)]">
              <h2 className="text-2xl md:text-3xl font-semibold text-gold mb-4">
                {project.title}
              </h2>
              
              <p className="text-foreground/80 leading-relaxed mb-8">
                {details.fullDescription}
              </p>

              {details.achievements.length > 0 && (
                <div className="bg-secondary/30 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <span className="text-gold">✦</span>
                    ผลสำเร็จที่สำคัญ
                  </h4>
                  <ul className="space-y-3">
                    {details.achievements.map((achievement, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3 text-foreground/70"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="w-2 h-2 mt-2 bg-gold rounded-full shrink-0" />
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-6 py-3 border border-gold text-gold hover:bg-gold/10 rounded-full transition-colors flex items-center gap-2"
                >
                  ปิดหน้าต่าง
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
