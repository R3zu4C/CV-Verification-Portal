const { fetchAllOrg } = require('../controllers/Organization');
const { addPoint, uploadProof } = require('../controllers/Point');
const fs = require("fs");
const { pointRequest } = require('../controllers/Notifications');

const router = require('express').Router();

router.get('/', async (req, res) => {
  res.end(fs.readFileSync('./views/index.html'));
});
// Adding a Point thru POST request
router.post('/point',pointRequest, addPoint);

// Getting a list of all the Organizations and their org_id
router.get('/orgs', fetchAllOrg)

// Proof uploading service
router.post('/upload', uploadProof);

module.exports = router;