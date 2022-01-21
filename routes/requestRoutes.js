const { allPendingRequests, approveRequest, rejectRequest } = require("../controllers/requestController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = require("express").Router();


router.get("/", requireAuth, allPendingRequests);

router.get("/:reqId/approve", requireAuth, approveRequest);

router.get("/:reqId/reject", requireAuth, rejectRequest);

module.exports = router;
