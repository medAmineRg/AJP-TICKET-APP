import { useSelector } from "react-redux";
import classes from "../ticket/ticket-form.module.css";

function UserEdit({ userInfo }) {
  const { user } = useSelector(state => state.auth);
  const { fullName, email, role } = user;
  return (
    <>
      <div className={classes["form-control"]}>
        <label>fullName</label>
        <input
          className={classes.input}
          type="text"
          onChange={userInfo}
          placeholder="Full Name"
          name="fullName"
          defaultValue={fullName}
        />
      </div>
      <div className={classes["form-control"]}>
        <label>Email</label>
        <input
          onChange={userInfo}
          className={classes.input}
          name="email"
          type="email"
          placeholder="Email"
          defaultValue={email}
        />
      </div>
      <div className={classes["form-control"]}>
        <label>Password</label>
        <input
          onChange={userInfo}
          className={classes.input}
          name="password"
          type="password"
          placeholder="Password"
        />
      </div>
      <div className={classes["form-control"]}>
        <label>Role</label>
        <select
          name="role"
          className={classes.input}
          onChange={userInfo}
          defaultValue={role}
          disabled
        >
          <option value="Admin">Admin</option>
        </select>
      </div>
    </>
  );
}

export default UserEdit;
