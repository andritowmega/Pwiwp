var express = require('express');
var router = express.Router();
const AutorController = require("./autor.controller");

router.get('/', AutorController.Index);
router.get('/login', AutorController.Login);
module.exports = router;
