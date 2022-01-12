const { fetchAllOrg , createOrg, getOrgWithChildren, getOrgsWithChildren, updateOrg, deleteOrg} = require("../controllers/orgController");
const {requireAuth} = require("../middleware/authMiddleware");
const router = require("express").Router();


// Getting a list of all the Organizations and their org_id
router.get("/", fetchAllOrg);


//? work in progess, dont use these routes
router.post("/create", requireAuth, createOrg);

router.get("/all", getOrgsWithChildren); //! error: Organization table is not unique

router.post("/update",requireAuth, updateOrg);

router.delete("/delete", requireAuth, deleteOrg);

router.get("/:org_id", getOrgWithChildren); //! error: Organization table is not uniques


module.exports = router;
