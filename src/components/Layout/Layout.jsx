import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
function Layout() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
