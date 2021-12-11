const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const User = sequelize.define('user', {
  s_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  mail: {
    type: DataTypes.STRING(50)
  },
  branch: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  program: {
    type: DataTypes.STRING(50)
  }
}, {
  tableName: 'users'
});

module.exports = User;