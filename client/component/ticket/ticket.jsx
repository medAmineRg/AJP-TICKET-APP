import Button from "../ui/button";
import DataTable from "../ui/table";
import classes from "./ticket.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getTicket,
  reset,
  createTicket,
  setPage,
  setPageSize,
  updateTicket,
  deleteTicket,
} from "../../features/ticket/ticketSlice";
import { useEffect, useState } from "react";
import { loadUser } from "../../features/auth/authSlice";
import { useRouter } from "next/router";
import Modal from "../ui/modal";
import TicketForm from "./ticket-form";
import TicketFromShow from "./ticket-from-show";
import { toast } from "react-toastify";

function Ticket() {
  let { ticket, total, page, pageSize, isLoading } = useSelector(
    state => state.ticket
  );
  const { user } = useSelector(state => state.auth);

  const [open, setOpen] = useState(false);
  const [isOwner, setIsOwner] = useState();
  const [remove, setRemove] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [ticketInfo, setTicketInfo] = useState({});

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getTicket({ page, limit: pageSize }))
        .unwrap()
        .then(res => {
          console.log(res.message);
          toast.success(res.message);
        })
        .catch(e => {
          console.log(e);
          toast.error(e.message);
        });
    }

    if (!localStorage.getItem("user")) {
      router.replace("/login");
    }

    if (localStorage.getItem("user") && !user) {
      dispatch(loadUser(JSON.parse(localStorage.getItem("user"))));
    }

    return function cleanup() {
      dispatch(reset());
    };
  }, [dispatch, user, page, pageSize]);

  const onSubmit = async () => {
    dispatch(createTicket(ticketInfo))
      .unwrap()
      .then(res => {
        toast.success(res.message);
        dispatch(getTicket());
        setOpen(false);
      })
      .catch(e => {
        toast.error(e);
      });
  };

  const onUpdate = async () => {
    dispatch(updateTicket({ ...ticketInfo, id: selectedRow }))
      .unwrap()
      .then(res => {
        toast.success("Ticket was updated successfully");
        dispatch(getTicket({ page, limit: pageSize }));
        setTicketInfo({});
        setSelectedRow(null);
      })
      .catch(e => {
        toast.error(e);
      });
  };

  const onDelete = async () => {
    dispatch(deleteTicket(selectedRow))
      .then(res => {
        toast.success("Ticket was deleted successfully");
        setRemove(false);
        setSelectedRow(null);
        dispatch(getTicket({ page, limit: pageSize }));
      })
      .catch(e => {
        toast.error(e);
      });
  };

  const onTicketForm = e => {
    setTicketInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <div className={classes.right}>
        <h3>Tickets</h3>

        <Button
          color="white"
          onClick={() => setOpen(true)}
          placeholder={"Create Ticket"}
        ></Button>
      </div>
      <DataTable
        rows={ticket}
        isLoading={isLoading}
        rowCountState={total}
        page={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        setSelectedRow={setSelectedRow}
      />
      <Modal
        open={remove}
        onClose={() => setRemove(false)}
        z={200}
        submit={onDelete}
        isOwner={isOwner}
      >
        <h4>You sure about removing that record!</h4>
      </Modal>
      <Modal
        open={selectedRow}
        onClose={() => setSelectedRow(null)}
        submit={onUpdate}
        setRemove={setRemove}
        isOwner={isOwner}
      >
        <TicketFromShow
          id={selectedRow}
          ticketInfo={onTicketForm}
          setIsOwner={setIsOwner}
          isOwner={isOwner}
        />
      </Modal>
      <Modal
        submit={onSubmit}
        open={open}
        onClose={() => setOpen(false)}
        isOwner={true}
      >
        <TicketForm ticketInfo={onTicketForm}></TicketForm>
      </Modal>
    </>
  );
}

export default Ticket;
