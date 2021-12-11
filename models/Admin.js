const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Admin = sequelize.define('admin', {
  s_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: { model: 'users', key: 's_id'}
  },
  org_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: 'organizations', key: 'org_id' }
  },
  super_id: {
    type: DataTypes.INTEGER,
    references: { model: 'admins', key: 's_id' }
  }
}, {
  tableName: 'admins'
});

module.exports = Admin;