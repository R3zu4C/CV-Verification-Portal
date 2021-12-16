const { Sequelize, DataTypes } = require('sequelize');
const sequelzie = require('../database/connection');

const Notification = sequelzie.define('notification', {
  notif_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING(50)
  },
  title: {
    type: DataTypes.STRING(255)
  },
  description: {
    type: DataTypes.STRING(255)
  },
  notif_to: {
    type: DataTypes.INTEGER,
    references: { model: 'users', key: 's_id' }
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