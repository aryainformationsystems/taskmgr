const sequelize = require("../config/sequelize");
const { DataTypes, Sequelize } = require("sequelize");

const Comment = sequelize.define(
  "comment",
  {
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "comment",
    underscored: true,
  }
);

exports.Comment = Comment;
