import classes from "./profile.module.css";
import { FaUser } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { FaUserCog } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { loadUser } from "../../features/auth/authSlice";
import { useEffect } from "react";
import Button from "../ui/button";
import UserEdit from "./user-edit";
import Modal from "../ui/modal";
import { useState } from "react";
import { updateUser } from "../../features/user/userSlice";
import { toast } from "react-toastify";
import Spinner from "../ui/spinner";

function Profile() {
  const [userInfo, setUserInfo] = useState({});
  const [open, setOpen] = useState(false);
  const { user, isLoading } = useSelector(state => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      typeof localStorage.getItem("user") == "object" ||
      !localStorage.getItem("user")
    ) {
      router.replace("/login");
    }

    if (localStorage.getItem("user") && !user) {
      dispatch(loadUser(JSON.parse(localStorage.getItem("user"))));
    }
  }, [dispatch, user, router]);

  const onUpdate = async () => {
    dispatch(updateUser({ ...userInfo, id: user.idUser }))
      .unwrap()
      .then(res => {
        const localUser = JSON.parse(localStorage.getItem("user"));
        if (userInfo.email) localUser.email = userInfo.email;
        if (userInfo.fullName) localUser.fullName = userInfo.fullName;
        localStorage.setItem("user", JSON.stringify(localUser));
        toast.success("Updated successfully");
        setUserInfo({});
        router.reload();
      })
      .catch(e => {
        toast.error(e);
      });
  };

  const onUserForm = e => {
    setUserInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (isLoading) return <Spinner />;
  return (
    <>
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
          <Button
            onClick={() => setOpen(true)}
            color={"white"}
            placeholder={"Edit"}
          />
        </div>
      </div>
      <Modal
        height={"65%"}
        submit={onUpdate}
        open={open}
        onClose={() => setOpen(false)}
        isOwner={true}
      >
        <UserEdit userInfo={onUserForm}></UserEdit>
      </Modal>
    </>
  );
}

export default Profile;
