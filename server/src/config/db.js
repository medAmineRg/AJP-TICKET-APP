const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.MSSQL_DB,
  process.env.MSSQL_UR,
  process.env.MSSQL_PS,
  {
    dialect: "mssql",
    // host: process.env.HOST,

    // dialectOptions: {
    //   // Observe the need for this nested `options` field for MSSQL
    //   options: {
    //     encrypt: false,
    //     trustServerCertificate: true,
    //   },
    // },
  }
);
module.exports = sequelize;
