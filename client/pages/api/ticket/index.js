import connectDB from "../../../middleware/connectDB";
import Ticket from "../../../models/Ticket";
import { successResponse } from "../../../utils/utils";

export default connectDB(async function handler(req, res) {
  if (req.method === "GET") {
    const ticket = await Ticket.find({});
    return res
      .status(200)
      .send(
        successResponse("/ticket", 200, "Ticket loaded successfully", ticket)
      );
  }
  if (req.method === "POST") {
    const { idUser, problem, status } = req.body;
    const ticket = await Ticket.create({ idUser, problem, status });
    return res
      .status(201)
      .send(
        successResponse("/ticket", 201, "Ticket saved successfully", ticket)
      );
  }
});
