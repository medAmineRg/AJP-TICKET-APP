const express = require("express");
const {
  getTickets,
  createTicket,
  getTicketById,
  updateTicket,
  deleteTicket,
} = require("../controller/Ticket");
const { auth } = require("../middleware/auth");
const errorHandler = require("../middleware/errorHandler");
const router = express.Router();

router.get("/ticket", auth, errorHandler(getTickets));
router.get("/ticket/:id", auth, errorHandler(getTicketById));
router.patch("/ticket/:id", auth, errorHandler(updateTicket));
router.delete("/ticket/:id", auth, errorHandler(deleteTicket));
router.post("/ticket", auth, errorHandler(createTicket));

module.exports = router;
