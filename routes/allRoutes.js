const { fetchAllOrg } = require("../controllers/orgController");
const { addPoint, uploadProof } = require("../controllers/pointController");
const fs = require("fs");
const { searchPoint } = require("../controllers/searchController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.get("/", async (req, res) => {
  
  res.end(fs.readFileSync("./views/index.html"));
});
// Adding a Point thru POST request
router.post("/point", requireAuth, addPoint);

router.get("/status", (req, res) => {
  let user = req.session.user
  let admin = req.session.admin;
  let loggedIn = req.session.user ? true : false;

  if(loggedIn) res.send({ user, admin });
  else res.json("NA");
})

// Getting a list of all the Organizations and their org_id
router.get("/orgs", fetchAllOrg);

// Proof uploading service
router.post("/upload", requireAuth, uploadProof);

// Getting Search results
router.post("/search", searchPoint);

module.exports = router;
