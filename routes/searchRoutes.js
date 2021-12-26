const { searchPoint } = require("../controllers/searchController");

const router = require("express").Router();


// Getting Search results
router.post("/", searchPoint);

module.exports = router;
