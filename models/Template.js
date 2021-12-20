"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Template extends Model {
    static associate({ Organization }) {
      
      this.belongsTo(Organization, {
        foreignKey: 'org_tempate_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  Template.init(
    {
      template_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      visibility: {
        type: DataTypes.CHAR(1),
        default: "P",
      },
    },
    {
      sequelize,
      modelName: "Template",
      initialAutoIncrement: 100,
      tableName: "templates",
    }
  );
  return Template;
};
