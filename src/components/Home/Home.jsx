import HomeSlider from "../HomeSlider/HomeSlider";
import "./Home.css";
function Home() {
  return (
    <>
      {/* start slider  */}
      <HomeSlider />
      {/* <!-- end slider --> */}

      {/* <!-- start digital --> */}
      <div className="digital my-5 py-5 container">
        <div className="row row-cols-1 row-cols-md-2 mt-5 g-4">
          <div className="col-lg-6 col-md-12 d-flex">
            <div className="card  me-3 earphone">
              <img
                src="./src/assets/images/earphone.png"
                className="card-img "
                alt="earphone"
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
                src="./src/assets/images/gadgests.png"
                className="card-img"
                alt="GADGETS"
              />
              <div className="card-body">
                <p className="card-title">New</p>
                <h4>Wear</h4>
                <h2>GADGETS</h2>
                <button className="btn">Browse</button>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="card  laptop">
              <img
                src="./src/assets/images/Laptop.png"
                className="card-img"
                alt="laptop"
              />
              <div className="card-body">
                <p className="card-title">Trend</p>
                <h4>Devices</h4>
                <h2>LAPTOP</h2>
                <button className="btn">Browse</button>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 mb-5">
            <div className="card console">
              <img
                src="./src/assets/images/console.png"
                className="card-img"
                alt="console"
              />
              <div className="card-body">
                <p className="card-title">Best</p>
                <h4>Gaming</h4>
                <h2> CONSOLE </h2>
                <button className="btn">Browse</button>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 d-flex m-0">
            <div className="card  me-3 oculus">
              <img
                src="./src/assets/images/oculus.png"
                className="card-img"
                alt="oculus"
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
                src="./src/assets/images/speaker.png"
                className="card-img"
                alt="speaker"
              />
              <div className="card-body">
                <p className="card-title">New</p>
                <h4>Amazon</h4>
                <h2>SPEAKER</h2>
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
                src="./src/assets/images/card1.jpg"
                className="card-img-top"
                alt="product"
              />
            </div>
          </div>
          <div className="col">
            <div className="card">
              <img
                src="./src/assets/images/card3.jpg"
                className="card-img-top"
                alt="product"
              />
            </div>
          </div>
          <div className="col">
            <div className="card">
              <img
                src="./src/assets/images/card2.jpg"
                className="card-img-top"
                alt="product"
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
              src="./src/assets/images/headphone.png"
              className=""
              alt="headphone"
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
            src="./src/assets/images/scooter-01.png"
            className="card-img "
            alt="scoter"
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
              <p className="card-text text-muted text-center px-5 ">
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
                src="./src/assets/images/card5.jpg"
                className="card-img-top"
                alt="offer"
              />
            </div>
          </div>
          <div className="col">
            <div className="card px-3">
              <img
                src="./src/assets/images/card4.jpg"
                className="card-img-top"
                alt="offer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* <!-- end offer --> */}
    </>
  );
}

export default Home;
