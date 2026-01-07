import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRef } from 'react';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';
import project4 from '@/assets/project-4.jpg';
import project5 from '@/assets/project-5.jpg';
import project6 from '@/assets/project-6.jpg';
import project7 from '@/assets/project-7.jpg';

const projectImages = [project1, project2, project3, project4, project5, project6, project7];

interface ProjectCardProps {
  project: { id: number; year: number; title: string; description: string };
  index: number;
  image: string;
  isReversed: boolean;
  yearLabel: string;
  readMoreLabel: string;
}

const ProjectCard = ({ project, index, image, isReversed, yearLabel, readMoreLabel }: ProjectCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Increased parallax effect
  const imageY = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: 0.1 }}
    >
      {/* Image Side */}
      <div className="w-full lg:w-1/2 relative overflow-hidden rounded-lg">
        <motion.div 
          ref={imageRef}
          className="relative"
          style={{ y: imageY }}
        >
          <motion.img
            src={image}
            alt={project.title}
            className="w-full h-64 md:h-80 lg:h-96 object-cover"
            style={{ scale: imageScale }}
          />
        </motion.div>
        {/* Year Badge with separate parallax */}
        <motion.div 
          className="absolute top-4 left-4 flex flex-col items-center bg-background/80 backdrop-blur-sm px-3 py-2 rounded-lg"
          style={{ y: badgeY }}
        >
          <span className="text-muted-foreground text-xs uppercase tracking-wider">{yearLabel}</span>
          <span className="text-gold text-2xl font-bold">{project.year}</span>
        </motion.div>
      </div>

      {/* Content Side */}
      <div className={`w-full lg:w-1/2 ${isReversed ? 'lg:text-right lg:pr-8' : 'lg:text-left lg:pl-8'}`}>
        <motion.div
          initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold gradient-gold-text mb-4 leading-tight">
            {project.title}
          </h3>
          <p className="text-foreground/70 text-sm md:text-base leading-relaxed mb-6">
            {project.description}
          </p>
          <Link 
            to={`/project/${project.id}`}
            className={`inline-flex items-center gap-2 px-6 py-2 border border-gold/50 rounded-full text-gold text-sm hover:bg-gold/10 transition-all duration-300 ${isReversed ? 'flex-row-reverse' : ''}`}
          >
            {readMoreLabel}
            <svg className={`w-4 h-4 ${isReversed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

const RoyalDutiesSection = () => {
  const { t, language } = useLanguage();

  return (
    <section id="royal-duties" className="relative py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-muted-foreground uppercase tracking-widest text-sm">
            {t.royalDuties.subtitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold gradient-gold-text mt-4 mb-6">
            {t.royalDuties.title}
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            {t.royalDuties.description}
          </p>
        </motion.div>

        <div className="space-y-24 lg:space-y-32">
          {t.projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              image={projectImages[index]}
              isReversed={index % 2 === 1}
              yearLabel={language === 'TH' ? 'พ.ศ.' : t.royalDuties.year}
              readMoreLabel={t.royalDuties.readMore}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoyalDutiesSection;
