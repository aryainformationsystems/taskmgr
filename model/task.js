const sequelize = require("../config/sequelize");
const { DataTypes, Sequelize } = require("sequelize");

const Task = sequelize.define(
  "task",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1024),
      allowNull: false,
    },
    estimate: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    targetDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "task",
    underscored: true,
  }
);

exports.Task = Task;
