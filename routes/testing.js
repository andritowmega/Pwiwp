var express = require('express');
var router = express.Router();
const TestingController = require("../controllers/testing.controller");
/* GET home page. */
router.get('/', TestingController.GetAll);

module.exports = router;
