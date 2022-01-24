const { fetchUserById } = require("../controllers/userController");
const {requireAuth} = require("../middleware/authMiddleware");
const router = require("express").Router();


// Getting a list of all the Organizations and their org_id
router.get("/find/:user_id", requireAuth, fetchUserById);

module.exports = router;