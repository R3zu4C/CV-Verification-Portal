const { allPendingRequests, allApprovedRequests, respondToRequest } = require("../controllers/requestController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = require("express").Router();


router.get("/pending", requireAuth, allPendingRequests);

router.get("/approved",requireAuth, allApprovedRequests );

router.post("/:reqId/approve", requireAuth, (req, res) => respondToRequest(req, res, "A"));

router.post("/:reqId/reject", requireAuth, (req, res) => respondToRequest(req, res, "D"));

router.post("/:reqId/suggest", requireAuth, (req, res) => respondToRequest(req, res, "S"));

module.exports = router;
