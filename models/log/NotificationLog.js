"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NotificationLog extends Model {
    static associate({ UserLog, FlagLog, PointLog, RequestLog }) {
      this.belongsTo(UserLog, {
        foreignKey: "notif_to",
        targetKey: "user_id",
      });

      this.belongsTo(FlagLog, {
        foreignKey: "flag_id",
        targetKey: "flag_id",
      });

      this.belongsTo(PointLog, {
        foreignKey: "point_id",
        targetKey: "point_id",
      });

      this.belongsTo(RequestLog, {
        foreignKey: "request_id",
        targetKey: "req_id",
      });
    }

    static createFromNotification(Notification, action) {
      return this.create({
        notif_to: Notification.notif_to,
        flag_id: Notification.flag_id,
        point_id: Notification.point_id,
        request_id: Notification.request_id,
        status: Notification.status,
        title: Notification.title,
        description: Notification.description,
        type: Notification.type,
        user_type: Notification.user_type,
        seen: Notification.seen,
        action: action,
      });
    }

    static bulkCreateFromNotification(Notifications, action) {
      return this.bulkCreate(
        Notifications.map((Notification) => ({
          notif_to: Notification.notif_to,
          flag_id: Notification.flag_id,
          point_id: Notification.point_id,
          request_id: Notification.request_id,
          status: Notification.status,
          title: Notification.title,
          description: Notification.description,
          type: Notification.type,
          user_type: Notification.user_type,
          seen: Notification.seen,
          action: action,
        }))
      );
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  NotificationLog.init(
    {
      logId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      action: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
      notif_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      tableName: "notifications_log",
      modelName: "NotificationLog",
      indexes: [{ unique: false, fields: ["notif_id"] }],
    }
  );
  return NotificationLog;
};
