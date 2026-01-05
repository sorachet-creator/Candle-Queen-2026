import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import RoyalDutiesSection from '@/components/RoyalDutiesSection';
import FloatingLanterns from '@/components/FloatingLanterns';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <FloatingLanterns />
      <Header />
      <main className="relative z-10">
        <HeroSection />
        <RoyalDutiesSection />
      </main>
      
      <footer className="relative z-10 py-8 border-t border-border/30 text-center">
        <p className="text-muted-foreground text-sm">
          ร่วมส่งเสด็จสู่สวรรคาลัย © 2024
        </p>
      </footer>
    </div>
  );
};

export default Index;
