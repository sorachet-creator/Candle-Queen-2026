import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Users, Target } from 'lucide-react';
import Header from '@/components/Header';
import FloatingLanterns from '@/components/FloatingLanterns';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';
import project4 from '@/assets/project-4.jpg';
import project5 from '@/assets/project-5.jpg';
import project6 from '@/assets/project-6.jpg';
import project7 from '@/assets/project-7.jpg';

const projectsData = {
  '1': {
    id: 1,
    year: 2519,
    title: 'มูลนิธิส่งเสริมศิลปาชีพฯ',
    subtitle: 'SUPPORT Foundation',
    image: project1,
    description: 'มูลนิธิส่งเสริมศิลปาชีพ ในสมเด็จพระนางเจ้าสิริกิติ์ พระบรมราชินีนาถ ก่อตั้งขึ้นเพื่อส่งเสริมอาชีพงานหัตถกรรม ทอผ้าไหม และงานศิลปะแก่ราษฎร โดยเฉพาะในชนบทที่ห่างไกล เพื่อสร้างรายได้เสริมและอนุรักษ์ภูมิปัญญาไทยให้คงอยู่สืบไป',
    fullContent: 'สมเด็จพระนางเจ้าสิริกิติ์ พระบรมราชินีนาถ พระบรมราชชนนีพันปีหลวง ทรงก่อตั้งมูลนิธิส่งเสริมศิลปาชีพฯ ขึ้นเมื่อปี พ.ศ. 2519 ด้วยพระราชปณิธานที่จะช่วยเหลือราษฎรที่ยากไร้ให้มีอาชีพเสริม โดยทรงนำงานหัตถกรรมพื้นบ้านที่เกือบจะสูญหายกลับมาฟื้นฟูและพัฒนา ทรงส่งเสริมให้ราษฎรในชนบทเรียนรู้การทอผ้าไหม ทำเครื่องเงิน เครื่องปั้นดินเผา และงานหัตถกรรมอื่นๆ อีกมากมาย',
    location: 'ทั่วประเทศไทย',
    beneficiaries: 'ราษฎรกว่า 100,000 ครอบครัว',
    achievements: [
      'ส่งเสริมอาชีพแก่ราษฎรกว่า 100,000 ครอบครัวทั่วประเทศ',
      'อนุรักษ์ลายผ้าไหมโบราณกว่า 200 ลายที่เกือบสูญหาย',
      'สร้างรายได้รวมกว่า 1,000 ล้านบาทให้แก่ชุมชน',
      'ผ้าไหมไทยเป็นที่รู้จักในระดับสากล',
      'มีศูนย์ศิลปาชีพกระจายอยู่ทั่วทุกภาค',
    ],
    gallery: [project1],
  },
  '2': {
    id: 2,
    year: 2525,
    title: 'โครงการป่ารักน้ำ',
    subtitle: 'Forest Loves Water',
    image: project2,
    description: 'ทรงมีพระราชดำริให้ฟื้นฟูสภาพป่าต้นน้ำ เพื่อให้ \'ป่า\' ทำหน้าที่ซับน้ำและหล่อเลี้ยงชีวิต',
    fullContent: 'โครงการป่ารักน้ำเกิดจากพระราชดำริที่ทรงเล็งเห็นว่าป่าไม้และน้ำมีความสัมพันธ์กันอย่างใกล้ชิด หากป่าถูกทำลาย น้ำก็จะหายไปด้วย จึงทรงริเริ่มโครงการนี้เพื่อฟื้นฟูป่าต้นน้ำ โดยให้ราษฎรมีส่วนร่วมในการดูแลรักษาป่า และได้รับประโยชน์จากป่าอย่างยั่งยืน ทรงใช้หลัก "ปลูกป่าในใจคน" เพื่อให้คนรักและหวงแหนป่า',
    location: 'ภาคเหนือและภาคตะวันออกเฉียงเหนือ',
    beneficiaries: 'ชุมชนกว่า 500 หมู่บ้าน',
    achievements: [
      'ฟื้นฟูป่าต้นน้ำกว่า 500,000 ไร่',
      'สร้างฝายชะลอน้ำกว่า 10,000 แห่ง',
      'ชุมชนกว่า 50 หมู่บ้านมีน้ำใช้ตลอดปี',
      'ลดปัญหาน้ำท่วมและภัยแล้ง',
      'สัตว์ป่ากลับมาอาศัยในพื้นที่ฟื้นฟู',
    ],
    gallery: [project2],
  },
  '3': {
    id: 3,
    year: 2541,
    title: 'โครงการฟาร์มตัวอย่าง',
    subtitle: 'Model Farm Project',
    image: project3,
    description: 'สร้างแหล่งจ้างงาน ผลิตอาหารที่ปลอดภัย และเป็นแหล่งเรียนรู้ทางการเกษตรที่ทันสมัยแก่ราษฎรในพื้นที่',
    fullContent: 'โครงการฟาร์มตัวอย่างตามพระราชดำริ เป็นแหล่งจ้างงานและแหล่งเรียนรู้ด้านการเกษตรที่ทันสมัย มุ่งเน้นการผลิตอาหารที่ปลอดภัยและยั่งยืน ราษฎรสามารถเรียนรู้เทคนิคการเกษตรใหม่ๆ และนำไปประยุกต์ใช้ในพื้นที่ของตนเอง',
    location: 'หลายจังหวัดทั่วประเทศ',
    beneficiaries: 'เกษตรกรและชุมชนท้องถิ่น',
    achievements: [
      'สร้างงานให้ชาวบ้านกว่า 2,000 คน',
      'ผลิตอาหารปลอดสารพิษส่งขายทั่วประเทศ',
      'เป็นแหล่งเรียนรู้รับผู้เยี่ยมชมปีละ 50,000 คน',
      'ถ่ายทอดความรู้สู่เกษตรกรกว่า 10,000 ราย',
      'ต้นแบบเกษตรยั่งยืนระดับประเทศ',
    ],
    gallery: [project3],
  },
  '4': {
    id: 4,
    year: 2522,
    title: 'สถานีพัฒนาเกษตรที่สูง',
    subtitle: 'Highland Agriculture Development',
    image: project4,
    description: 'ส่งเสริมอาชีพเกษตรกรรมแก่ชาวไทยภูเขา ลดการทำลายป่าต้นน้ำ และฟื้นฟูระบบนิเวศให้กลับมาสมบูรณ์',
    fullContent: 'สถานีพัฒนาเกษตรที่สูงเป็นโครงการที่ช่วยเหลือชาวไทยภูเขาให้มีอาชีพที่มั่นคง โดยไม่ต้องทำไร่เลื่อนลอยซึ่งทำลายป่าต้นน้ำ ทรงส่งเสริมให้ปลูกพืชเมืองหนาวทดแทน เช่น ผัก ผลไม้ กาแฟ และดอกไม้ ซึ่งสร้างรายได้ดีกว่าพืชเสพติด',
    location: 'ภาคเหนือ',
    beneficiaries: 'ชาวไทยภูเขากว่า 30,000 ครัวเรือน',
    achievements: [
      'ส่งเสริมชาวไทยภูเขากว่า 30,000 ครัวเรือน',
      'ลดพื้นที่ทำไร่เลื่อนลอยกว่า 100,000 ไร่',
      'ปลูกพืชเมืองหนาวทดแทนฝิ่นสำเร็จ',
      'สร้างรายได้จากพืชเศรษฐกิจกว่า 500 ล้านบาท/ปี',
      'ฟื้นฟูป่าต้นน้ำได้อย่างยั่งยืน',
    ],
    gallery: [project4],
  },
  '5': {
    id: 5,
    year: 2540,
    title: 'โครงการคืนช้างสู่ธรรมชาติ',
    subtitle: 'Elephant Reintroduction Foundation',
    image: project5,
    description: 'ฟื้นฟูประชากรช้างป่าไทย และจัดสรรพื้นที่ป่าให้เป็นที่อยู่อาศัยที่ปลอดภัย',
    fullContent: 'โครงการคืนช้างสู่ธรรมชาติเป็นพระราชดำริที่มุ่งหวังให้ช้างไทยได้กลับไปใช้ชีวิตในป่าธรรมชาติ หลังจากที่ช้างเลี้ยงหลายเชือกประสบปัญหาจากการลดลงของงานในอุตสาหกรรมป่าไม้ ทรงจัดสรรพื้นที่ป่าและฟื้นฟูช้างให้สามารถดำรงชีวิตในธรรมชาติได้',
    location: 'ลำปาง และพื้นที่ป่าอนุรักษ์',
    beneficiaries: 'ช้างไทยและระบบนิเวศป่า',
    achievements: [
      'คืนช้างสู่ป่าธรรมชาติกว่า 100 เชือก',
      'จัดสรรพื้นที่ป่ากว่า 100,000 ไร่',
      'ประชากรช้างป่าเพิ่มขึ้น 30%',
      'ลดปัญหาช้างเร่ร่อนในเมือง',
      'เป็นต้นแบบการอนุรักษ์ช้างระดับโลก',
    ],
    gallery: [project5],
  },
  '6': {
    id: 6,
    year: 2522,
    title: 'โครงการอนุรักษ์พันธุ์เต่าทะเล',
    subtitle: 'Sea Turtle Conservation',
    image: project6,
    description: 'พระราชทานเกาะมันในเป็นสถานที่เพาะเลี้ยงและอนุรักษ์พันธุ์เต่าทะเล',
    fullContent: 'โครงการอนุรักษ์พันธุ์เต่าทะเลที่เกาะมันใน จังหวัดระยอง เป็นโครงการที่พระราชทานพื้นที่เพื่อการเพาะเลี้ยงและอนุรักษ์เต่าทะเลหลากหลายชนิดที่ใกล้สูญพันธุ์ รวมถึงเต่ากระ เต่าตนุ และเต่ามะเฟือง',
    location: 'เกาะมันใน จังหวัดระยอง',
    beneficiaries: 'เต่าทะเลและระบบนิเวศทางทะเล',
    achievements: [
      'ปล่อยลูกเต่าทะเลกว่า 1,000,000 ตัว',
      'อัตราการรอดเพิ่มขึ้น 40%',
      'เป็นศูนย์การเรียนรู้ระดับนานาชาติ',
      'ฟื้นฟูแนวปะการังโดยรอบเกาะ',
      'รับนักท่องเที่ยวเชิงอนุรักษ์ปีละ 20,000 คน',
    ],
    gallery: [project6],
  },
  '7': {
    id: 7,
    year: 2546,
    title: 'การอนุรักษ์โขน',
    subtitle: 'Khon Performance Preservation',
    image: project7,
    description: 'ทรงฟื้นฟูศาสตร์และศิลป์ของการแสดงโขน ตั้งแต่เครื่องแต่งกาย หัวโขน จนถึงกระบวนท่ารำ',
    fullContent: 'การอนุรักษ์โขนเป็นพระราชกรณียกิจที่ทรงให้ความสำคัญอย่างยิ่ง ทรงฟื้นฟูศิลปะการแสดงโขนอย่างครบวงจร ตั้งแต่การจัดสร้างเครื่องแต่งกาย หัวโขน ไปจนถึงการสืบทอดท่ารำและการแสดง ทำให้โขนกลับมามีชีวิตชีวาและเป็นที่รู้จักในระดับสากล',
    location: 'กรุงเทพมหานครและทั่วประเทศ',
    beneficiaries: 'ศิลปินและผู้สืบทอดมรดกทางวัฒนธรรม',
    achievements: [
      'อนุรักษ์ท่ารำโขนโบราณกว่า 108 ท่า',
      'สร้างช่างฝีมือหัวโขนกว่า 50 คน',
      'โขนได้รับการขึ้นทะเบียนมรดกโลก UNESCO',
      'จัดการแสดงโขนพระราชทานเผยแพร่วัฒนธรรม',
      'สร้างรายได้จากการแสดงกว่า 100 ล้านบาท',
    ],
    gallery: [project7],
  },
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = id ? projectsData[id as keyof typeof projectsData] : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-gold mb-4">ไม่พบโครงการที่ต้องการ</h1>
          <Link to="/" className="text-gold hover:text-gold-light">
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingLanterns />
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px]">
        <div className="absolute inset-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </div>

        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-6 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to="/#royal-duties"
                className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors mb-6"
              >
                <ArrowLeft className="w-5 h-5" />
                กลับไปยังพระราชกรณียกิจ
              </Link>

              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full text-gold flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  พ.ศ. {project.year}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-gold mb-2">
                {project.title}
              </h1>
              <p className="text-xl text-foreground/70">{project.subtitle}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Stats Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <MapPin className="w-8 h-8 text-gold mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-1">พื้นที่ดำเนินการ</p>
              <p className="text-foreground font-medium">{project.location}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <Users className="w-8 h-8 text-gold mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-1">ผู้ได้รับประโยชน์</p>
              <p className="text-foreground font-medium">{project.beneficiaries}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <Target className="w-8 h-8 text-gold mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-1">ผลสำเร็จ</p>
              <p className="text-foreground font-medium">{project.achievements.length} รายการ</p>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            className="prose prose-invert max-w-none mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold text-gold mb-6">รายละเอียดโครงการ</h2>
            <p className="text-foreground/80 text-lg leading-relaxed">
              {project.fullContent}
            </p>
          </motion.div>

          {/* Achievements */}
          <motion.div
            className="bg-secondary/30 rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-gold mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                ✦
              </span>
              ผลสำเร็จที่สำคัญ
            </h3>
            <ul className="space-y-4">
              {project.achievements.map((achievement, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-4 text-foreground/80"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <span className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center text-gold text-sm font-semibold shrink-0">
                    {index + 1}
                  </span>
                  <span className="pt-1">{achievement}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Navigation */}
          <motion.div
            className="mt-12 flex justify-between items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {Number(id) > 1 && (
              <Link
                to={`/project/${Number(id) - 1}`}
                className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                โครงการก่อนหน้า
              </Link>
            )}
            <div className="flex-1" />
            {Number(id) < 7 && (
              <Link
                to={`/project/${Number(id) + 1}`}
                className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors"
              >
                โครงการถัดไป
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <Link to="/" className="text-gold hover:text-gold-light transition-colors">
            ร่วมส่งเสด็จสู่สวรรคาลัย
          </Link>
          <p className="text-muted-foreground text-sm mt-2">
            น้อมรำลึกในพระมหากรุณาธิคุณอันหาที่สุดมิได้
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProjectDetail;
