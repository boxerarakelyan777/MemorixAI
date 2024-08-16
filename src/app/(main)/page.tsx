import Hero from '../../components/Hero';
import Pricing from '../../components/Pricing';
import HowItWorks from '../../components/HowItWorks';
import TeamSection from '../../components/TeamSection';
import ContactForm from '../../components/ContactForm';
const MainPage: React.FC = () => {
  return (
    <div>
      
      <Hero />
      <HowItWorks />
      <Pricing />
      <TeamSection />
      <ContactForm />
    </div>
  );
};

export default MainPage;
