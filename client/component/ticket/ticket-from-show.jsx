import { useEffect } from "react";
import { useSelector } from "react-redux";
import classes from "./ticket-form.module.css";

function TicketFromShow({ id, ticketInfo, setIsOwner, isOwner }) {
  const { ticket } = useSelector(state => state.ticket);
  const { user } = useSelector(state => state.auth);

  const { User, title, description, urgent, status, creator } = ticket.find(
    ticket => ticket.id == id
  );
  useEffect(() => {
    setIsOwner(user.idUser === creator);
    if (user.role === "Admin") {
      setIsOwner(true);
    }
  }, [setIsOwner]);
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
          defaultValue={urgent}
          disabled={!isOwner}
        >
          <option value="0">Non</option>
          <option value="1">Yes</option>
        </select>
      </div>

      <div
        className={classes["form-control"]}
        style={{ display: user.role !== "Admin" && "none" }}
      >
        <label>status</label>
        <select
          name="status"
          className={classes.input}
          onChange={ticketInfo}
          defaultValue={status}
          disabled={!isOwner}
        >
          <option value="Non commencé">Non commencé</option>
          <option value="En cours">En cours</option>
          <option value="Terminé">Terminé</option>
          <option value="Reporté">Reporté</option>
        </select>
      </div>
    </>
  );
}

export default TicketFromShow;
