import { useState, useEffect } from "react";
import classes from "./sign-up.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, reset, signup } from "../../features/auth/authSlice";

function SignUpCom() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    state => state.auth
  );
  const [signupData, setSignupData] = useState({});

  useEffect(() => {
    if (localStorage.getItem("user") && !user) {
      dispatch(loadUser(JSON.parse(localStorage.getItem("user"))));
    }

    if (isError) {
      console.log(message);
    }

    if (isSuccess || user) {
      router.replace("/");
    }

    return function cleanup() {
      dispatch(reset());
    };
  }, [user, isError, isSuccess, message, dispatch, router]);

  const onChange = e => {
    setSignupData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const onSubmit = async e => {
    e.preventDefault();
    if (signupData.password !== signupData.password2)
      return console.log(
        signupData.password,
        signupData.password2,
        "password doesn't match"
      );

    try {
      dispatch(signup(signupData));
    } catch (error) {
      console.log(error);
    }
  };
  // if (loading) return <h1>Loading...</h1>;

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={onSubmit}>
        <div className={classes["from-control"]}>
          <label>Email</label>
          <input
            className="input-form"
            type="email"
            placeholder="Email"
            name="email"
            onChange={onChange}
          />
        </div>
        <div className={classes["from-control"]}>
          <label>Full Name</label>
          <input
            className="input-form"
            type="text"
            placeholder="Full Name"
            name="fullName"
            onChange={onChange}
          />
        </div>
        <div className={classes["from-control"]}>
          <label>Password</label>
          <input
            className="input-form"
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChange}
          />
        </div>
        <div className={classes["from-control"]}>
          <label>Password</label>
          <input
            className="input-form"
            type="password"
            placeholder="Confirm Password"
            name="password2"
            onChange={onChange}
          />
        </div>
        <div className={classes["from-control"]}>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default SignUpCom;
