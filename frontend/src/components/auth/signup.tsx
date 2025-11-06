import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/dispatch";
import {
  signin,
  signout,
  // signup
} from "../../redux/user/authRequests";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(signout());
  }, []);

  const onSubmit = () => {
    console.log({ name, email, password });
    alert(`${name}, ${email}, ${password}`);
    // dispatch(signup({ name, email, password }));
    dispatch(signin({ email, password }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <h1>Signup</h1>

      <ul className="" style={{ listStyle: "none" }}>
        <li>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </li>
        <li>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </li>
        <li>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </li>
      </ul>

      <button>Signup</button>
    </form>
  );
};

export default Signup;
