const express = require("express");
const app = express();
const asso = require("./models")();

// routes
const UserRoutes = require("./router/User");
const TicketRoutes = require("./router/Ticket");

// dotenv + db connection
require("dotenv").config();
const db = require("../config/db");
const Role = require("./models/Role");
const Ticket = require("./models/Ticket");
const User = require("./models/User");
const Menu = require("./models/Menu");

db.authenticate()
  .then(async () => {
    console.log("connect to the database:");
    // await db.sync({ force: true });
  })
  .catch(error => {
    console.log(error);
    console.error("Unable to connect to the database:", error);
  });

// public routes
app.use(require("cors")());
app.use(express.json());
app.use(UserRoutes);
app.use(TicketRoutes);

// log error
app.use((err, req, res, next) => {
  if (err) {
    console.log(err);
    next(err);
  }
});

// send the err to the client
app.use((err, req, res, next) => {
  if (err.message && err.code) {
    return res.status(err.code).send({ message: err.message, code: err.code });
  }
  if (err.message) {
    return res.status(400).send({ message: err.message, code: 400 });
  }
  if (!err.message && !err.code) {
    return res.status(500).send("Something went wrong");
  }
});

// not found error handling
app.use((req, res, next) => {
  res.status(404).send("Page not found");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
