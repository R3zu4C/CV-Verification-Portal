"use strict";
const { Model } = require("sequelize");
const { RemarkLog } = require("./log");

module.exports = (sequelize, DataTypes) => {
	class Remark extends Model {
		static associate({ Point, User }) {
			this.belongsTo(Point, {
				foreignKey: "point_id",
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			});
			this.belongsTo(User, {
				foreignKey: "from",
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			})
		}

		toJSON() {
			return { ...this.get(), id: undefined };
		}
	}
	Remark.init(
		{
			remark_id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			point_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			remark: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			from: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			active: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
		},
		{
			hooks: {
				afterBulkCreate: (Remarks, options) => RemarkLog.bulkCreateFromRemark(Remarks, "C"),
				beforeBulkDestroy: (Remarks, options) => RemarkLog.bulkCreateFromRemark(Remarks, "D"),
				afterBulkUpdate: (Remarks, options) => RemarkLog.bulkCreateFromRemark(Remarks, "U"),
				afterCreate: (Remark, options) => RemarkLog.createFromRemark(Remark, "C"),
				beforeDestroy: (Remark, options) => RemarkLog.createFromRemark(Remark, "D"),
				afterUpdate: (Remark, options) => RemarkLog.createFromRemark(Remark, "U"),
			},
			sequelize,
			initialAutoIncrement: 100,
			tableName: "remarks",
			modelName: "Remark",
		}
	);
	return Remark;
};
