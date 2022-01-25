const { addPoint, getAllPoint } = require("../controllers/pointController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = require("express").Router();

// Adding a Point thru POST request
router.post("/", requireAuth, addPoint);

router.get("/all", requireAuth, getAllPoint);


module.exports = router;
