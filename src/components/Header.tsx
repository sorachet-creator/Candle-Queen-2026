import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/lib/translations';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();

  const languages: Language[] = ['TH', 'EN', 'CN'];

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/30"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <motion.h1 
          className="text-gold text-lg md:text-xl font-semibold"
          whileHover={{ scale: 1.02 }}
        >
          {t.header.title}
        </motion.h1>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#lanterns" className="text-foreground/80 hover:text-gold transition-colors">
            {t.header.lightLantern}
          </a>
          <a href="#royal-duties" className="text-foreground/80 hover:text-gold transition-colors">
            {t.header.royalDuties}
          </a>
        </nav>

        <div className="flex items-center bg-secondary rounded-full p-1">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                language === lang
                  ? 'bg-gold text-primary-foreground'
                  : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;