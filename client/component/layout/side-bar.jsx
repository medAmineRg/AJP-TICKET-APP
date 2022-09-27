import Link from "next/link";
import classes from "./side-bar.module.css";
import {
  FaTicketAlt,
  FaChartBar,
  FaUserCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
function SideBar() {
  const dispatch = useDispatch();
  return (
    <div className={classes["side-bar"]}>
      <ul className={classes["side-bar__items"]}>
        <li className={classes["side-bar__item"]}>
          <Link href="/">
            <a className={classes["side-bar__link"]}>
              <span>Dashboard</span>
              <AiOutlineDashboard></AiOutlineDashboard>
            </a>
          </Link>
        </li>
        <li className={classes["side-bar__item"]}>
          <Link href="/ticket">
            <a className={classes["side-bar__link"]}>
              <span>Ticket</span>
              <FaTicketAlt></FaTicketAlt>
            </a>
          </Link>
        </li>
        <li className={classes["side-bar__item"]}>
          <Link href="#">
            <a className={classes["side-bar__link"]}>
              <span>Chart</span>
              <FaChartBar></FaChartBar>
            </a>
          </Link>
        </li>
        <li className={classes["side-bar__item"]}>
          <Link href="#">
            <a className={classes["side-bar__link"]}>
              <span>Profile</span>
              <FaUserCog></FaUserCog>
            </a>
          </Link>
        </li>
        <li
          className={classes["side-bar__item"]}
          onClick={() => {
            dispatch(logout());
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
