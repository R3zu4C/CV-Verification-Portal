const { fetchAllOrg , createOrg, getOrgWithChildren, getOrgsWithChildren, updateOrg, deleteOrg} = require("../controllers/orgController");
const {requireAuth} = require("../middleware/authMiddleware");
const router = require("express").Router();


// Getting a list of all the Organizations and their org_id
router.get("/", fetchAllOrg);

router.post("/create", requireAuth, createOrg);

router.get("/all", getOrgsWithChildren);

router.post("/update",requireAuth, updateOrg);

router.delete("/delete", requireAuth, deleteOrg);

router.get("/:org_id", getOrgWithChildren);


module.exports = router;
