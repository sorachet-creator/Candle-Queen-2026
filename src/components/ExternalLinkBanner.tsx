import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ExternalLinkBanner = () => {
  const { t } = useLanguage();

  return (
    <motion.section
      className="relative py-16 px-6 opacity-100 rounded-none shadow-none border-none border-0"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}>

      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-gold/5 pointer-events-none" />

      <div className="relative container mx-auto max-w-2xl text-center">
        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          <div className="w-3 h-3 rotate-45 border border-gold" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent via-gold to-transparent" />
        </div>

        <h3 className="text-xl md:text-2xl font-semibold gradient-gold-text mb-3">
          {t.externalLink.title}
        </h3>
        <p className="text-foreground/70 text-sm md:text-base mb-8 max-w-lg mx-auto">
          {t.externalLink.description}
        </p>

        <motion.a
          href="https://www.prd.go.th"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-primary-foreground font-semibold rounded-full glow-gold hover:brightness-110 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>

          {t.externalLink.button}
          <ExternalLink className="w-4 h-4" />
        </motion.a>
      </div>
    </motion.section>);

};

export default ExternalLinkBanner;