"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrganizationLog extends Model {
    static createFromOrganization(Organization, action) {
      return this.create({
        org_id: Organization.org_id,
        name: Organization.name,
        parent_org_id: Organization.parent_org_id,
        action: action,
      });
    }

    static bulkCreateFromOrganization(Organizations, action) {
      return this.bulkCreate(
        Organizations.map((Organization) => ({
          org_id: Organization.org_id,
          name: Organization.name,
          parent_org_id: Organization.parent_org_id,
          action: action,
        }))
      );
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  OrganizationLog.init(
    {
      log_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      org_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      action: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
      parent_org_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      initialAutoIncrement: 100,
      tableName: "organizations_log",
      modelName: "OrganizationLog",
    }
  );
  return OrganizationLog;
};
