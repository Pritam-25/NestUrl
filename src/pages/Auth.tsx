import { useSearchParams } from "react-router";

const Auth = () => {
  const [serchParams] = useSearchParams();

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
