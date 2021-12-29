const { allPendingRequests, approveRequest } = require("../controllers/requestController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = require("express").Router();


router.get("/", requireAuth, allPendingRequests);

router.get("/:reqId/approve", requireAuth, approveRequest);

module.exports = router;
