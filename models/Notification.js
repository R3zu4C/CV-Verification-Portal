'use strict';
const { NotificationLog } = require('./log');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate({ User, Flag, Point, Request }) {
      this.belongsTo(User, {
        foreignKey: 'notif_to'
      });

      this.belongsTo(Flag, {
        foreignKey: 'flag_id'
      });

      this.belongsTo(Point, {
        foreignKey: 'point_id'
      });

      this.belongsTo(Request, {
        foreignKey: 'request_id'
      });

    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  Notification.init(
    {
      notif_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(255),
      },
      description: {
        type: DataTypes.STRING(255),
      },
      user_type: {
        // user_type can be A(Admin), U(User), G(God Admin)
        type: DataTypes.CHAR(1),
        allowNull: false,
      },
      type: {
        // type can be P(Point), R(Request), F(Flag)
        type: DataTypes.CHAR(1),
      },
      seen: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      initialAutoIncrement: 100,
      tableName: "notifications",
      modelName: "Notification",
    }
  );
  return Notification;
};
