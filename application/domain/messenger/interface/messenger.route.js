var express = require('express');
var router = express.Router();
const messengerController = require("./messenger.controller");
const auth = require("../../../utils/auth")

router.post('/api/registMessage',auth.middlewareUserApi, messengerController.registMessage);
module.exports = router;