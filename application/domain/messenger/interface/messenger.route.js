let express = require('express');
let router = express.Router();
const MessengerController = require("./messenger.controller");
const auth = require("../../../utils/auth")

router.get('/:nickname/chat',auth.middlewareUser, MessengerController.Chat);
//apis
router.post('/api/registMessage',auth.middlewareUserApi, MessengerController.registMessage);
router.post('/api/getMessages',auth.middlewareUserApi, MessengerController.getMessages);
module.exports = router;