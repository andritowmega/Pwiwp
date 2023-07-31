var express = require('express');
var router = express.Router();
const TestingController = require("../controllers/testing.controller");
const InicioSesionController = require("../controllers/iniciosesion.controller");
/* GET home page. */
router.get('/', TestingController.GetAll);
router.get('/prueba-andres', InicioSesionController.GetAll);

module.exports = router;
