import { useState } from "react";
import { useAppDispatch } from "../../redux/dispatch";
import { signup } from "../../redux/user/authRequests";
import { useSelector } from "react-redux";
import { userLoading, username } from "../../redux/user/selectors";
import { customToast } from "../../toasts/toast";
import { Eye, EyeClosed } from "lucide-react";
import type { ReturnUser } from "../../redux/user/userTypes";

const Signup = () => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const isLoading = useSelector(userLoading);

  const user = useSelector(username);

  const onSubmit = async () => {
    if (!name || !email || !password) return;

    const res = await dispatch(signup({ name, email, password }));

    if (res.meta.requestStatus == "fulfilled") {
      customToast("suc", `Welcome, ${user}!`);
    } else if (res.meta.requestStatus == "rejected") {
      const resData: ReturnUser | { message: string } | undefined = res.payload;

      if (resData && "message" in resData) {
        customToast("err", resData.message);
      } else {
        customToast("err", "Unexpected error");
      }
    }
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
              <h3>Name:</h3>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputStyle}
                disabled={isLoading}
              />
            </label>
          </li>
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
                  className="absolute top-1/2 -translate-y-1/2 right-1 size-5"
                  disabled={isLoading}
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </button>
              </div>
            </label>
          </li>
        </ul>

        <button
          className="disabled:opacity-50 mt-4 w-full py-2 bg-orange-500 text-white"
          disabled={!name || !email || !password || isLoading}
        >
          {isLoading ? "Loading..." : "Signup"}
        </button>
      </form>
    </>
  );
};

export default Signup;
