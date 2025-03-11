import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="w-full container mx-auto">
      <Navbar />

      <div className="pt-18 px-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
