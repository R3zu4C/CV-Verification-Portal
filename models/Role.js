const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Role = sequelize.define('role', {
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
  }
}, {
  initialAutoIncrement: 100,
  tableName: 'roles'
});

module.exports = Role;