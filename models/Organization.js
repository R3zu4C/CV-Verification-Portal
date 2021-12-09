const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Organization = sequelize.define('organization', {
  org_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
  },
  head_id: {
    type: DataTypes.INTEGER,
    references: { model: 'users', key: 's_id' }
  }
}, {
  initialAutoIncrement: 100,
  tableName: 'organizations'
});

module.exports = Organization;