import { useState } from "react";
import { useAppDispatch } from "../../redux/dispatch";
import { signin } from "../../redux/user/authRequests";
import { useSelector } from "react-redux";
import { userLoading } from "../../redux/user/selectors";

const Signin = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const isLoading = useSelector(userLoading);

  const onSubmit = () => {
    if (!email || !password) return;

    dispatch(signin({ email, password }));
  };

  const liStyle =
    "group opacity-50 focus-within:opacity-100 transition-opacity duration-150";

  const inputStyle =
    "outline focus:outline-amber-500 transition-colors relative w-full px-2 py-1 rounded";

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className=""
      >
        <ul className="flex flex-col gap-3">
          <li className={liStyle}>
            <label htmlFor="">
              <h3>Email: </h3>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputStyle}
                disabled={isLoading}
              />
            </label>
          </li>
          <li className="group opacity-50 focus-within:opacity-100 transition-opacity duration-150">
            <label htmlFor="">
              <h3>Password: </h3>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputStyle}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 -translate-y-1/2 right-1 size-5 bg-red-500"
                  disabled={isLoading}
                >
                  {showPassword ? "s" : "ns"}
                </button>
              </div>
            </label>
          </li>
        </ul>

        <button
          className="disabled:opacity-50 mt-4 w-full py-2 bg-orange-500 text-white"
          disabled={!email || !password || isLoading}
        >
          {isLoading ? "Loading..." : "Signin"}
        </button>
      </form>
    </>
  );
};

export default Signin;
