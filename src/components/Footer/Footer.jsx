const sections = ["Home", "Features", "Pricing", "FAQs", "About"];
import "./Footer.css";
export default function Footer() {
  return (
    <div className="footer-container" data-bs-theme="dark">
      <div className="container">
        <div className=" py-5">
          <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 ">
            <div className="col ">
              <a
                href="/"
                className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none"
                aria-label="Bootstrap"
              >
                <svg
                  className="bi me-2"
                  width="40"
                  height="32"
                  aria-hidden="true"
                >
                  <use xlinkHref="#bootstrap"></use>
                </svg>
              </a>
              <p className="text-body-secondary">© 2025</p>
            </div>

            <div className="col "></div>

            {[1, 2, 3].map((_, idx) => (
              <div key={idx} className="col">
                <h5>Section</h5>
                <ul className="nav flex-column">
                  {sections.map((item, i) => (
                    <li key={i} className="nav-item ">
                      <a href="#" className="nav-link p-0 text-body-secondary">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </footer>
        </div>
      </div>
    </div>
  );
}
