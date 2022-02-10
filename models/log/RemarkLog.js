"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class RemarkLog extends Model {
		static createFromRemark(Remark, action) {
			return this.create({
				remark_id: Remark.remark_id,
				from: Remark.from,
				remark: Remark.remark,
				point_id: Remark.point_id,
				active: Remark.active,
				action: action,
			});
		}

		static bulkCreateFromRemark(Remarks, action) {
			return this.bulkCreate(
				Remarks.map((Remark) => ({
					remark_id: Remark.remark_id,
					remark: Remark.remark,
					from: Remark.from,
					point_id: Remark.point_id,
					active: Remark.active,
					action: action,
				}))
			);
		}

		toJSON() {
			return { ...this.get(), id: undefined };
		}
	}
	RemarkLog.init(
		{
			log_id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			remark_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
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
			action: {
				type: DataTypes.STRING(1),
				allowNull: false,
			},
		},
		{
			sequelize,
			initialAutoIncrement: 100,
			tableName: "remarks_log",
			modelName: "RemarkLog",
		}
	);
	return RemarkLog;
};
