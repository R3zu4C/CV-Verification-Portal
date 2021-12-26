const { fetchAllOrg } = require("../controllers/orgController");

const router = require("express").Router();


// Getting a list of all the Organizations and their org_id
router.get("/", fetchAllOrg);

module.exports = router;
