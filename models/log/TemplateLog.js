"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TemplateLog extends Model {
    toJSON() {
      return { ...this.get(), id: undefined };
    }

    static createFromTemplate(Template, action) {
      return this.create({
        title: Template.title,
        org_id: Template.org_id,
        visibility: Template.visibility,
        template_id: Template.template_id,
        action: action,
      });
    }

    static bulkCreateFromTemplate(Templates, action) {
      return this.bulkCreate(
        Templates.map((Template) => ({
          title: Template.title,
          org_id: Template.org_id,
          visibility: Template.visibility,
          template_id: Template.template_id,
          action: action,
        }))
      );
    }
  }
  TemplateLog.init(
    {
      log_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      template_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      action: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
      },
      visibility: {
        type: DataTypes.CHAR(1),
        default: "P",
      },
      org_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "TemplateLog",
      initialAutoIncrement: 100,
      tableName: "templates_log",
    }
  );
  return TemplateLog;
};
