class AutorController {
  static async Index(req, res) {
    res.render("autor/index",);
  }
  static async Login(req, res) {
    const userService = require("../../services/user.service");
    const data = await userService.CreateUser(req.body).catch((e) => {
      console.error("USER CONTROLLER: cant not create user");
      return null;
    });
    if (data) {
      res.render("create", { data: data });
    } else {
      res.render("create", { data: null });
    }
  }
}

module.exports = AutorController;
