import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import RoyalDutiesSection from '@/components/RoyalDutiesSection';
import FloatingLanterns from '@/components/FloatingLanterns';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <FloatingLanterns />
      <Header />
      <main className="relative z-10">
        <HeroSection />
        <RoyalDutiesSection />
      </main>
      
      <footer className="relative z-10 py-8 border-t border-border/30 text-center">
        <p className="text-muted-foreground text-sm">
          {t.footer.copyright}
        </p>
      </footer>
    </div>
  );
};

export default Index;