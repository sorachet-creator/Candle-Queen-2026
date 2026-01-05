import { motion } from 'framer-motion';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';
import project4 from '@/assets/project-4.jpg';
import project5 from '@/assets/project-5.jpg';
import project6 from '@/assets/project-6.jpg';
import project7 from '@/assets/project-7.jpg';

const projects = [
  {
    id: 1,
    year: 2519,
    title: 'มูลนิธิส่งเสริมศิลปาชีพฯ (SUPPORT Foundation)',
    description: 'ส่งเสริมอาชีพงานหัตถกรรม ทอผ้าไหม และงานศิลปะแก่ราษฎร เพื่อสร้างรายได้เสริมและอนุรักษ์ภูมิปัญญาไทยให้คงอยู่สืบไป',
    image: project1,
  },
  {
    id: 2,
    year: 2525,
    title: 'โครงการป่ารักน้ำ (Forest Loves Water)',
    description: 'ทรงมีพระราชดำริให้ฟื้นฟูสภาพป่าต้นน้ำ เพื่อให้ \'ป่า\' ทำหน้าที่ซับน้ำและหล่อเลี้ยงชีวิต \'น้ำ\' อันเป็นปัจจัยสำคัญของการดำรงชีวิต',
    image: project2,
  },
  {
    id: 3,
    year: 2541,
    title: 'โครงการฟาร์มตัวอย่าง (Model Farm Project)',
    description: 'สร้างแหล่งจ้างงาน ผลิตอาหารที่ปลอดภัย และเป็นแหล่งเรียนรู้ทางการเกษตรที่ทันสมัยแก่ราษฎรในพื้นที่',
    image: project3,
  },
  {
    id: 4,
    year: 2522,
    title: 'สถานีพัฒนาเกษตรที่สูง (Highland Agriculture)',
    description: 'ส่งเสริมอาชีพเกษตรกรรมแก่ชาวไทยภูเขา ลดการทำลายป่าต้นน้ำ และฟื้นฟูระบบนิเวศให้กลับมาสมบูรณ์',
    image: project4,
  },
  {
    id: 5,
    year: 2540,
    title: 'โครงการคืนช้างสู่ธรรมชาติ (Elephant Reintroduction)',
    description: 'ฟื้นฟูประชากรช้างป่าไทย และจัดสรรพื้นที่ป่าให้เป็นที่อยู่อาศัยที่ปลอดภัย เพื่อการอนุรักษ์ช้างไทยอย่างยั่งยืน',
    image: project5,
  },
  {
    id: 6,
    year: 2522,
    title: 'โครงการอนุรักษ์พันธุ์เต่าทะเล (Sea Turtle Conservation)',
    description: 'พระราชทานเกาะมันในเป็นสถานที่เพาะเลี้ยงและอนุรักษ์พันธุ์เต่าทะเล เพื่อปล่อยคืนสู่ธรรมชาติและรักษาสมดุลทางทะเล',
    image: project6,
  },
  {
    id: 7,
    year: 2546,
    title: 'การอนุรักษ์โขน (Khon Performance Preservation)',
    description: 'ทรงฟื้นฟูศาสตร์และศิลป์ของการแสดงโขน ตั้งแต่เครื่องแต่งกาย หัวโขน จนถึงกระบวนท่ารำ เพื่อเป็นสมบัติทางวัฒนธรรมของชาติ',
    image: project7,
  },
];

const RoyalDutiesSection = () => {
  return (
    <section id="royal-duties" className="relative py-24 px-6">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-muted-foreground uppercase tracking-widest text-sm">
            THE ROYAL DUTIES
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-gold mt-4 mb-6">
            พระราชกรณียกิจ
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            การรวบรวมภาพที่น่าประทับใจและโครงการริเริ่มของพระราชาเพื่อรำลึกถึง พระมหากรุณาธิคุณ
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              className="group relative bg-card rounded-xl overflow-hidden border border-border hover:border-gold/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full text-gold text-sm">
                  Year {project.year}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-gold transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <button className="text-gold text-sm hover:text-gold-light transition-colors flex items-center gap-1">
                  อ่านเพิ่มเติม
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoyalDutiesSection;
