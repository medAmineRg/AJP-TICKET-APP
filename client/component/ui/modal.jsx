import React from "react";
import Button from "./button";
import classes from "./modal.module.css";

const Modal = ({ open, children, onClose, submit, setRemove, z, isOwner }) => {
  if (!open) return null;
  console.log(isOwner);
  return (
    <>
      <div style={{ zIndex: z }} className={classes.overlay}></div>
      <div style={{ zIndex: z }} className={classes.modal}>
        {children}
        <div className={classes["footer-btn"]}>
          {setRemove && isOwner && (
            <Button
              bg="#CC3636"
              onClick={() => setRemove(true)}
              placeholder={"Delete"}
            ></Button>
          )}
          <div className={classes["flex-end"]}>
            <Button onClick={onClose} placeholder={"Exit"}></Button>
            {isOwner && (
              <Button onClick={submit} placeholder={"submit"}></Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
