const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const Project_Template = sequelize.define(
    "project_Template",
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
            default: 'P'
        }
    },
    {
        initialAutoIncrement: 100,
        tableName: "project_Templates",
    }
);

module.exports = Project_Template;
