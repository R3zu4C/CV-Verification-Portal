const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Request = sequelize.define('request', {
  req_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING(50)
  },
  point_id: {
    type: DataTypes.INTEGER,
    references: { model: 'points', key: 'point_id' }
  },
  req_by: {
    type: DataTypes.INTEGER,
    references: { model: 'users', key: 's_id' }
  },
  req_to: {
    type: DataTypes.INTEGER,
    references: { model: 'users', key: 's_id' }
  },
  approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  initialAutoIncrement: 100,
  tableName: 'requests'
});

module.exports = Request;