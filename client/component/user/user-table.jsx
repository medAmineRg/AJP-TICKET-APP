import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loadUser } from "../../features/auth/authSlice";
import {
  createUser,
  deleteUser,
  getUsers,
  reset,
  setPage,
  setPageSize,
  updateUser,
} from "../../features/user/userSlice";
import { userColumns } from "../../utils/utils";
import classes from "../ticket/ticket.module.css";
import Button from "../ui/button";
import Modal from "../ui/modal";
import DataTable from "../ui/table";
import UserForm from "./user-form";

function UserTable() {
  const router = useRouter();

  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [remove, setRemove] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const dispatch = useDispatch();
  const { users, isLoading, total, page, pageSize } = useSelector(
    state => state.users
  );
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (user && user.role === "User") {
      router.replace("/");
    }

    if (
      typeof localStorage.getItem("user") == "object" ||
      !localStorage.getItem("user")
    ) {
      router.replace("/login");
    }

    if (localStorage.getItem("user") && !user) {
      dispatch(loadUser(JSON.parse(localStorage.getItem("user"))));
    }

    if (user && user.role == "Admin") {
      dispatch(getUsers({ page, limit: pageSize }))
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
    return function cleanup() {
      dispatch(reset());
    };
  }, [dispatch, user, page, pageSize, router]);

  const onSubmit = async () => {
    dispatch(createUser(userInfo))
      .unwrap()
      .then(res => {
        toast.success(res.message);
        dispatch(getUsers({ page, limit: pageSize }));
        setOpen(false);
      })
      .catch(e => {
        toast.error(e);
      });
  };

  const onUpdate = async () => {
    dispatch(updateUser({ ...userInfo, id: selectedRow }))
      .unwrap()
      .then(res => {
        toast.success("User was updated successfully");
        dispatch(getUsers({ page, limit: pageSize }));
        setUserInfo({});
        setSelectedRow(null);
      })
      .catch(e => {
        toast.error(e);
      });
  };

  const onDelete = async () => {
    dispatch(deleteUser(selectedRow))
      .then(res => {
        toast.success("User was deleted successfully");
        setSelectedRow(prev => null);
        setRemove(prev => !prev);
        dispatch(getUsers({ page, limit: pageSize }));
      })
      .catch(e => {
        toast.error(e);
      });
  };
  const onUserForm = e => {
    setUserInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <div className={classes.right}>
        <h3>Users</h3>

        <Button
          color="white"
          onClick={() => setOpen(true)}
          placeholder={"Create User"}
        ></Button>
      </div>
      <DataTable
        rows={users}
        isLoading={isLoading}
        rowCountState={total}
        page={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        setSelectedRow={setSelectedRow}
        columns={userColumns}
      />

      <Modal
        open={selectedRow}
        onClose={() => setSelectedRow(null)}
        submit={onUpdate}
        setRemove={setRemove}
        isOwner={true}
      >
        <UserForm idUser={selectedRow} userInfo={onUserForm} remove={remove} />
      </Modal>
      <Modal
        submit={onSubmit}
        open={open}
        onClose={() => setOpen(false)}
        isOwner={true}
      >
        <UserForm userInfo={onUserForm} />
      </Modal>

      <Modal
        open={remove}
        onClose={() => setRemove(false)}
        z={200}
        submit={onDelete}
        isOwner={true}
      >
        <h4>You sure about removing that record!</h4>
      </Modal>
    </>
  );
}

export default UserTable;
