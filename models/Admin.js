const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Admin = sequelize.define('admin', {
  s_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: { model: 'users', key: 's_id'}
  }
}, {
  tableName: 'admins'
});

module.exports = Admin;