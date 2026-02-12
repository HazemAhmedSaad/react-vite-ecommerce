import Slider from "react-slick";
import "./HomeSlider.css";
import slider1 from "../../../assets/images/slider1.jpg";
import slider2 from "../../../assets/images/slider2.jpg";
import slider3 from "../../../assets/images/slider3.jpg";

export default function HomeSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 4000,
    fade: true,
    autoplay: true,
    initialSlide: 1,
    arrows: false,
    lazyLoad: true,
  };

  return (
    <Slider {...settings} className="home-slider">
      <div>
        <div className="slide">
          <img src={slider2} alt="Technology" loading="lazy" />
          <div className="overlay" />
          <div className="caption">
            <h1>Technology</h1>
            <p>Future is here</p>
          </div>
        </div>
      </div>

      <div>
        <div className="slide">
          <img src={slider1} alt="Sports" loading="lazy" />
          <div className="overlay" />
          <div className="caption">
            <h1>Sports</h1>
            <p>Feel the power</p>
          </div>
        </div>
      </div>

      <div>
        <div className="slide">
          <img src={slider3} alt="Clothes" loading="lazy" />
          <div className="overlay" />
          <div className="caption">
            <h1>Clothes</h1>
            <p>Style your life</p>
          </div>
        </div>
      </div>
    </Slider>
  );
}
