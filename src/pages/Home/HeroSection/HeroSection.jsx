import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './HeroSection.css';
import sliderdata from '../../../data/sliderdata';
import { Link } from 'react-router-dom';
import categories from '../../../data/categoryData';

const HeroSection = () => {
  return (
    <main className="flex my-5 justify-between gap-5 items-center">
      <div className="hidden border border-slate-200 p-5  bg-white rounded-xl lg:block w-[300px] shadow-md">
        <ul className="font-semibold space-y-[13px] text-gray-500">
          {categories.map(category => (
            <li className="hover:text-[#f85606] text-xs" key={category.id}>
              <Link to={category.path}> {category.name} </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 w-full lg:w-[calc(1024px-300px)]">
        <Swiper
          cssMode={true}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          autoplay={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
          className="mySwiper w-full"
        >
          {sliderdata.map(item => (
            <SwiperSlide key={item.id}>
              <div className="w-full h-[300px] lg:h-[350px] rounded-xl">
                <img
                  src={item.img}
                  className="w-full rounded-xl  h-full"
                  alt=""
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </main>
  );
};

export default HeroSection;
