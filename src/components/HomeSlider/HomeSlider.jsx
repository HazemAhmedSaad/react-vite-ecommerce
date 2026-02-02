import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./HomeSlider.css";
import slider1 from "../../assets/images/slider1.jpg";
import slider2 from "../../assets/images/slider2.jpg";
import slider3 from "../../assets/images/slider3.jpg";

export default function HomeSlider() {
  return (
    <Swiper
      modules={[Autoplay, Pagination, EffectFade]}
      effect="fade"
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      loop
      className="home-slider"
    >
      <SwiperSlide>
        <div className="slide">
          <img src={slider1} alt="Sports" />
          <div className="overlay" />
          <div className="caption">
            <h1>Sports</h1>
            <p>Feel the power</p>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="slide">
          <img src={slider2} alt="Technology" />
          <div className="overlay" />
          <div className="caption">
            <h1>Technology</h1>
            <p>Future is here</p>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="slide">
          <img src={slider3} alt="Clothes" />
          <div className="overlay" />
          <div className="caption">
            <h1>Clothes</h1>
            <p>Style your life</p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
