"use strict";
const { Model } = require("sequelize");
const { sendMailFromNotification } = require("../controllers/mailController");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate({ User, Flag, Point, Request }) {
      this.belongsTo(User, {
        foreignKey: "notif_to",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      this.belongsTo(Flag, {
        foreignKey: "flag_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      this.belongsTo(Point, {
        foreignKey: "point_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      this.belongsTo(Request, {
        foreignKey: "req_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }

    toJSON() {
      return { ...this.get(), id: undefined };
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
      hooks: {
        // afterCreate: async (notification, options) => sendMailFromNotification(notification),
      },
      sequelize,
      initialAutoIncrement: 100,
      tableName: "notifications",
      modelName: "Notification",
    }
  );
  return Notification;
};
