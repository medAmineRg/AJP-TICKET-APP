import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadUser, logout } from "../../features/auth/authSlice";

export default function HomeCom() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector(state => state.auth);
  useEffect(
    function () {
      if (localStorage.getItem("user") !== null && !user) {
        dispatch(loadUser(JSON.parse(localStorage.getItem("user"))));
      }
      if (!user) {
        router.replace("/login");
      }
    },
    [dispatch, user, router]
  );
  return <span>Dashboard</span>;
}
