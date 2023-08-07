var express = require('express');
var router = express.Router();
const messengerController = require("./messenger.controller");
const auth = require("../../../utils/auth")

router.get('/:nickname/chat',auth.middlewareUser, messengerController.Chat);
//apis
router.post('/api/registMessage',auth.middlewareUserApi, messengerController.registMessage);
router.post('/api/getMessages',auth.middlewareUserApi, messengerController.getMessages);
module.exports = router;