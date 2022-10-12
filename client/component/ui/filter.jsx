import classes from "../ticket/ticket-form.module.css";
function Filter({ ticketInfo, startDate }) {
  return (
    <>
      <h1>Filter</h1>
      <hr className={classes.hr}></hr>
      <div className={classes["form-control"]}>
        <label>Creator</label>
        <input
          className={classes.input}
          type="text"
          placeholder="search by creator"
          name="creator"
          onChange={ticketInfo}
        />
      </div>

      <div className={classes["form-control"]}>
        <label>status</label>
        <select
          name="status"
          className={classes.input}
          defaultValue={"select"}
          onChange={ticketInfo}
        >
          <option value="select" disabled>
            select
          </option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Postpone">Postpone</option>
        </select>
      </div>
      <div className={classes["form-control"]}>
        <label>Category</label>
        <select
          name="category"
          className={classes.input}
          defaultValue={"select"}
          onChange={ticketInfo}
        >
          <option value="select" disabled>
            select
          </option>
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
        <select
          name="urgent"
          className={classes.input}
          defaultValue={"select"}
          onChange={ticketInfo}
        >
          <option value="select" disabled>
            select
          </option>
          <option value="0">Non</option>
          <option value="1">Yes</option>
        </select>
      </div>

      <div className={classes["form-control"]}>
        <label>From</label>
        <input
          className={classes.input}
          type="date"
          placeholder="start date"
          name="startDate"
          // min={format(new Date(), "yyyy-MM-dd")}
          onChange={ticketInfo}
        />
      </div>
      <div className={classes["form-control"]}>
        <label>To</label>
        <input
          className={classes.input}
          type="date"
          placeholder="end date"
          name="endDate"
          min={startDate}
          onChange={ticketInfo}
        />
      </div>
    </>
  );
}

export default Filter;
