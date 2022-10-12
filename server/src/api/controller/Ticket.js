const { customError } = require("../helpers/utils");
const Ticket = require("../models/Ticket");
const User = require("../models/User");
const Sequelize = require("sequelize");
const sequelize = require("../../config/db");
const { Op } = require("sequelize");
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
      "solution",
      "category",
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
  const { title, description, urgent, category } = req.body;

  if (!title || !description || !category)
    customError(
      "You must provide all field (title, description and the category)",
      400
    );
  const ticket = await Ticket.create({
    creator: req.user.idUser,
    title,
    description,
    urgent,
    category,
  });
  return res.status(201).send({
    message: "Ticket was created successfully",
    ticket,
  });
};

const updateTicket = async (req, res) => {
  const ticket = await Ticket.findByPk(req.params.id);
  if (!ticket) customError("No Ticket was found", 404);
  if (req.user.idUser !== ticket.creator && req.user.role !== "Admin")
    customError("You do not have permission to do that", 403);
  let { title, status, description, urgent, solution, category } = req.body;

  if (!title && !status && !description && !urgent && !solution && !category)
    customError("You did not change anything!", 400);

  if ((status === "Completed" && !solution) || (!status && solution))
    customError("You have to provide both the solution and the status", 400);

  if (title) ticket.title = title;
  if (status) ticket.status = status;
  if (description) ticket.description = description;
  if (urgent) ticket.urgent = urgent;
  if (solution) ticket.solution = solution;
  if (category) ticket.category = category;

  await ticket.save();
  return res.status(204).send();
};

const deleteTicket = async (req, res) => {
  const ticket = await Ticket.findByPk(req.params.id);
  if (req.user.idUser !== ticket.creator && req.user.role !== "Admin")
    customError("You do not have permission to do that", 403);

  if (!ticket) customError("No Ticket was found", 404);
  await ticket.destroy();
  return res.status(204).send();
};

const statistics = async (req, res) => {
  const totalTickets = await Ticket.findAll({
    raw: true,
    attributes: [
      [Sequelize.fn("COUNT", Sequelize.col("idTicket")), "totalTickets"],
    ],
  });

  const completedTickets = await Ticket.findAll({
    raw: true,
    where: {
      status: "Completed",
    },
    attributes: [
      [Sequelize.fn("COUNT", Sequelize.col("idTicket")), "completedTickets"],
    ],
  });

  const notStartedTickets = await Ticket.findAll({
    raw: true,
    where: {
      status: "Not Started",
    },
    attributes: [
      [Sequelize.fn("COUNT", Sequelize.col("idTicket")), "notStartedTickets"],
    ],
  });

  const pendingTickets = await Ticket.findAll({
    raw: true,
    where: {
      status: "In Progress",
    },
    attributes: [
      [Sequelize.fn("COUNT", Sequelize.col("idTicket")), "pendingTickets"],
    ],
  });

  const ticketsByMonths = await sequelize.query(
    `SELECT DATENAME(month, createdAt) as month, count(createdAt) as tickets FROM ${process.env.MSSQL_DB}.[dbo].[ticket] where DATENAME(year, createdAt) = DATENAME(year, GETDATE()) group by DATENAME(month, createdAt)`,
    { type: Sequelize.QueryTypes }
  );
  return res.status(200).send({
    notStartedTickets: notStartedTickets[0].notStartedTickets,
    pendingTickets: pendingTickets[0].pendingTickets,
    totalTickets: totalTickets[0].totalTickets,
    completedTickets: completedTickets[0].completedTickets,
    ticketsByMonths: ticketsByMonths,
  });
};

const filter = async (req, res) => {
  const { creator, status, category, startDate, endDate, urgent } = req.query;

  const filterCriteria = {};
  if (urgent) {
    filterCriteria.urgent = {
      [Op.like]: urgent,
    };
  }
  if (status) {
    filterCriteria.status = status;
  }
  if (category) {
    filterCriteria.category = category;
  }

  if (startDate && !endDate) {
    filterCriteria.createdAt = {
      [Op.gte]: `${new Date(startDate).toISOString()}`,
    };
  }
  if (!startDate && endDate) {
    filterCriteria.createdAt = {
      [Op.gte]: `${new Date(endDate).toISOString()}`,
    };
  }

  if (startDate && endDate) {
    let compareTwoDate = new Date(startDate) <= new Date(endDate);
    if (!compareTwoDate) {
      customError("Start date must be earlier than end date!");
    }

    filterCriteria.createdAt = {
      [Op.and]: {
        [Op.gte]: new Date(startDate),
        [Op.lte]: new Date(endDate),
      },
    };
  }
  const filterTicket = await Ticket.findAll({
    order: [["createdAt", "DESC"]],
    where: filterCriteria,
    attributes: [
      ["idTicket", "id"],
      "title",
      "description",
      "createdAt",
      "updatedAt",
      "urgent",
      "status",
      "creator",
      "solution",
      "category",
      [Sequelize.literal('"User"."fullName"'), "User"],
    ],
    include: {
      model: User,
      attributes: ["fullName"],
      where: creator && {
        fullName: {
          [Op.like]: `%${creator}%`,
        },
      },
    },
    raw: true,
  });
  res.status(200).send({
    ticket: filterTicket,
    message: "the filtering you made was applied successfully",
  });
};

module.exports = {
  getTickets,
  createTicket,
  getTicketById,
  updateTicket,
  deleteTicket,
  statistics,
  filter,
};
