import Navbar from "@/components/Navbar";
import { Outlet } from "react-router";

const Auth = () => {
  return (
    <div className="flex h-screen overflow-hidden justify-center items-center">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Auth;
