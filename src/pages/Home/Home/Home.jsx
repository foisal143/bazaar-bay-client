import Container from '../../../components/Container/Container';
import CategorySection from '../CategorySecton/CategorySection';
import ExperiencedSec from '../ExperiencedSec/ExperiencedSec';
import HeroSection from '../HeroSection/HeroSection';

const Home = () => {
  return (
    <Container>
      <HeroSection />
      <ExperiencedSec />
      <CategorySection />
    </Container>
  );
};

export default Home;
