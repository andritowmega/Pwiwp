class messengerController {
  static async Chat(req, res) {
    const AutorService = require("../../autor/services/autor.service");
    let data = null;
    data = await AutorService.getByNickName(req.params).catch((e) => {
      console.error("USER CONTROLLER: cant not find users");
      return null;
    });
    if (data) {
      return res.render("messenger/chat", { chat: data, my: req.datatoken });
    } else {
      return res.render("messenger/chat", { caht: null, my: req.datatoken });
    }
  }
  static async registMessage(req, res) {
    const messageService = require("../services/messageDomain.service");
    req.body.userid = req.datatoken.id;
    let user1 = Number(req.body.user2)
    let chatid = user1 > req.datatoken.id ? user1+"-"+req.datatoken.id : req.datatoken.id + "-" + user1
    req.body.chatid = chatid;
    const data = await messageService.createMessage(req.body).catch((e) => {
      console.error("MESSAGE CONTROLLER: can not regist message");
      return null;
    });
    if (data) {
      return res.json({
        status: "ok",
        msg: "Registro de mensaje enviado",
        data: null,
      });
    } else {
      return res.json({
        status: "error",
        msg: "No se pudo registrar el mensaje",
        data: null,
      });
    }
  }
  static async chatMessage(req, res) {
    const messageService = require("../services/messageDomain.service");
    req.body.userid = req.datatoken.id;
    let user1 = Number(req.body.user2)
    let chatid = user1 > req.datatoken.id ? user1+"-"+req.datatoken.id : req.datatoken.id + "-" + user1
    req.body.chatid = chatid;
    const data = await messageService.createMessage(req.body).catch((e) => {
      console.error("MESSAGE CONTROLLER: can not regist message");
      return null;
    });
    if (data) {
      return res.json({
        status: "ok",
        msg: "Registro de mensaje enviado",
        data: null,
      });
    } else {
      return res.json({
        status: "error",
        msg: "No se pudo registrar el mensaje",
        data: null,
      });
    }
  }
  static async getMessages(req, res) {
    const messageService = require("../services/messageDomain.service");
    let user1 = Number(req.body.user1)
    let chatid = user1 > req.datatoken.id ? user1+"-"+req.datatoken.id : req.datatoken.id + "-" + user1
    req.body.id = chatid;
    const data = await messageService.getMessage(req.body).catch((e) => {
      console.error("MESSAGE CONTROLLER: can not regist message");
      return null;
    });
    if (data) {
      console.log("messages",data)
      return res.json({
        status: "ok",
        msg: "Mensajes obtenidos",
        data: data,
        my:req.datatoken.id
      });
    } else {
      return res.json({
        status: "error",
        msg: "No se pudo obntener los mensajes",
        data: null,
      });
    }
  }
}

module.exports = messengerController;
