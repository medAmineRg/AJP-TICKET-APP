import classes from "./ticket-form.module.css";

function TicketForm({ ticketInfo, info }) {
  return (
    <>
      <h1>Create a Ticket</h1>
      <hr className={classes.hr}></hr>
      <div className={classes["form-control"]}>
        <label>titre</label>
        <input
          className={classes.input}
          type="text"
          onChange={ticketInfo}
          placeholder="title"
          name="title"
          value={info?.title ? info?.title : ""}
        />
      </div>
      <div className={classes["form-control"]}>
        <label>Description</label>
        <textarea
          onChange={ticketInfo}
          className={classes.input}
          name="description"
          maxLength={250}
          value={info?.description ? info?.description : ""}
        />
      </div>
      <div className={classes["form-control"]}>
        <label>Category</label>
        <select
          name="category"
          className={classes.input}
          onChange={ticketInfo}
          defaultValue={info.category || "select"}
        >
          <option value="select">Select a category</option>
          <option value="Laptop / PC requirement issue">
            Laptop / PC requirement issue
          </option>
          <option value="Laptop / PC software issue">
            Laptop / PC software issue
          </option>
          <option value="Other...">Other...</option>
        </select>
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
