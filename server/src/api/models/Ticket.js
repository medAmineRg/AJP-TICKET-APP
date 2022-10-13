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
    category: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        isIn: {
          args: [
            [
              "Laptop / PC requirement issue",
              "Laptop / PC software issue",
              "Other...",
            ],
          ],
          msg: "I catch you :)",
        },
      },
    },
    status: {
      type: DataTypes.STRING(20),
      validate: {
        isIn: [["Not Started", "In Progress", "Completed", "Postpone"]],
      },
      defaultValue: "Not Started",
    },

    solution: {
      type: DataTypes.STRING(500),
      validate: {
        len: {
          args: [15, 500],
          msg: "solution length must be between 15 and 250",
        },
      },
      defaultValue: "Admin will try to find a solution.",
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
