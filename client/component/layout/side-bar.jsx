import Link from "next/link";
import classes from "./side-bar.module.css";
import { FaTicketAlt, FaUserCog, FaSignOutAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdDoubleArrow } from "react-icons/md";
import { AiOutlineDashboard } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
function SideBar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const path = router.asPath;
  return (
    <div className={classes["side-bar"]}>
      <ul className={classes["side-bar__items"]}>
        <li className={classes.logo}>
          <a className={classes["side-bar__link"]}>
            <span className={classes["logo-text"]}>AJP-TICKET</span>
            <MdDoubleArrow></MdDoubleArrow>
          </a>
        </li>
        <li
          style={{ backgroundColor: path === "/" && "#f2972e" }}
          className={classes["side-bar__item"]}
        >
          <Link href="/">
            <a className={classes["side-bar__link"]}>
              <span>Dashboard</span>
              <AiOutlineDashboard></AiOutlineDashboard>
            </a>
          </Link>
        </li>
        <li
          style={{ backgroundColor: path === "/ticket" && "#f2972e" }}
          className={classes["side-bar__item"]}
        >
          <Link href="/ticket">
            <a className={classes["side-bar__link"]}>
              <span>Ticket</span>
              <FaTicketAlt></FaTicketAlt>
            </a>
          </Link>
        </li>
        {user.role === "Admin" && (
          <li
            style={{ backgroundColor: path === "/user" && "#f2972e" }}
            className={classes["side-bar__item"]}
          >
            <Link href="/user">
              <a className={classes["side-bar__link"]}>
                <span>User</span>
                <FaUserCog></FaUserCog>
              </a>
            </Link>
          </li>
        )}
        <li
          style={{ backgroundColor: path === "/user/profile" && "#f2972e" }}
          className={classes["side-bar__item"]}
        >
          <Link href="/user/profile">
            <a className={classes["side-bar__link"]}>
              <span>Profile</span>
              <CgProfile></CgProfile>
            </a>
          </Link>
        </li>
        <li
          className={classes["side-bar__item"]}
          onClick={() => {
            dispatch(logout());
            toast.success("Logged Out successfully");
          }}
        >
          <a className={classes["side-bar__link"]}>
            <span>Logout</span>
            <FaSignOutAlt></FaSignOutAlt>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
