'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flag extends Model {
    static associate({ Admin, User, Point, Notification }) {

      this.belongsTo(Admin, {
        foreignKey: 'approved_by',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.belongsTo(User, {
        foreignKey: 'flagged_by',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.belongsTo(Point, {
        foreignKey: 'point_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.hasMany(Notification, {
        foreignKey: "flag_id",
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }

  }
  Flag.init(
    {
      flag_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      status: {
        // status can be P(Pending), A(Approved), D(Denied)
        type: DataTypes.CHAR(1),
        defaultValue: "P",
        allowNull: false,
      },
    },
    {
      sequelize,
      initialAutoIncrement: 100,
      tableName: 'flags',
      modelName: 'Flag',
    }
  );
  return Flag;
};
