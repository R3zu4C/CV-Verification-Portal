const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const GroupToPerm = sequelize.define('group_to_perm', {
  group_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: 'groups', key: 'group_id' }
  },
  perm_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: 'permissions', key: 'perm_id' }
  }
}, {
  tableName: 'group_to_perm'
});

module.exports = GroupToPerm;