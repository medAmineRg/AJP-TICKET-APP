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
  filterTicket,
} from "../../features/ticket/ticketSlice";
import { useEffect, useState } from "react";
import { loadUser } from "../../features/auth/authSlice";
import { useRouter } from "next/router";
import Modal from "../ui/modal";
import TicketForm from "./ticket-form";
import TicketFromShow from "./ticket-from-show";
import { toast } from "react-toastify";
import { ticketColumns } from "../../utils/utils";
import Spinner from "../ui/spinner";
import Filter from "../ui/filter";
import { DataGrid } from "@mui/x-data-grid";

let firstRender = true;

function Ticket() {
  let { ticket, total, page, pageSize, isLoading, filtering } = useSelector(
    state => state.ticket
  );
  const { user } = useSelector(state => state.auth);

  const [open, setOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [isOwner, setIsOwner] = useState();
  const [remove, setRemove] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [ticketInfo, setTicketInfo] = useState({});

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      typeof localStorage.getItem("user") == "object" ||
      !localStorage.getItem("user")
    ) {
      router.replace("/login");
    }

    if (localStorage.getItem("user") && !user) {
      dispatch(loadUser(JSON.parse(localStorage.getItem("user"))));
    }
    firstRender = false;
    return function cleanup() {
      dispatch(reset());
    };
  }, [dispatch, user, router]);

  useEffect(() => {
    if (user) {
      dispatch(getTicket({ page, limit: pageSize }))
        .unwrap()
        .then(res => {
          toast.success(res.message);
        })
        .catch(e => {
          toast.error(e.message);
        });
    }
    return function cleanup() {
      dispatch(reset());
    };
  }, [user, page, pageSize]);

  const onSubmit = async () => {
    dispatch(createTicket(ticketInfo))
      .unwrap()
      .then(res => {
        toast.success(res.message);
        dispatch(getTicket());
        setTicketInfo({});
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
      .unwrap()
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

  if (firstRender || isLoading) return <Spinner />;
  return (
    <>
      <div className={classes.right}>
        <h3>Tickets</h3>

        <div className={classes.end}>
          <Button
            classN={"btn"}
            color="white"
            onClick={() => setOpen(true)}
            placeholder={"Create Ticket"}
          ></Button>
          <Button
            classN={"btn"}
            color="white"
            onClick={() => setShowFilter(true)}
            placeholder={"Filter"}
          ></Button>
        </div>
      </div>
      {filtering ? (
        <DataGrid
          autoHeight
          rowsPerPageOptions={[10]}
          columns={ticketColumns}
          pageSize={10}
          rows={ticket}
          onSelectionModelChange={item => {
            setSelectedRow(item[0]);
          }}
        />
      ) : (
        <DataTable
          rows={ticket}
          isLoading={isLoading}
          rowCountState={total}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
          setSelectedRow={setSelectedRow}
          columns={ticketColumns}
        />
      )}
      <Modal
        height={"18%"}
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
          info={ticketInfo}
          setIsOwner={setIsOwner}
          isOwner={isOwner}
        />
      </Modal>
      <Modal
        height={"80%"}
        submit={onSubmit}
        open={open}
        onClose={() => setOpen(false)}
        isOwner={true}
      >
        <TicketForm ticketInfo={onTicketForm} info={ticketInfo}></TicketForm>
      </Modal>

      <Modal
        submit={() => {
          const { creator, status, category, startDate, endDate, urgent } =
            ticketInfo;
          if (
            !creator &&
            !status &&
            !category &&
            !startDate &&
            !endDate &&
            !urgent
          ) {
            return toast.warning("Please you must provide a field at least!");
          }
          dispatch(filterTicket(ticketInfo))
            .unwrap()
            .then(res => {
              toast.success(res.message);
              setShowFilter(false);
            })
            .catch(e => {
              toast.error(e);
            });
          setTicketInfo({});
        }}
        open={showFilter}
        onClose={() => setShowFilter(false)}
        isOwner={true}
        btnTxt="Filter"
      >
        <Filter
          ticketInfo={onTicketForm}
          startDate={ticketInfo.startDate}
        ></Filter>
      </Modal>
    </>
  );
}

export default Ticket;
