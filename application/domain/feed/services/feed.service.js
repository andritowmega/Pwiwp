class FeedService {
  static async PublishPublication(data) {
    const publicationEntity = require("../entities/publication.entity");
    const userResponse = await publicationEntity.create(data).catch((e) => {
      console.error("SERVICE ACCOUNT PROFILE: cant create account profile", e);
      return null;
    });
    return userResponse;
  }
  static async GetPosts() {
    const publicationEntity = require("../entities/publication.entity");
    const publicationResponse = await publicationEntity
      .getPublications()
      .catch((e) => {
        console.error(
          "SERVICE ACCOUNT PROFILE: cant create account profile",
          e
        );
        return null;
      });
    return publicationResponse;
  }
  static async GetSinglePost(data) {
    const publicationEntity = require("../entities/publication.entity");
    const publicationResponse = await publicationEntity
      .getPublicationById(data)
      .catch((e) => {
        console.error(
          "SERVICE ACCOUNT PROFILE: cant not get single post",
          e
        );
        return null;
      });
    return publicationResponse;
  }
  static async GetPostsByUserId(data) {
    const publicationEntity = require("../entities/publication.entity");
    const publicationResponse = await publicationEntity
      .getPublicationsByUserId(data)
      .catch((e) => {
        console.error(
          "SERVICE ACCOUNT PROFILE: cant create account profile",
          e
        );
        return null;
      });
    return publicationResponse;
  }
  static async GetCommentsByIdPost(data) {
    const commentEntity = require("../entities/comment.entity");
    const commentResponse = await commentEntity
      .getByIdPost(data)
      .catch((e) => {
        console.error(
          "SERVICE ACCOUNT PROFILE: cant get Comment",
          e
        );
        return null;
      });
    return commentResponse;
  }
  static async CreateComment(data) {
    const commentEntity = require("../entities/comment.entity");
    const commentResponse = await commentEntity
      .create(data)
      .catch((e) => {
        console.error(
          "SERVICE ACCOUNT PROFILE: cant create Comment",
          e
        );
        return null;
      });
    return commentResponse;
  }
  static async CreateReaction(data) {
    const reactionEntity = require("../entities/reaction.entity");
    const reactionResponse = await reactionEntity
      .create(data)
      .catch((e) => {
        console.error(
          "SERVICE ACCOUNT PROFILE: cant create Reaction",
          e
        );
        return null;
      });
    return reactionResponse;
  }
  static async GetReactionsById(data) {
    const reactionEntity = require("../entities/reaction.entity");
    const reactionResponse = await reactionEntity
      .getByIdPost(data)
      .catch((e) => {
        console.error(
          "SERVICE ACCOUNT PROFILE: cant get Reaction",
          e
        );
        return null;
      });
    return reactionResponse;
  }
  static async DeleteReactions(data) {
    const reactionEntity = require("../entities/reaction.entity");
    const reactionResponse = await reactionEntity
      .DeleteReaction(data)
      .catch((e) => {
        console.error(
          "SERVICE ACCOUNT PROFILE: cant delete reaction",
          e
        );
        return null;
      });
    return reactionResponse;
  }
}

module.exports = FeedService;
