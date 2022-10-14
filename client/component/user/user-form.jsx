import { useSelector } from "react-redux";
import classes from "../ticket/ticket-form.module.css";
import Spinner from "../ui/spinner";

function UserForm({ userInfo, idUser, remove }) {
  if (idUser && !remove) {
    const { users, isLoading } = useSelector(state => state.users);
    let { fullName, email, role } = users.find(user => user.id == idUser);
    if (isLoading) return <Spinner />;
    return (
      <>
        <h1>User</h1>
        <hr className={classes.hr}></hr>
        <div className={classes["form-control"]}>
          <label>Fullname</label>
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
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
      </>
    );
  }
  return (
    <>
      <h1>Create a User</h1>
      <hr className={classes.hr}></hr>
      <div className={classes["form-control"]}>
        <label>Fullname</label>
        <input
          className={classes.input}
          type="text"
          onChange={userInfo}
          placeholder="Full Name"
          name="fullName"
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
        <select name="role" className={classes.input} onChange={userInfo}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
    </>
  );
}

export default UserForm;
