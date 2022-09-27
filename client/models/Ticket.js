import { Schema, model, models } from "mongoose";

const ticketSchema = Schema(
  {
    idUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    problem: {
      type: String,
      required: true,
      minLength: [2, "should contain 2 character at least!"],
      maxLength: [256, "was too long"],
    },
    status: {
      type: String,
      enum: ["Non commencé", "En coups", "Terminé", "Reporté"],
      default: "Non commencé",
    },
    urgent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Ticket = models.Ticket || model("Ticket", ticketSchema);

export default Ticket;
