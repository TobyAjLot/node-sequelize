import Sequelize from "sequelize";
import sequelize from "../util/database.js";

const Order = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  total: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

export default Order;
