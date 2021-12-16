const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

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
  email: {
    type: DataTypes.STRING(50)
  },
  mobile_no: {
    type: DataTypes.INTEGER
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