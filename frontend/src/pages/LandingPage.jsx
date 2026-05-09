import HeroLanding from '../components/Landing/HeroLanding';
import DishesCarousel from '../components/Landing/DishesCarousel';
import RestaurantsSection from '../components/Landing/RestaurantsSection';
import CTASection from '../components/Landing/CTASection';
import AdvantagesSection from '../components/Landing/AdvantagesSection';
import TechStackSection from '../components/Landing/TechStackSection';

const LandingPage = () => {
  return (
    <div className="overflow-x-hidden">
      <HeroLanding />
      <RestaurantsSection />
      <DishesCarousel />
      <AdvantagesSection />
      <TechStackSection />
      <CTASection />
    </div>
  );
};

export default LandingPage;
