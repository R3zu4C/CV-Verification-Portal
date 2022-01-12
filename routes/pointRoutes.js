const { addPoint, uploadProof, flagPoint, getAllPoint } = require("../controllers/pointController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = require("express").Router();

// Adding a Point thru POST request
router.post("/", requireAuth, addPoint);

// Proof uploading service
router.post("/upload", requireAuth, uploadProof);

router.get("/all", requireAuth, getAllPoint);

router.post("/:pointId/flag",requireAuth, flagPoint);



module.exports = router;
