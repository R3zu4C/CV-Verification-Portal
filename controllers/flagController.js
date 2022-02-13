const fs = require("fs");
const {
	addFlagToDatabase,
	addFlagNotifsToDatabase,
} = require("./helpers/pointHelper");
const { Op } =require("sequelize");

const AdminService = require("./helpers/adminHelper");

const { Point, Flag, sequelize, Remark } = require("../models");

module.exports = {
	pendingFlagsForAdmin: async (req,res)=>{
		try{
			const adminService = AdminService(req.session.user, req.session.admin);
			let adminOrg =adminService.org;
			adminOrg = Object.keys(adminOrg).map(org=> parseInt(org));
			const orgSubQuery = `SELECT point_id FROM points WHERE org_id IN (${adminOrg.join(',')})`;
			const pendingFlagsOfAdmin = await Flag.findAll({
				where: {
					point_id: [sequelize.literal(orgSubQuery)],
					response_by: {[Op.eq]: null}
				},
				include: ["Point"]
			})
			return res.send(pendingFlagsOfAdmin);
		} catch(err) {
			res.status(500).send({err})
		}
	},


	acceptFlag: async (req, res) => {
		try {
			const transactionID = await sequelize.transaction();
			const flag_id = req.params.flagId;
			const response_by = req.session.user.user_id;
			const flag = await Flag.findByPk(flag_id, {
				include: Point
			});
			if (!flag)
				return res.status(404).send({ error: { message: "Flag not found" } });

			const point = flag.Point;

			const adminService = new AdminService(req.session.user, req.session.admin);
			if (adminService.hasPermission("Approve requests", point.org_id) === false)
				return res.status(403).send({ error: "You do not have permission to respond to this request" });

			await point.update(
				{
					status: "D",
					response_by: response_by
				},
				{ transaction: transactionID }
			);

			await flag.update(
				{
					status: "A",
					response_by: response_by,
				},
				{ transaction: transactionID }
			);

			//TODO: write notifications

			await transactionID.commit();
			res.status(200).send({
				message: "Flag accepted",
			});
		} catch (err) {
			await transactionID.rollback();
			res.status(500).send({
				err,
			});
		}
	},

	declineFlag: async (req, res) => {
		try {
			const flag_id = req.params.flagId;
			const response_by = req.session.user.user_id;
			const flag = await Flag.findByPk(flag_id, {
				include: Point
			});
			if (!flag)
				return res.status(404).send({ error: { message: "Flag not found" } });

			const point = flag.Point;

			const adminService = new AdminService(req.session.user, req.session.admin);
			if (adminService.hasPermission("Approve requests", point.org_id) === false)
				return res.status(403).send({ error: "You do not have permission to respond to this request" });

			await flag.update(
				{
					status: "D",
					response_by: response_by,
				},
			);

			//TODO: write notifications

			res.status(200).send({
				message: "Flag declined",
			});
		} catch (err) {
			res.status(500).send({
				err,
			});
		}
	},

	suggestUser: async (req, res) => {
		const transactionID = await sequelize.transaction(); 
		try {
			if (!req.body.remark)
				return res.status(400).send({ error: { message: "Remark is required" } });
			const flag_id = req.params.flagId;
			const response_by = req.session.user.user_id;
			const flag = await Flag.findByPk(flag_id, {
				include: [
					{
						model: Point,
						include: [Remark]
					}
				]
			});
			if (!flag)
				return res.status(404).send({ error: { message: "Flag not found" } });
			const point = flag.Point;
			if(point.status === "S")
				return res.status(400).send({ error: { message: "Suggestions has already been made" } }); // Can suggest again? No.

			const adminService = new AdminService(req.session.user, req.session.admin);
			if (adminService.hasPermission("Approve requests", point.org_id) === false)
				return res.status(403).send({ error: "You do not have permission to respond to this request" });

			await point.update(
				{
					status: "S",
					response_by: response_by,
				},
				{ transaction: transactionID }
			);

			await point.Remarks.map((remark) => {
				remark.update({
					active: false
				}, { transaction: transactionID });
			});

			await Remark.create({
				remark: req.body.remark,
				from: response_by,
				point_id: point.point_id,
				active: true,
			}, {
				transaction: transactionID
			});


			await flag.update(
				{
					status: "S", //? what should be the status of a suggested flag?
					response_by: response_by,
				},
				{ transaction: transactionID }
			);

			//TODO: write notifications

			await transactionID.commit();
			res.status(200).send({
				message: "Suggestions sent to user",
			});
		} catch (err) {
			await transactionID.rollback();
			res.status(500).send({
				err,
			});
		}
	},


	flagPoint: async (req, res) => {
		
		const transactionID = await sequelize.transaction();
		try {
			const flagged_by = req.session.user.user_id;
			const point = await Point.findByPk(req.params.pointId, {
				include: [Flag],
			});
			
			if (!point) {
				return res.status(404).send({ error: { message: "Point not found" } });
			} else if (point.status !== "A") {
				
				return res
					.status(400)
					.send({ error: { message: "Only aprroved points can be flagged" } });
			} else if (point.visibility !== "P") {
				
				return res
					.status(400)
					.send({ error: { message: "Only public points can be flagged" } });
			}
			let bool = false;
			point.Flags.forEach((flag) => {
				if (flag.flagged_by === flagged_by) bool = true;
			});
			
			if (bool)
				{
					console.log("you have already flagged this point once");
					return res.status(400).send({
						error: { message: "You have already flagged this point once" },
					});
			}
			// point.update(
			//   { response_by: null, status: "S" },
			//   { transaction: transactionID }
			// );
			// const requests = await point.getRequests();

			// await Promise.all(
			//   requests.map((request) =>
			//     request.update({ status: "P" }, { transaction: transactionID })
			//   )
			// );
			
			const flagData = { ...req.body, point_id: point.point_id };
			const flag = await addFlagToDatabase(flagData, flagged_by, transactionID);
			await addFlagNotifsToDatabase(flag, point, transactionID);
			transactionID.commit();
			res.send({ redirect: "/" });
		} catch (error) {
			console.error("Error:" + error.message);
			transactionID.rollback();
			res.status(400).send("Error in inserting new record");
		}
	},
};
