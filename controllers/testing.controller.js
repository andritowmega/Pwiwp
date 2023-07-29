class TestingController {
  static async GetAll(req, res) {
    const tableTestModel = require("../models/tabletest.model");
    const inicioSesionModel = require("../models/iniciosesion.model");
    const data = await tableTestModel.get(req.params.slug).catch((err) => {
      console.error("TESTING CONTROLLER - can not get all project", err);
      return null;
    });
    const dataSesion = await inicioSesionModel.get().catch((e) => {
      console.error("TESTING CONTROLLER - can not get all iniciosesion", err);
      return null;
    });
    if (data) {
      res.render("testing/index", { data: data, session: dataSesion });
    } else {
      res.render("testing/index", { data: null, session: null });
    }
  }
}

module.exports = TestingController;
