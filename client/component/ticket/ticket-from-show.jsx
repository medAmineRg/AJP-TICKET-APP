import { useEffect } from "react";
import { useSelector } from "react-redux";
import classes from "./ticket-form.module.css";

function TicketFromShow({ id, ticketInfo, setIsOwner, isOwner, info }) {
  const { ticket } = useSelector(state => state.ticket);
  const { user } = useSelector(state => state.auth);

  const {
    User,
    title,
    description,
    urgent,
    status,
    creator,
    category,
    solution,
  } = ticket.find(ticket => ticket.id == id);
  useEffect(() => {
    setIsOwner(user.idUser === creator);
    if (user.role === "Admin") {
      setIsOwner(true);
    }
  }, []);
  return (
    <>
      <div className={classes["form-control"]}>
        <label>Creator</label>
        <input
          className={classes.input}
          type="text"
          onChange={ticketInfo}
          placeholder="Creator"
          name="creator"
          disabled
          value={User}
        />
      </div>
      <div className={classes["form-control"]}>
        <label>Title</label>
        <input
          className={classes.input}
          type="text"
          onChange={ticketInfo}
          placeholder="titre"
          name="title"
          defaultValue={title}
          disabled={!isOwner}
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
          defaultValue={description}
          disabled={!isOwner}
        />
      </div>
      <div className={classes["form-control"]}>
        <label>Urgent</label>
        <select
          name="urgent"
          className={classes.input}
          onChange={ticketInfo}
          defaultValue={urgent ? "1" : "0"}
          disabled={!isOwner}
        >
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>
      <div className={classes["form-control"]}>
        <label>Category</label>
        <select
          name="category"
          className={classes.input}
          onChange={ticketInfo}
          disabled={!isOwner}
          defaultValue={info.category || category}
        >
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
        <label>status</label>
        <select
          name="status"
          className={classes.input}
          onChange={ticketInfo}
          defaultValue={info.status || status}
          disabled={user.role !== "Admin"}
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Postpone">Postpone</option>
        </select>
      </div>
      {(status === "Completed" || info.status === "Completed") && (
        <div className={classes["form-control"]}>
          <label>Solution</label>
          <textarea
            onChange={ticketInfo}
            className={classes.input}
            name="solution"
            maxLength={255}
            rows={30}
            defaultValue={
              solution ===
              (!info.solution &&
                "The Admin will try to find a solution for the issue as soon as possible.")
                ? ""
                : info.solution || solution
            }
            disabled={user.role !== "Admin"}
          />
        </div>
      )}
    </>
  );
}

export default TicketFromShow;
