import classes from "./spinner.module.css";

function Spinner() {
  return (
    <div className={classes.spinner}>
      Loading
      <div className={classes.primary}></div>
      <div className={classes.secondary}></div>
    </div>
  );
}

export default Spinner;
