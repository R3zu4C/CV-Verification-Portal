const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const AdminToRole = sequelize.define('admin_to_role', {
  s_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: 'admins', key: 's_id' }
  },
  org_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: 'organizations', key: 'org_id' }
  },
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: 'roles', key: 'role_id' }
  }
}, {
  tableName: 'admin_to_role'
});

module.exports = AdminToRole;