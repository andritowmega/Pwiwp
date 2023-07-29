class InicioSesionController {
    static async GetAll(req, res) {
      const inicioSesionModel = require("../models/iniciosesion.model");
      const dataSesion = await inicioSesionModel.get().catch((e) => {
        console.error("TESTING CONTROLLER - can not get all iniciosesion", err);
        return null;
      });
      console.log("sesion",dataSesion);
      if (dataSesion) {
        res.render("testing/session", { session: dataSesion });
      } else {
        res.render("testing/session", { session: null });
      }
    }
  }
  
  module.exports = InicioSesionController;
  