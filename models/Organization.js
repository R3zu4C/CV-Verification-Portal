'use strict';
const { Model } = require('sequelize')
const { OrganizationLog } = require('./log');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {

    static associate({ Role, Organization, Template, Point, AdminPermission }) {

      this.hasMany(Role, {
        foreignKey: 'org_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.hasOne(Organization, {
        foreignKey: 'parent_org_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.hasMany(AdminPermission, {
        foreignKey: 'org_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.belongsTo(Organization, {
        foreignKey: 'parent_org_id',
      });

      this.hasMany(Template, {
        foreignKey: 'org_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.hasMany(Point, {
        as: 'points',
        foreignKey: 'org_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  Organization.init(
    {
      org_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      hooks: {  // 定义钩子函数
        afterCreate: (org, options) => OrganizationLog.createFromOrganization(org, 'C'),
        afterUpdate: (org, options) => OrganizationLog.createFromOrganization(org, 'U'),
        beforeDestroy: (org, options) => OrganizationLog.createFromOrganization(org, 'D'),
        afterBulkCreate: (orgs, options) => OrganizationLog.bulkCreateFromOrganization(orgs, 'C'),
        beforeBulkDestroy: (orgs, options) => OrganizationLog.bulkCreateFromOrganization(orgs, 'D'),
        afterBulkUpdate: (orgs, options) => OrganizationLog.bulkCreateFromOrganization(orgs, 'U'),
      },

      sequelize,
      initialAutoIncrement: 100,
      tableName: "organizations",
      modelName: 'Organization',
    }
  )
  return Organization
}