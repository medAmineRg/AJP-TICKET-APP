import classes from "./main-header.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function MainHeader() {
  const router = useRouter();
  const path = router.asPath;
  const { user } = useSelector(state => state.auth);
  return (
    <div
      style={
        user && {
          backgroundColor: "white",
          borderBottom: "2px solid var(--bg-secondary)",
        }
      }
      className={classes.header}
    >
      {!user && (
        <nav>
          <div>AJP-Ticket</div>
          <div className={classes["div-link"]}>
            <li className={path === "/login" ? classes.active : ""}>
              <Link href="/login">Login</Link>
            </li>
            <li className={path === "/signup" ? classes.active : ""}>
              <Link href="/signup">Signup</Link>
            </li>
          </div>
        </nav>
      )}
    </div>
  );
}

export default MainHeader;
