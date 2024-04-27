import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './HeroSection.css';
import sliderdata from '../../../data/sliderdata';

const HeroSection = () => {
  return (
    <main className="flex my-5 justify-between gap-5 items-center">
      <div className="hidden border border-slate-200 p-5  rounded-xl lg:block w-[300px] shadow-sm">
        categories section
      </div>
      <div className="flex-1 w-full lg:w-[calc(1024px-300px)]">
        <Swiper
          cssMode={true}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
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
