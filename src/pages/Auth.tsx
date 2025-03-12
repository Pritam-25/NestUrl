import { useNavigate, useSearchParams } from "react-router";
import { useUrlState } from "@/context";
import { useEffect } from "react";

const Auth = () => {
  const [serchParams] = useSearchParams();
  const longLink = serchParams.get("createNew");
  const navigate = useNavigate();

  const { isAuthenticated, loading } = useUrlState();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(`/dashboard?${longLink}` ? `createNew=${longLink}` : "");
    }
  }, []);

  return (
    <div className="w-full h-screen mx-auto flex justify-center items-center">
      <h1 className="text-4xl font-black">
        {serchParams.get("createNew")
          ? "Hold Up please Sign Up first"
          : "Login/Signup"}
      </h1>
    </div>
  );
};

export default Auth;
