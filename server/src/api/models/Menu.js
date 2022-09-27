const db = require("../../config/db");
const { DataTypes } = require("sequelize");

const Menu = db.define(
  "menu",
  {
    menu: {
      type: DataTypes.STRING(30),
      primaryKey: true,
      validate: {
        len: {
          args: [3, 30],
          msg: "Name length must be between 3 and 30",
        },
      },
    },
    permission: {
      type: DataTypes.STRING(60),
      get() {
        return this.getDataValue("permission").split(";");
      },
      set(val) {
        this.setDataValue("permission", val.join(";"));
      },
    },
  },
  { freezeTableName: true, timestamps: false }
);

module.exports = Menu;
