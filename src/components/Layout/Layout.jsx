import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar  />
      <main className="overflow-hidden flex-fill  ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
