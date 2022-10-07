const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.MSSQL_DB,
  process.env.MSSQL_UR,
  process.env.MSSQL_PS,
  {
    dialect: "mssql",
    host: process.env.HOST,

    dialectOptions: {
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    },
  }
);
module.exports = sequelize;
