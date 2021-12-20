const fs = require("fs");
const {
  addPointToDatabase,
  addRequestToDatabase,
  addPointNotifsToDatabase,
} = require("./helpers/pointHelper");

module.exports = {
  addPoint: async (req, res) => {
    try {
      const newPoint = {
        title: req.body.title,
        description: req.body.description,
        s_id: req.body.s_id,
        category: req.body.category,
        org_id: parseInt(req.body.org_id),
        added_by: req.body.added_by,
        status: "P",
        visibility: "P",
        proof: req.body.proof,
      };

      const point = await addPointToDatabase(newPoint);
      await addRequestToDatabase(point);
      await addPointNotifsToDatabase(point);
    } catch (error) {
      console.error("Error:" + error.message);
      res.status(400).send("Error in inserting new record");
    }
  },

  uploadProof: async (req, res) => {
    const fileName = req.headers["file-name"];
    const s_id = req.headers["s_id"];
    const dir = `./uploads/${s_id}`;

    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    req.on("data", (chunk) => fs.appendFileSync(`${dir}/${fileName}`, chunk));

    res.end("Proof uploaded!");
  },
};
