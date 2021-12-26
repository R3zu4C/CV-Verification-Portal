const { addPoint, uploadProof, flagPoint } = require("../controllers/pointController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = require("express").Router();

// Adding a Point thru POST request
router.post("/", requireAuth, addPoint);

// Proof uploading service
router.post("/upload", requireAuth, uploadProof);

router.post("/:pointId/flag", flagPoint);


module.exports = router;
