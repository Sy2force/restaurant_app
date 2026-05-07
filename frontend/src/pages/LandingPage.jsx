import HeroLanding from '../components/Landing/HeroLanding';
import DishesCarousel from '../components/Landing/DishesCarousel';
import RestaurantsSection from '../components/Landing/RestaurantsSection';
import CTASection from '../components/Landing/CTASection';
import AdvantagesSection from '../components/Landing/AdvantagesSection';

// VERSION 2 - Commented out for simplified restaurant guide
// import StatsSection from '../components/Landing/StatsSection';
// import PublishSection from '../components/Landing/PublishSection';
// import RecipesSection from '../components/Landing/RecipesSection';
// import TestimonialsSection from '../components/Landing/TestimonialsSection';

const LandingPage = () => {
  return (
    <div className="overflow-x-hidden">
      <HeroLanding />
      <RestaurantsSection />
      <DishesCarousel />
      <AdvantagesSection />
      <CTASection />
      {/* VERSION 2 - Social features disabled */}
      {/* <StatsSection /> */}
      {/* <PublishSection /> */}
      {/* <TestimonialsSection /> */}
      {/* <RecipesSection /> */}
    </div>
  );
};

export default LandingPage;
