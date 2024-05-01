import Container from '../../../components/Container/Container';
import CategorySection from '../CategorySecton/CategorySection';
import ExperiencedSec from '../ExperiencedSec/ExperiencedSec';
import ForYouProducts from '../ForYouProducts/ForYouProducts';
import HeroSection from '../HeroSection/HeroSection';

const Home = () => {
  return (
    <Container>
      <HeroSection />
      <ExperiencedSec />
      <CategorySection />
      <ForYouProducts />
    </Container>
  );
};

export default Home;
