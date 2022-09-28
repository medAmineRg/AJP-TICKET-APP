const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Ticket = sequelize.define(
  "ticket",
  {
    idTicket: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        len: {
          args: [3, 30],
          msg: "Title length must be between 3 and 30",
        },
      },
    },
    description: {
      type: DataTypes.STRING(250),
      allowNull: false,
      validate: {
        len: {
          args: [15, 250],
          msg: "Description length must be between 15 and 250",
        },
      },
    },
    urgent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.STRING(20),
      validate: {
        isIn: [["Non commencé", "En cours", "Terminé", "Reporté"]],
      },
      defaultValue: "Non commencé",
    },
  },
  {
    freezeTableName: true,
    indexes: [
      // Create a unique index on email
      {
        name: "createdAt_index",
        using: "BTREE",
        fields: [
          {
            name: "createdAt",
            order: "DESC",
          },
        ],
      },
    ],
  }
);

module.exports = Ticket;
