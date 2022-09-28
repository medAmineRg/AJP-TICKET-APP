import classes from "./card.module.css";
function Card({ text, number }) {
  return (
    <div className={classes.card}>
      <span>{text}</span>
      <h3>{number}</h3>
    </div>
  );
}

export default Card;
