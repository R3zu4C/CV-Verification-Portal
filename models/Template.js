"use strict";
const { Model } = require("sequelize");
const {TemplateLog} = require("./log")
module.exports = (sequelize, DataTypes) => {
  class Template extends Model {
    static associate({ Organization }) {
      
      this.belongsTo(Organization, {
        foreignKey: 'org_id',
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
      hooks: {
        afterBulkCreate: (templates, options) => TemplateLog.bulkCreateFromTemplate(templates),
        afterBulkUpdate: (templates, options) => TemplateLog.bulkCreateFromTemplate(templates),
        beforeBulkDestroy: (templates, options) => TemplateLog.bulkCreateFromTemplate(templates),
        afterCreate: (template, options) => TemplateLog.createFromTemplate(template),
        afterUpdate: (template, options) => TemplateLog.createFromTemplate(template),
        beforeDestroy: (template, options) => TemplateLog.createFromTemplate(template),
      },
      
      sequelize,
      modelName: "Template",
      initialAutoIncrement: 100,
      tableName: "templates",
    }
  );
  return Template;
};
