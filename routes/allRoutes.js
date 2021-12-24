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
<<<<<<< HEAD
  let user = req.session.user
  let admin = req.session.admin;
=======
  const user = req.session.user;
  const admin = req.session.admin;
  const loggedIn = req.session.user ? true : false;
>>>>>>> 432db78e288b315d7ce79da3cfc83d53f7436476

  res.send({ user, admin });
})

// Getting a list of all the Organizations and their org_id
router.get("/orgs", fetchAllOrg);

// Proof uploading service
router.post("/upload", requireAuth, uploadProof);

// Getting Search results
router.post("/search", searchPoint);

module.exports = router;
