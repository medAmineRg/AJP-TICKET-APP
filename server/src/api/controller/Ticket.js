const {
  customError,
  successResponse,
  sendResponse,
} = require("../helpers/utils");
const Ticket = require("../models/Ticket");
const User = require("../models/User");
const Sequelize = require("sequelize");
const getTickets = async (req, res) => {
  let { limit, page } = req.query;
  if (!limit) {
    limit = 10;
  }
  if (!page) {
    page = 0;
  }
  const total = await Ticket.count();
  const ticket = await Ticket.findAll({
    order: [
      // Will escape title and validate DESC against a list of valid direction parameters
      ["createdAt", "DESC"],
    ],
    offset: parseInt(limit * page),
    limit: parseInt(limit),
    attributes: [
      ["idTicket", "id"],
      "title",
      "description",
      "createdAt",
      "updatedAt",
      "urgent",
      "status",
      "creator",
      [Sequelize.literal('"User"."fullName"'), "User"],
    ],
    include: { model: User, attributes: [] },
  });
  return res.status(200).json({
    message: "Get all tickets successfully",
    ticket,
    total,
  });
};

const getTicketById = async (req, res) => {
  const ticket = await Ticket.findByPk(req.params.id);
  if (!ticket) customError("No Ticket was found", 404);
  return res
    .status(200)
    .json({ message: "Ticket was found successfully", ticket });
};

const createTicket = async (req, res) => {
  const { title, description, urgent } = req.body;

  if (!title || !description)
    customError("You must provide (title and description)", 400);
  const ticket = await Ticket.create({
    creator: req.user.idUser,
    title,
    description,
    urgent,
  });
  return res.status(201).send({
    message: "Ticket was created successfully",
    ticket,
  });
};

const updateTicket = async (req, res) => {
  const ticket = await Ticket.findByPk(req.params.id);
  if (!ticket) customError("No Ticket was found", 404);
  let { title, status, description, urgent } = req.body;

  if (!title && !status && !description && !urgent)
    customError("You did not change anything!", 400);

  console.log(title, status, description, urgent);
  if (title) ticket.title = title;
  if (status) ticket.status = status;
  if (description) ticket.description = description;
  if (urgent) ticket.urgent = urgent;

  await ticket.save();
  return res.status(204).send();
};

const deleteTicket = async (req, res) => {
  const ticket = await Ticket.destroy({ where: { idTicket: req.params.id } });

  if (!ticket) customError("No Ticket was found", 404);
  return res.status(204).send();
};

module.exports = {
  getTickets,
  createTicket,
  getTicketById,
  updateTicket,
  deleteTicket,
};
