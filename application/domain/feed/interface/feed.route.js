var express = require('express');
var router = express.Router();
const FeedController = require("./feed.controller");
const auth = require("../../../utils/auth");

//apis
router.post('/api/publication/push',auth.middlewareUserApi, FeedController.PublishPublication);
router.post('/api/publication/getall', FeedController.GetPublications);
module.exports = router;
