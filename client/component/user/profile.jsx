import classes from "./profile.module.css";
import { FaUser } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { FaUserCog } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { loadUser } from "../../features/auth/authSlice";
import { useEffect } from "react";

function Profile() {
  const { user } = useSelector(state => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      router.replace("/login");
    }

    if (localStorage.getItem("user") && !user) {
      dispatch(loadUser(JSON.parse(localStorage.getItem("user"))));
    }
  }, [dispatch, user, router]);

  return (
    <div className={classes.container}>
      <div className={classes.profile}>
        <div className={classes.user}>
          <FaUser></FaUser>
        </div>
        <div className={classes.info}>
          <h3>{user && user.fullName}</h3>
          <div>
            <AiOutlineMail></AiOutlineMail>
            <span style={{ marginLeft: ".1rem" }}>{user && user.email}</span>
          </div>
          <div>
            <FaUserCog></FaUserCog>
            <span style={{ marginLeft: ".1rem" }}>{user && user.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
