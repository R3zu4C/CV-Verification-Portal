const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Flag = sequelize.define('flag', {
  flag_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  point_id: {
    type: DataTypes.INTEGER,
    references: { model: 'points', key: 'point_id' }
  },
  flagged_by: {
    type: DataTypes.INTEGER,
    references: { model: 'users', key: 's_id' }
  },
  approved_by: {
    type: DataTypes.INTEGER,
    references: { model: 'admins', key: 's_id' }
  },
  status: { // status can be P(Pending), A(Approved), D(Denied)
    type: DataTypes.CHAR(1),
    defaultValue: 'P',
    allowNull: false,
  }
}, {
  tableName: 'flags'
});

module.exports = Flag;