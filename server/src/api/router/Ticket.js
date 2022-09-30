const express = require("express");
const {
  getTickets,
  createTicket,
  getTicketById,
  updateTicket,
  deleteTicket,
  statistics,
} = require("../controller/Ticket");
const { auth, authorization } = require("../middleware/auth");
const errorHandler = require("../middleware/errorHandler");
const Ticket = require("../models/Ticket");
const router = express.Router();

router.get("/ticket", auth, errorHandler(getTickets));
router.get("/ticket/statistics", errorHandler(statistics));
router.get("/ticket/:id", auth, errorHandler(getTicketById));
router.patch("/ticket/:id", auth, errorHandler(updateTicket));
router.delete("/ticket/:id", auth, errorHandler(deleteTicket));
router.post("/ticket", auth, errorHandler(createTicket));

module.exports = router;
