import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet, useLocation } from "react-router";

const Layout = () => {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith("/auth");

  return (
    <div className="w-full container mx-auto">
      <Navbar />

      <div className="pt-18 px-4">
        <Outlet />
      </div>
      {/* Conditionally render Footer */}
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
