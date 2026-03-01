import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <ScrollToTop />
      <main className=" flex-fill overflow-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
