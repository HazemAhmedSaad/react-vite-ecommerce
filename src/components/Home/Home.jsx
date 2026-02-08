import HomeSlider from "./HomeSlider/HomeSlider";
import "./Home.css";
import earphone from "../../assets/images/earphone.png";
import gadgests from "../../assets/images/gadgests.png";
import Laptop from "../../assets/images/Laptop.png";
import consoleImage from "../../assets/images/console.png";
import oculus from "../../assets/images/oculus.png";
import speaker from "../../assets/images/speaker.png";
import card1 from "../../assets/images/card1.jpg";
import card2 from "../../assets/images/card2.jpg";
import card3 from "../../assets/images/card3.jpg";
import headphone from "../../assets/images/headphone.png";
import scooter from "../../assets/images/scooter-01.png";
import card4 from "../../assets/images/card4.jpg";
import card5 from "../../assets/images/card5.jpg";
import { motion } from "framer-motion";
import React, { useContext } from "react";
import { autContext } from "../../context/AuthenticationToken";
const MemoHomeSlider = React.memo(HomeSlider);
function Home() {
  const { token } = useContext(autContext);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* start slider  */}
      <MemoHomeSlider />
      {/* <!-- end slider --> */}

      {/* <!-- start digital --> */}
      <div className="digital my-5 py-5 container">
        <div className="row row-cols-1 row-cols-lg-2 mt-5 g-4">
          <div className="col order-lg-0 d-flex">
            <div className="card  me-3 earphone">
              <img
                src={earphone}
                className="card-img "
                alt="earphone"
                loading="lazy"
                decoding="async"
              />
              <div className="card-body">
                <p className="card-title">Enjoy</p>
                <h4>With</h4>
                <h2>EARPHONE</h2>
                <button className="btn">Browse</button>
              </div>
            </div>
            <div className="card ms-3 gadgets">
              <img
                src={gadgests}
                className="card-img"
                alt="GADGETS"
                loading="lazy"
                decoding="async"
              />
              <div className="card-body">
                <p className="card-title">New</p>
                <h4>Wear</h4>
                <h2>GADGETS</h2>
                <button className="btn">Browse</button>
              </div>
            </div>
          </div>
          <div className="col order-lg-1">
            <div className="card  laptop">
              <img
                src={Laptop}
                className="card-img"
                alt="laptop"
                loading="lazy"
                decoding="async"
              />
              <div className="card-body">
                <p className="card-title">Trend</p>
                <h4>Devices</h4>
                <h2>LAPTOP</h2>
                <button className="btn">Browse</button>
              </div>
            </div>
          </div>
          <div className="col order-lg-3 d-flex ">
            <div className="card   me-3 oculus">
              <img
                src={oculus}
                className="card-img"
                alt="oculus"
                loading="lazy"
                decoding="async"
              />
              <div className="card-body">
                <p className="card-title">Play</p>
                <h4>Game</h4>
                <h2> OCULUS </h2>
                <button className="btn ">Browse</button>
              </div>
            </div>
            <div className="card ms-3 speaker">
              <img
                src={speaker}
                className="card-img"
                alt="speaker"
                loading="lazy"
                decoding="async"
              />
              <div className="card-body">
                <p className="card-title">New</p>
                <h4>Amazon</h4>
                <h2>SPEAKER</h2>
                <button className="btn">Browse</button>
              </div>
            </div>
          </div>
          <div className="col order-lg-2  ">
            <div className="card console">
              <img
                src={consoleImage}
                className="card-img"
                alt="console"
                loading="lazy"
                decoding="async"
              />
              <div className="card-body">
                <p className="card-title">Best</p>
                <h4>Gaming</h4>
                <h2> CONSOLE </h2>
                <button className="btn">Browse</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- end digital --> */}
      {/* <!-- start about --> */}
      <div className="about my-5 py-5">
        <div className="container my-5">
          <div className="about-text">
            <h6>About Us</h6>
            <h2 className="my-4">
              If you're looking for a brand new technology to power your life,
              you're in the right place
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
              accumsan lacus vel facilisis.
            </p>
          </div>
        </div>
      </div>
      {/* <!-- end about --> */}

      {/* <!-- start group of image --> */}
      <div className="first-card container my-5 py-5">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="card">
              <img
                src={card1}
                className="card-img-top"
                alt="product"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <div className="col">
            <div className="card">
              <img
                src={card2}
                className="card-img-top"
                alt="product"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <div className="col">
            <div className="card">
              <img
                src={card3}
                className="card-img-top"
                alt="product"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end group of image --> */}
      {/* <!-- start hedphone --> */}
      <div className="headphone">
        <div className="container">
          <div className="headphone-card">
            <img
              src={headphone}
              className=""
              alt="headphone"
              loading="lazy"
              decoding="async"
            />
            <div className="headphone-text">
              <p className="">Headphone</p>
              <h5 className=" my-3">Wireless Bluetooth Headphone</h5>
              <p className="">$299</p>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end headphone --> */}

      {/* <!-- start card scotter --> */}
      <div className="container">
        <div className="card bg-light-blue my-5">
          <img
            src={scooter}
            className="card-img "
            alt="scoter"
            loading="lazy"
            decoding="async"
          />
          <div className="card-img-overlay">
            <h1 className="elementor-heading-title elementor-size-default">
              Libero X250
            </h1>
            <h4 className="elementor-heading-title elementor-size-default">
              250 Watt Electric Scooter
            </h4>
            <h5 className="card-title">Information:</h5>
            <div className="properties">
              <div>
                <h3>30 </h3>
                <h3>km</h3> <span>BATTERY</span>
              </div>
              <div>
                <h3>13.5</h3>
                <h3> kg</h3> <span>WEIGHT</span>
              </div>
              <div>
                <h3>25 </h3>
                <h3>km/h</h3> <span>SPEED</span>
              </div>
            </div>
            <div className="description">
              <h3 className="card-title text-center">Description:</h3>
              <p className="card-text text-center px-5 ">
                The Fully Loaded Libero x250 is a High Performance, Extremely
                Durable, High Speed, Lightweight Electric Scooter with a Huge
                Battery
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end card scotter --> */}

      {/* <!-- start offer --> */}
      <div className=" offer my-5 py-2 container ">
        <div className="row row-cols-1 row-cols-md-2 g-4 mt-5">
          <div className="col">
            <div className="card px-3">
              <img
                src={card5}
                className="card-img-top"
                alt="offer"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <div className="col">
            <div className="card px-3">
              <img
                src={card4}
                className="card-img-top"
                alt="offer"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Home;
