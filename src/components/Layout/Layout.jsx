import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
function Layout() {
  
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <Outlet />
      </main>
      <Footer/>
    </>
  );
}

export default Layout;
