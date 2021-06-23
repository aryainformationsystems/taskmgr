const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:Jajwuth2fapow@localhost:5432/taskbox');

module.exports = sequelize;
