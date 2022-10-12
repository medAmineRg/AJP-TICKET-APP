const express = require("express");
const app = express();
const path = require("path");

// sequelize association models
const asso = require("./models")();

//static pages
const pathMap = new Set([
  "/",
  "/ticket",
  "/user",
  "/user/profile",
  "/login",
  "/signup",
]);

// routes
const UserRoutes = require("./router/User");
const TicketRoutes = require("./router/Ticket");

// dotenv + db connection
require("dotenv").config();
const db = require("../config/db");
const Role = require("./models/Role");
const Ticket = require("./models/Ticket");
const User = require("./models/User");

db.authenticate()
  .then(async () => {
    console.log("Sync DB Successfully");
    console.log("connect to the database:");
  })
  .catch(error => {
    console.log(error);
    console.error("Unable to connect to the database:", error);
  });

// public routes
app.use(require("cors")());
app.use(express.json());
app.use("/api", UserRoutes);
app.use("/api", TicketRoutes);

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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../../client/out")));
  app.get("*", (req, res) => {
    let params =
      req.path.slice(req.path.length - 1) === "/" ? req.path : req.path + "/";
    console.log(params);
    if (pathMap.has(params.slice(0, params.length - 1)))
      res.sendFile(
        path.resolve(
          path.join(
            __dirname,
            `../../../client/out/${params.slice(1, params.length - 1)}.html`
          )
        )
      );
    else
      res.sendFile(
        path.resolve(path.join(__dirname, "../../../client/out/404.html"))
      );
  });
}

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
