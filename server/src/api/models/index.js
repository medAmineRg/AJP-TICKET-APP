module.exports = () => {
  const Ticket = require("./Ticket");
  const Menu = require("./Menu");
  const User = require("./User");
  const Role = require("./Role");
  User.belongsTo(Role, { as: "Role", foreignKey: "role" });
  Role.hasMany(User, { as: "Role", foreignKey: "role" });
  User.hasMany(Ticket, { foreignKey: "creator" });
  Ticket.belongsTo(User, { foreignKey: "creator" });
  Role.belongsToMany(Menu, { foreignKey: "role", through: "role_menu" });
  Menu.belongsToMany(Role, { foreignKey: "menu", through: "role_menu" });
};
