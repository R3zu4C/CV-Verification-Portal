const {
    flagPoint,
    acceptFlag,
    declineFlag,
    suggestUser
} = require("../controllers/flagController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = require("express").Router();

// Adding a Point thru POST request

router.post("/:pointId", requireAuth, flagPoint);

router.post("/decline/:flagId", requireAuth, declineFlag)

router.post("/accept/:flagId", requireAuth, acceptFlag)

// body should contain `remark`
router.post("/suggest/:flagId", requireAuth, suggestUser)

module.exports = router;
