import classes from "./button.module.css";
function Button({ placeholder, onClick, color, bg }) {
  return (
    <button
      style={{ color, backgroundColor: bg }}
      onClick={onClick}
      className={classes.btn}
    >
      {placeholder}
    </button>
  );
}

export default Button;
