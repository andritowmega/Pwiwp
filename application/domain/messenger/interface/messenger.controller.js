class messengerController {
    static async registMessage(req, res) {
        const messageService = require("../services/messageDomain.service");
        req.body.userid = req.datatoken.id;
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
            msg: "Error al registrarse",
            data: null,
          });
        }
      }
}

module.exports = messengerController;