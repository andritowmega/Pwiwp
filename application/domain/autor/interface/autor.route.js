var express = require('express');
var router = express.Router();
const AutorController = require("./autor.controller");

router.get('/', AutorController.Index);
module.exports = router;
