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
          "SERVICE ACCOUNT PROFILE: cant create account profile",
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
}

module.exports = FeedService;
