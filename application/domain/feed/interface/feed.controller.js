class FeedController {
  static async PublishPublication(req, res) {
    const FeetService = require("../services/feed.service");
    req.body.id = req.datatoken.id;
    const data = await FeetService.PublishPublication(req.body).catch((e) => {
      console.error("Feed CONTROLLER: cant not publish");
      return null;
    });
    if (data) {
      return res.json({
        status: "ok",
        msg: "Post publicado",
        data: data,
      });
    } else {
      return res.json({
        status: "error",
        msg: "Error al publicar post",
        data: null,
      });
    }
  }
  static async GetPublications(req, res) {
    const FeedService = require("../services/feed.service");
    const data = await FeedService.GetPosts().catch((e) => {
      console.error("Feed CONTROLLER: cant not get");
      return null;
    });
    if (data) {
      return res.json({
        status: "ok",
        msg: "Todas las Publicaciones",
        data: data,
      });
    }
    return res.json({
      status: "error",
      msg: "Error al obtener publicaciones",
      data: null,
    });
  }
  static async GetSinglePublication(req, res) {
    const FeedService = require("../services/feed.service");
    const data = await FeedService.GetSinglePost(req.params).catch((e) => {
      console.error("Feed CONTROLLER: cant not get");
      return null;
    });
    if (data) {
      return res.render("feed/singlePost",{post:data,my:req.datatoken})
    }
    return res.render("feed/singlePost",{post:null,my:req.datatoken})
  }
  static async GetPublicationsByUserId(req, res) {
    const FeedService = require("../services/feed.service");
    let data = null
    if(req.params && req.params.id){
      data = await FeedService.GetPostsByUserId(req.params).catch((e) => {
        console.error("Feed CONTROLLER: cant not get");
        return null;
      });
    }else{
      data = await FeedService.GetPostsByUserId(req.datatoken).catch((e) => {
        console.error("Feed CONTROLLER: cant not get");
        return null;
      });
    }
    if (data) {
      return res.json({
        status: "ok",
        msg: "Todas las Publicaciones",
        data: data,
      });
    }
    return res.json({
      status: "error",
      msg: "Error al obtener publicaciones",
      data: null,
    });
  }
  static async CreateComment(req, res) {
    const FeedService = require("../services/feed.service");
    req.body.user_id=req.datatoken.id;
    const data = await FeedService.CreateComment(req.body).catch((e) => {
      console.error("Feed CONTROLLER: cant not create comment");
      return null;
    });
    if (data) {
      return res.json({
        status: "ok",
        msg: "comentario creado",
        data: null,
      });
    }
    return res.json({
      status: "error",
      msg: "Error al crear comentario",
      data: null,
    });
  }
  static async GetCommentsByIdPost(req, res) {
    const FeedService = require("../services/feed.service");
    const data = await FeedService.GetCommentsByIdPost(req.params).catch((e) => {
      console.error("Feed CONTROLLER: cant not create comment");
      return null;
    });
    if (data) {
      return res.json({
        status: "ok",
        msg: "Comentarios obtenidos",
        data: data,
      });
    }
    return res.json({
      status: "error",
      msg: "No se pudo obtener comentarios",
      data: null,
    });
  }
  static async CreateReaction(req, res) {
    const FeedService = require("../services/feed.service");
    req.body.user_id = req.datatoken.id;
    const data = await FeedService.CreateReaction(req.body).catch((e) => {
      console.error("Feed CONTROLLER: cant not create comment");
      return null;
    });
    if (data) {
      return res.json({
        status: "ok",
        msg: "Reacción creada",
        data: null,
      });
    }
    return res.json({
      status: "error",
      msg: "Error al crear reacción",
      data: null,
    });
  }
  static async GetReactions(req, res) {
    const FeedService = require("../services/feed.service");
    const data = await FeedService.GetReactionsById(req.params).catch((e) => {
      console.error("Feed CONTROLLER: cant not get reactions");
      return null;
    });
    if (data) {
      return res.json({
        status: "ok",
        msg: "Se obtuvo reacciones",
        data: data,
        my: req.datatoken.id
      });
    }
    return res.json({
      status: "error",
      msg: "Error al obtener reacciones",
      data: null,
    });
  }
  static async DeleteReactions(req, res) {
    const FeedService = require("../services/feed.service");
    req.params.user_id = req.datatoken.id;
    const data = await FeedService.DeleteReactions(req.params).catch((e) => {
      console.error("Feed CONTROLLER: cant not delete reactions");
      return null;
    });
    if (data) {
      return res.json({
        status: "ok",
        msg: "Se elimino",
        data: null,
      });
    }
    return res.json({
      status: "error",
      msg: "Error al eliminar",
      data: null,
    });
  }
}

module.exports = FeedController;
