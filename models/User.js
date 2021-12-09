const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const User = sequelize.define('user', {
  s_id: {
    type: DataTypes.BIGINT(9),
    allowNull: false,
    primaryKey: true
  },
  f_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  l_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  branch: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'users'
});

module.exports = User;