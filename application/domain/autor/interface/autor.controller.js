class AutorController {
  static async Index(req, res) {
    res.render("autor/index");
  }
  static async Register(req, res) {
    res.render("autor/register");
  }
  static async RegisterAccount(req, res) {
    const AutorService = require("../services/autor.service");
    const data = await AutorService.AccountProfile(req.body).catch((e) => {
      console.error("USER CONTROLLER: cant not create user");
      return null;
    });
    if (data) {
      return res.json({
        status: "ok",
        msg: "Registro correcto, puede iniciar sesión",
        data: null,
      });
    } else {
      return res.json({
        status: "error",
        msg: "Error al registrarse, algún dato ya es repetido",
        data: null,
      });
    }
  }
}

module.exports = AutorController;
