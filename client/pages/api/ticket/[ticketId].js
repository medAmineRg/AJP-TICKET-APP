import connectDB from "../../../middleware/connectDB";
import Ticket from "../../../models/Ticket";
import { customError, sendResponse } from "../../../utils/utils";

export default connectDB(async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const ticket = await Ticket.findById(req.query.ticketId);
      if (!ticket) customError("No Ticket was found", 404);
      return res
        .status(200)
        .send(sendResponse("Ticket loaded successfully", 200, ticket));
    } catch (error) {
      res
        .status(error.code || 500)
        .send(
          sendResponse(
            error.message || "Something went wrong",
            error.code || 500
          )
        );
    }
  }

  if (req.method === "PATCH") {
    try {
      const ticket = await Ticket.findById(req.query.ticketId);
      if (!ticket) customError("No Ticket was found", 404);
      let { problem, status, urgent } = req.body;
      if (problem) ticket.problem = problem;
      if (status) ticket.status = status;
      if (urgent) ticket.urgent = urgent;
      await ticket.save();
      return res
        .status(200)
        .send(sendResponse("Ticket updated successfully", 200, ticket));
    } catch (error) {
      console.log(error);
      return res
        .status(error.code || 500)
        .send(
          sendResponse(
            error.message || "Something went wrong",
            error.code || 500
          )
        );
    }
  }

  if (req.method === "DELETE") {
    try {
      const ticket = await Ticket.findByIdAndRemove(req.query.ticketId).select(
        "_id"
      );
      if (!ticket) customError("No Ticket was found", 404);
      return res
        .status(200)
        .send(sendResponse("Ticket deleted successfully", 200, ticket));
    } catch (error) {
      console.log(error);
      return res
        .status(error.code || 500)
        .send(
          sendResponse(
            error.message || "Something went wrong",
            error.code || 500
          )
        );
    }
  }
});
