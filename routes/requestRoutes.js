const { allPendingRequests, respondToRequest } = require("../controllers/requestController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = require("express").Router();


router.get("/", requireAuth, allPendingRequests);

router.get("/:reqId/approve", requireAuth, (req, res) => respondToRequest(req, res, "A"));

router.post("/:reqId/reject", requireAuth, (req, res) => respondToRequest(req, res, "D"));

module.exports = router;
