import classes from "./ticket-form.module.css";
function TicketForm({ ticketInfo }) {
  return (
    <>
      <div className={classes["form-control"]}>
        <label>titre</label>
        <input
          className={classes.input}
          type="text"
          onChange={ticketInfo}
          placeholder="titre"
          name="title"
        />
      </div>
      <div className={classes["form-control"]}>
        <label>Description</label>
        <textarea
          onChange={ticketInfo}
          className={classes.input}
          name="description"
          maxLength={255}
          rows={30}
        />
      </div>
      <div className={classes["form-control"]}>
        <label>Urgent</label>
        <select name="urgent" className={classes.input} onChange={ticketInfo}>
          <option value="0">Non</option>
          <option value="1">Yes</option>
        </select>
      </div>
    </>
  );
}

export default TicketForm;
