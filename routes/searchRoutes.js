const { searchPoint } = require("../controllers/searchController");

const router = require("express").Router();


// Getting Search results
router.post("/search", searchPoint);

module.exports = router;
