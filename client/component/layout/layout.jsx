import Footer from "./footer";
import MainHeader from "./main-header";
import { useSelector } from "react-redux";
import SideBar from "./side-bar";
import classes from "./layout.module.css";
function Layout({ children }) {
  const { user } = useSelector(state => state.auth);
  return (
    <div className={user ? classes.app : classes.auth}>
      <MainHeader />
      <div className={user && classes.main}>{children}</div>
      {user && <SideBar />}
      <Footer />
    </div>
  );
}

export default Layout;
