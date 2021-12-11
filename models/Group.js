const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Group = sequelize.define('group', {
  group_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
  }
}, {
  initialAutoIncrement: 100,
  tableName: 'groups'
});

module.exports = Group;