import { useUrlState } from "@/context";
import { ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { BarLoader } from "react-spinners";

const Require_Auth = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, loading } = useUrlState();
  const navigate = useNavigate();
  const location = useLocation(); // Get current location
  const searchParams = new URLSearchParams(location.search); // Read URL query params

  const longLink = searchParams.get("createNew");

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate(longLink ? `/auth?createNew=${longLink}` : "/auth");
    }
  }, [isAuthenticated, loading]);

  if (loading) return <BarLoader width={"100%"} color="#e11d48" />;
  return isAuthenticated ? children : null;
};

export default Require_Auth;
