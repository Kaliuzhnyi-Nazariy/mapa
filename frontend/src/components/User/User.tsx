import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { signout } from "../../features/tanstackQuery/requests";
import { useAppDispatch } from "../../redux/dispatch";
import { logOut } from "../../redux/user/slice";
import { deleteAllMarkers, getMarkers } from "../../redux/marker/request";
import Header from "./Header";
import { useEffect } from "react";
import { getMe } from "../../redux/user/userRequests";
import { useSelector } from "react-redux";
import { userEmail, username } from "../../redux/user/selectors";
import { deleteUser } from "../../features/user/request";
// import { removeAllMarkersFromMap } from "../Map/useMap";

const User = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const name = useSelector(username);
  const email = useSelector(userEmail);

  const updateRediect = () => navigate("/user/update");
  const updatePasswordRediect = () => navigate("/user/password");

  const buttonStyle = `text-start border rounded-md border-orange-500 p-2 hover:bg-orange-500/50 hover:text-white hover:cursor-pointer transition-all `;

  const { mutate, isPending } = useMutation({
    mutationFn: signout,
    onSuccess() {
      dispatch(logOut());
      navigate("/");
    },
    onError: (error) => {
      console.error("Signout failed:", error);
    },
  });

  const { mutate: clearData, isPending: isDeleting } = useMutation({
    mutationFn: deleteAllMarkers,
    async onSuccess() {
      // removeAllMarkersFromMap();
      await dispatch(getMarkers());
      navigate("/user");
    },
    onError: (error) => {
      console.error("Signout failed:", error);
    },
  });

  const { mutate: deleteAccount, isPending: deletingAccount } = useMutation({
    mutationFn: deleteUser,
    onSuccess() {
      // removeAllMarkersFromMap();
      dispatch(logOut());

      navigate("/");
    },
    onError: (error) => {
      console.error("delete error:", error);
    },
  });

  if (isPending || isDeleting || deletingAccount) {
    return (
      <div className="grow flex items-ceter justify-center">
        <p>Loading</p>
      </div>
    );
  }

  return (
    <div className="grow">
      <Header link="/map" title="Mapa" />

      <div className="mt-4 flex flex-col gap-2 mx-5 ">
        <h3 className="font-bold">User data</h3>

        <div className="flex flex-col">
          <h4 className="font-semibold">Name: </h4>
          <p>{name}</p>
        </div>

        <div className="flex flex-col">
          <h4 className="font-semibold">Email: </h4>
          <p>{email}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 mx-5 ">
        <h3 className="font-bold">Account operations</h3>
        <button className={buttonStyle} onClick={() => updateRediect()}>
          Update user data
        </button>

        <button className={buttonStyle} onClick={() => updatePasswordRediect()}>
          Update user password
        </button>

        <button className={buttonStyle} onClick={() => mutate()}>
          logout
        </button>

        <h3 className="font-bold">Danger zone</h3>
        <button className={buttonStyle} onClick={() => clearData()}>
          Clear data
        </button>

        <button className={buttonStyle} onClick={() => deleteAccount()}>
          Delete account
        </button>
      </div>
    </div>
  );
};

export default User;
