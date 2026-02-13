import React from "react";
import { motion } from "framer-motion";
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

const MemoHomeSlider = React.memo(HomeSlider);

// ======= Variants =======
const containerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const itemLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.3 },
  },
};

const itemRight = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const itemUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// ======= Component =======
function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* start slider */}
      <MemoHomeSlider />
      {/* end slider */}

      {/* start digital */}
      <motion.div className="digital my-5 pb-5 pt-2 container">
        <motion.div className="row row-cols-1 row-cols-lg-2 mt-5 g-4">
          <motion.div
            className="col order-lg-0 d-flex"
            variants={itemLeft}
            viewport={{ once: true, amount: 0.5 }}
            initial="hidden"
            whileInView="visible"
          >
            <div className="card me-3 earphone">
              <img
                src={earphone}
                alt="earphone"
                loading="lazy"
                decoding="async"
              />
              <div className="card-body ms-0 ms-md-3">
                <p className="card-title">Enjoy</p>
                <h4>With</h4>
                <h2 className="type-title">EARPHONE</h2>
                <button className="btn">Browse</button>
              </div>
            </div>
            <div className="card ms-3 gadgets">
              <img
                src={gadgests}
                alt="GADGETS"
                loading="lazy"
                decoding="async"
              />
              <div className="card-body ms-0 ms-md-3">
                <p className="card-title">New</p>
                <h4>Wear</h4>
                <h2 className="type-title">GADGETS</h2>
                <button className="btn">Browse</button>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="col order-lg-1"
            variants={itemRight}
            viewport={{ once: true, amount: 0.5 }}
            initial="hidden"
            whileInView="visible"
          >
            <div className="card laptop">
              <img src={Laptop} alt="laptop" loading="lazy" decoding="async" />
              <div className="card-body ms-0 ms-md-3">
                <p className="card-title">Trend</p>
                <h4>Devices</h4>
                <h2>LAPTOP</h2>
                <button className="btn">Browse</button>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="col order-lg-3 d-flex"
            viewport={{ once: true, amount: 0.5 }}
            variants={itemLeft}
            initial="hidden"
            whileInView="visible"
          >
            <div className="card me-3 oculus">
              <img src={oculus} alt="oculus" loading="lazy" decoding="async" />
              <div className="card-body ms-0 ms-md-3">
                <p className="card-title">Play</p>
                <h4>Game</h4>
                <h2 className="type-title">OCULUS</h2>
                <button className="btn">Browse</button>
              </div>
            </div>
            <div className="card ms-3 speaker">
              <img
                src={speaker}
                alt="speaker"
                loading="lazy"
                decoding="async"
              />
              <div className="card-body ms-0 ms-md-3">
                <p className="card-title">New</p>
                <h4>Amazon</h4>
                <h2 className="type-title">SPEAKER</h2>
                <button className="btn">Browse</button>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="col order-lg-2"
            viewport={{ once: true, amount: 0.5 }}
            variants={itemRight}
            initial="hidden"
            whileInView="visible"
          >
            <div className="card console">
              <img
                src={consoleImage}
                alt="console"
                loading="lazy"
                decoding="async"
              />
              <div className="card-body ms-0 ms-md-3">
                <p className="card-title">Best</p>
                <h4>Gaming</h4>
                <h2>CONSOLE</h2>
                <button className="btn">Browse</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      {/* end digital */}

      {/* start about */}
      <motion.div
        className="about my-5 py-5"
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.div className="container my-5" variants={itemUp}>
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
        </motion.div>
      </motion.div>
      {/* end about */}

      {/* start first-card gallery */}
      <motion.div
        className="first-card container my-5 py-5"
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        delya={0.5}
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.div className="row row-cols-1 row-cols-md-3 g-4">
          {[card1, card2, card3].map((card, idx) => (
            <motion.div className="col" key={idx} variants={itemUp}>
              <div className="card">
                <img src={card} alt="product" loading="lazy" decoding="async" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      {/* end first-card gallery */}

      {/* start headphone */}
      <div className="headphone">
        <div className="container">
          <div className="headphone-card">
            <img
              src={headphone}
              alt="headphone"
              loading="lazy"
              decoding="async"
            />
            <div className="headphone-text">
              <p>Headphone</p>
              <h5 className="my-3">Wireless Bluetooth Headphone</h5>
              <p>$299</p>
            </div>
          </div>
        </div>
      </div>
      {/* end headphone */}

      {/* start scooter */}
      <motion.div className="container pt-5">
        <motion.div
          className="card bg-light-blue my-5 min-vh-100"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.div className="mt-5" variants={itemUp}>
            {" "}
            <motion.img
              src={scooter}
              alt="scooter"
              loading="lazy"
              decoding="async"
            />{" "}
          </motion.div>

          <motion.div variants={itemUp} className="card-img-overlay  ">
            <div className=" ">
              {" "}
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
            </div>
            <div className="description">
              <h3 className="card-title text-center">Description:</h3>
              <p className="card-text text-center px-5">
                The Fully Loaded Libero x250 is a High Performance, Extremely
                Durable, High Speed, Lightweight Electric Scooter with a Huge
                Battery
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      {/* end scooter */}

      {/* start offer */}
      <motion.div
        className="offer my-5 py-2 container"
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.div className="row row-cols-1 row-cols-md-2 g-4 mt-5">
          {[card5, card4].map((card, idx) => (
            <motion.div className="col" key={idx} variants={itemUp}>
              <div className="card px-3">
                <img src={card} alt="offer" loading="lazy" decoding="async" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      {/* end offer */}
    </motion.div>
  );
}

export default Home;
