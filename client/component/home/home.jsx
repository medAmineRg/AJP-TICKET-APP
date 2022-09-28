import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../../features/auth/authSlice";
import classes from "./home.module.css";

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
  return (
    <div className={classes.container}>
      <h3>Dashboard</h3>

      <div className={classes.statistics}>
        <Card />
      </div>
    </div>
  );
}
