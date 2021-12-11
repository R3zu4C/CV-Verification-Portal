const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Point = sequelize.define('point', {
  point_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  desc: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  s_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 's_id'}
  },
  category: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  org_id: {
    type: DataTypes.INTEGER,
    references: { model: 'organizations', key: 'org_id'}
  },
  added_by: {
    type: DataTypes.INTEGER,
    references: { model: 'users', key: 's_id' },
    allowNull: true
  },
  approved_by: {
    type: DataTypes.INTEGER,
    references: { model: 'users', key: 's_id' }
  },
  start_date: {
    type: DataTypes.DATEONLY
  },
  end_date: {
    type: DataTypes.DATEONLY
  },
  proof: {
    type: DataTypes.STRING(255)
  }
}, {
  initialAutoIncrement: 100,
  tableName: 'points'
})

module.exports = Point;