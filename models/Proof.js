const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Proof = sequelize.define('proof', {
  proof_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  point_id: {
    type: DataTypes.BIGINT(9),
    references: { model: 'points', key: 'point_id' }
  },
  value: {
    type: DataTypes.STRING(255)
  }
}, {
  initialAutoIncrement: 100,
  tableName: 'proofs'
});

module.exports = Proof;