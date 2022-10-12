import classes from "./button.module.css";
function Button({ placeholder, onClick, color, bg, classN }) {
  return (
    <button
      style={{ color, backgroundColor: bg }}
      onClick={onClick}
      className={classN ? classes[classN] : classes.btn}
    >
      {placeholder}
    </button>
  );
}

export default Button;
