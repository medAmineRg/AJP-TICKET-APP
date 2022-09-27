const db = require("../../config/db");
const { DataTypes } = require("sequelize");

const Role = db.define(
  "role",
  {
    role: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      validate: {
        len: {
          args: [3, 20],
          msg: "Role length must be between 3 and 20",
        },
      },
    },
  },
  { freezeTableName: true, timestamps: false }
);

module.exports = Role;
