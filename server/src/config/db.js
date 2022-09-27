const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.MSSQL_DB,
  process.env.MSSQL_UR,
  process.env.MSSQL_PS,
  {
    dialect: "mssql",
    host: "localhost",
  }
);
module.exports = sequelize;
