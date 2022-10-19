import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import classes from "./sign-up.module.css";
import { loadUser, login, reset } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import Button from "../ui/button";
import { FiLogIn } from "react-icons/fi";

function LogInCom() {
  const [signupData, setSignupData] = useState({});
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, message } = useSelector(
    state => state.auth
  );

  const { email, password } = signupData;

  useEffect(() => {
    if (localStorage.getItem("user") && !user) {
      dispatch(loadUser(JSON.parse(localStorage.getItem("user"))));
    }

    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      router.replace("/");
    }

    if (isSuccess) {
      toast.success(message);
    }
    return function cleanup() {
      dispatch(reset());
    };
  }, [isError, isSuccess, message, dispatch, user]);

  const onChange = e => {
    setSignupData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const onSubmit = async e => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <>
      <div className={classes.container}>
        <form className={classes.form} onSubmit={onSubmit}>
          <div className={classes.pageInfo}>
            <p>Login</p>
          </div>

          <div className={classes["from-control"]}>
            <label htmlFor="">Email</label>
            <input
              className="input-form"
              type="email"
              placeholder="Email"
              name="email"
              onChange={onChange}
            />
          </div>
          <div className={classes["from-control"]}>
            <label htmlFor="">Password</label>
            <input
              className="input-form"
              type="password"
              placeholder="Password"
              name="password"
              onChange={onChange}
            />
          </div>
          <div className={classes["from-control"]}>
            <Button placeholder="Login"></Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LogInCom;
