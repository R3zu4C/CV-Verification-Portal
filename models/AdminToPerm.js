const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const AdminToPerm = sequelize.define('admin_to_perm', {
  s_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: 'admins', key: 's_id' }
  },
  perm_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: 'permissions', key: 'perm_id' }
  }
}, {
  tableName: 'admin_to_perm'
});

module.exports = AdminToPerm;