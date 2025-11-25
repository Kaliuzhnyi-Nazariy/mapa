import { useState } from "react";
import Signup from "./signup";
import Signin from "./Signin";

const AuthPage = () => {
  const [auth, setAuth] = useState<"signup" | "signin">("signup");

  const changeAuth = (authType: "signup" | "signin") => {
    if (authType === auth) return;
    setAuth(authType);
  };

  return (
    <div className="min-[1024px]:flex w-full min-h-screen">
      <div className="bg-orange-500 h-screen flex justify-center items-center min-[1024px]:w-1/2">
        <div className="bg-white p-5 rounded-2xl max-h-[350px] grid w-4/5 min-[1024px]:p-10">
          <ul className="grid grid-cols-3 self-center justify-self-center w-full">
            <li className="w-full h-full flex justify-end">
              <button
                type="button"
                className={`w-full h-full ${
                  auth === "signup" && "text-orange-500"
                }`}
                onClick={() => changeAuth("signup")}
              >
                Signup
              </button>
            </li>
            <li className="w-full h-full flex justify-center">
              <div className="h-full w-px bg-black"></div>
            </li>
            <li className="w-full h-full flex justify-center">
              <button
                type="button"
                className={`w-full h-full ${
                  auth === "signin" && "text-orange-500"
                }`}
                onClick={() => changeAuth("signin")}
              >
                Signin
              </button>
            </li>
          </ul>
          {auth === "signup" ? <Signup /> : <Signin />}
        </div>
      </div>
      <img
        src="https://cdn.pixabay.com/photo/2022/11/08/07/53/desk-7577945_1280.jpg"
        alt="maps"
        className="hidden min-[1024px]:block w-1/2 h-screen object-cover object-center"
      />
    </div>
  );
};

export default AuthPage;
