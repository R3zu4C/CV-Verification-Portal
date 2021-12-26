const fs = require("fs");

const router = require("express").Router();

router.get("/", async (req, res) => {
  
  res.end(fs.readFileSync("./views/index.html"));
});

module.exports = router;
