"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TemplateLog extends Model {
    static associate({ OrganizationLog }) {
      
      this.belongsTo(OrganizationLog, {
        foreignKey: 'org_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }

    static  createFromTemplate(Template) {
      return this.create({
        title: Template.title,
        org_id: Template.org_id,
        visibility: Template.visibility,
        template_id: Template.template_id,
      })
    }

    static bulkCreateFromTemplate(Templates) {
      return this.bulkCreate(Templates.map(Template => ({
        title: Template.title,
        org_id: Template.org_id,
        visibility: Template.visibility,
        template_id: Template.template_id,
      })));
    }
    
  }
  TemplateLog.init(
    {
      logId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      template_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      modelName: "TemplateLog",
      initialAutoIncrement: 100,
      tableName: "templates_log",
    }
  );
  return TemplateLog;
};
