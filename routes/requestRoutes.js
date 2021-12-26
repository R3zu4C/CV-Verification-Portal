const { allPendingRequests, approveRequest } = require("../controllers/requestController");

const router = require("express").Router();


router.get("/", allPendingRequests);

router.get("/:reqId/approve", approveRequest);

module.exports = router;
