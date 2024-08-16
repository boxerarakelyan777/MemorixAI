import Hero from '../../components/Hero';
import Pricing from '../../components/Pricing';
import HowItWorks from '../../components/HowItWorks';
import TeamSection from '../../components/TeamSection';
const MainPage: React.FC = () => {
  return (
    <div>
      
      <Hero />
      <HowItWorks />
      <Pricing />
      <TeamSection />
    </div>
  );
};

export default MainPage;
