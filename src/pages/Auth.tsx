import { Outlet, useSearchParams } from "react-router";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  return (
    <div className="w-full h-screen mx-auto flex flex-col justify-center items-center">
      {longLink && (
        <h2 className="text-xl text-red-500 mb-4">
          Hold up! Please sign up first.
        </h2>
      )}
      <Outlet />
    </div>
  );
};

export default Auth;
