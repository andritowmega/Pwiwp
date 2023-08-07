var express = require("express");
var router = express.Router();
const FeedController = require("./feed.controller");
const auth = require("../../../utils/auth");

router.get(
  "/post/:id",
  auth.middlewareUser,
  FeedController.GetSinglePublication
);

//apis
router.post(
  "/api/publication/push",
  auth.middlewareUserApi,
  FeedController.PublishPublication
);
router.post(
  "/api/publication/getall",
  auth.middlewareUserApi,
  FeedController.GetPublications
);
router.post(
  "/api/my/publication/getall",
  auth.middlewareUserApi,
  FeedController.GetPublicationsByUserId
);
router.post(
  "/api/:id/publication/getall",
  auth.middlewareUserApi,
  FeedController.GetPublicationsByUserId
);
router.post(
  "/api/post/comments/create",
  auth.middlewareUserApi,
  FeedController.CreateComment
);
router.post(
  "/api/post/:id/comments/get",
  auth.middlewareUserApi,
  FeedController.GetCommentsByIdPost
);

module.exports = router;
