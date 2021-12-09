const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Flag = sequelize.define('flag', {
  point_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: 'points', key: 'point_id' }
  },
  flagged_by: {
    type: DataTypes.BIGINT(9),
    primaryKey: true,
    references: { model: 'users', key: 's_id' }
  },
  approved_by: {
    type: DataTypes.BIGINT(9),
    references: { model: 'users', key: 's_id' }
  }
}, {
  tableName: 'flags'
});

module.exports = Flag;