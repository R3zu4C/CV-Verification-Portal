const { Sequelize, DataTypes } = require('sequelize');
const sequelzie = require('../database/connection');

const Notification = sequelzie.define('notification', {
  notif_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(255)
  },
  description: {
    type: DataTypes.STRING(255)
  },
  user_type: { // user_type can be A(Admin), U(User), G(God Admin)
    type: DataTypes.CHAR(1),
    allowNull: false
  },
  notif_to: {
    type: DataTypes.INTEGER,
    references: { model: 'users', key: 's_id' }
  },
  type: { // type can be P(Point), R(Request), F(Flag)
    type: DataTypes.CHAR(1)
  },
  flag_id: {
    type: DataTypes.INTEGER,
    references: { model: 'flags', key: 'flag_id' }
  },
  point_id: {
    type: DataTypes.INTEGER,
    references: { model: 'points', key: 'point_id' }
  },
  request_id: {
    type: DataTypes.INTEGER,
    references: { model: 'requests', key: 'req_id' }
  },
  seen: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  initialAutoIncrement: 100,
  tableName: 'notifications'
});

module.exports = Notification;
