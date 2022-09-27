const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const User = sequelize.define(
  "user",
  {
    idUser: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(50),
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    fullName: {
      type: DataTypes.STRING(30),
      validate: {
        len: {
          args: [5, 30],
          msg: "Name length must be between 5 and 30",
        },
      },
    },

    password: {
      type: DataTypes.STRING(72),
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = User;
