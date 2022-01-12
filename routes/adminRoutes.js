
const { createAdmin, createRole, changeRole, getRoles, getPermissions, getOrgs, getAdmins, deleteAdmin, deleteRole } = require("../controllers/adminController");
const { requireAuth } = require("../middleware/authMiddleware");
const router = require("express").Router();

router.post("/create/admin", requireAuth, createAdmin);

router.post("/create/role", requireAuth, createRole);

router.post("/update/role", requireAuth, changeRole);

// get all roles with its permissions and admins
router.get("/get/roles", requireAuth, getRoles);

// get all permissions
router.get("/get/permissions", requireAuth, getPermissions);

// gets all the admins and their roles and permissions
router.get("/get/admins", requireAuth, getAdmins);

// get all the orgs with their roles and permissions
router.get("/get/orgs", requireAuth, getOrgs);

router.post("/delete/admin", requireAuth, deleteAdmin);

router.post("/delete/role", requireAuth, deleteRole);

module.exports = router;