import classes from "./card.module.css";
function Card({ text, number }) {
  return (
    <div className={classes.card}>
      <div className={classes.stc}>
        <p>{text}</p>
        <h3>{number}</h3>
      </div>
    </div>
  );
}

export default Card;
