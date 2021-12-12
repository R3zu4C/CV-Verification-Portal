const Point = require('../models/Point');
const Organization = require('../models/Organization');
const Request = require('../models/Request');
const fs = require("fs");

module.exports.addPoint = async (req, res) => {
    try {
        console.log(req.body);
        const p = await Point.create({
            desc: req.body.desc,
            s_id: parseInt(req.body.s_id),
            category: req.body.category,
            org_id: parseInt(req.body.org_id),
            added_by: parseInt(req.body.added_by),
            proof: req.body.proof
        });
        if (p) {
            res.send(p);
            console.log("Point added to database successfully.");
            console.log(JSON.stringify(p));
            const req_to = await Organization.findAll({
                where: {
                    org_id: p.org_id
                }
            });
            const request = await Request.create({
                type: p.category,
                point_id: p.point_id,
                req_by: p.added_by,
                req_to: req_to[0].head_id
            });
            console.log("Request added to database successfully.");
            console.log(JSON.stringify(request));
        }
    } catch (error) {
        console.error("Error:" + error.message);
        res.status(400).send('Error in inserting new record');
    }
}

module.exports.uploadProof = async (req, res) => {
    const fileName = req.headers["file-name"];
    const s_id = req.headers["s_id"];
    var dir = `./uploads/${s_id}`;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    req.on("data", chunk => {
        fs.appendFileSync(`${dir}/${fileName}`, chunk);
    })
}