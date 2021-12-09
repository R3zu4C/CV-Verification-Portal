const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Permission = sequelize.define('permission', {
  perm_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
  }
}, {
  initialAutoIncrement: 100,
  tableName: 'permissions'
});

module.exports = Permission;