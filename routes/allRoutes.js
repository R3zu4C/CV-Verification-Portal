const { fetchAllOrg } = require("../controllers/orgController");
const { addPoint, uploadProof, flagPoint } = require("../controllers/pointController");
const fs = require("fs");
const { searchPoint } = require("../controllers/searchController");
const { requireAuth } = require("../middleware/authMiddleware");
const { allPendingRequests, approveRequest } = require("../controllers/requestController");

const router = require("express").Router();

router.get("/", async (req, res) => {
  
  res.end(fs.readFileSync("./views/index.html"));
});
// Adding a Point thru POST request
router.post("/point", requireAuth, addPoint);

// Getting a list of all the Organizations and their org_id
router.get("/orgs", fetchAllOrg);

// Proof uploading service
router.post("/upload", requireAuth, uploadProof);

// Getting Search results
router.post("/search", searchPoint);

router.post("/point/:pointId/flag", flagPoint);

router.get("/requests", allPendingRequests);

router.get("/requests/:reqId/approve", approveRequest);

module.exports = router;
