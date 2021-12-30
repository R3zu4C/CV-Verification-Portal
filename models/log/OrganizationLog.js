'use strict';
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class OrganizationLog extends Model {

    static associate({ RoleLog, OrganizationLog, TemplateLog, PointLog, AdminPermissionLog }) {

      this.hasMany(RoleLog, {
        foreignKey: 'org_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.hasOne(OrganizationLog, {
        foreignKey: 'parent_org_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.hasMany(AdminPermissionLog, {
        foreignKey: 'org_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.belongsTo(OrganizationLog, {
        foreignKey: 'parent_org_id',
      });

      this.hasMany(TemplateLog, {
        foreignKey: 'org_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      this.hasMany(PointLog, {
        as: 'points',
        foreignKey: 'org_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }

    static createFromOrganization(Organization) {
      return this.create({
        org_id: Organization.org_id,
        name: Organization.name,
        parent_org_id: Organization.parent_org_id,
      })
    }

    static bulkCreateFromOrganization(Organizations) {
      return this.bulkCreate(Organizations.map(Organization => ({
        org_id: Organization.org_id,
        name: Organization.name,
        parent_org_id: Organization.parent_org_id,
      })));
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  OrganizationLog.init(
    {
      logId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      org_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      initialAutoIncrement: 100,
      tableName: "organizations_log",
      modelName: 'OrganizationLog',
    }
  )
  return OrganizationLog
}