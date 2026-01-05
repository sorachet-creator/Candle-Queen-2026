import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';
import project4 from '@/assets/project-4.jpg';
import project5 from '@/assets/project-5.jpg';
import project6 from '@/assets/project-6.jpg';
import project7 from '@/assets/project-7.jpg';

const projectImages = [project1, project2, project3, project4, project5, project6, project7];

const RoyalDutiesSection = () => {
  const { t, language } = useLanguage();

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
            {t.royalDuties.subtitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-gold mt-4 mb-6">
            {t.royalDuties.title}
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            {t.royalDuties.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.projects.map((project, index) => (
            <Link key={project.id} to={`/project/${project.id}`}>
              <motion.article
                className="group relative bg-card rounded-xl overflow-hidden border border-border hover:border-gold/50 transition-all duration-300 cursor-pointer h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={projectImages[index]}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full text-gold text-sm">
                    {language === 'TH' ? 'พ.ศ.' : t.royalDuties.year} {project.year}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-gold transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <span className="text-gold text-sm hover:text-gold-light transition-colors flex items-center gap-1">
                    {t.royalDuties.readMore}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoyalDutiesSection;