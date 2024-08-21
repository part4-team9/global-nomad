import CallToActionSection from './_components/CallToActionSection';
import CategorySection from './_components/CategorySection';
import HeroSection from './_components/HeroSection';
import IntroduceService from './_components/IntroduceService';

export default function Home() {
  return (
    <>
      <HeroSection />
      <IntroduceService />
      <CategorySection />
      <CallToActionSection />
    </>
  );
}
