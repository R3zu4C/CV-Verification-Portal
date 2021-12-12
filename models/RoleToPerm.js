const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const RoleToPerm = sequelize.define('role_to_perm', {
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: 'roles', key: 'role_id' }
  },
  perm_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: 'permissions', key: 'perm_id' }
  }
}, {
  tableName: 'role_to_perm'
});

module.exports = RoleToPerm;