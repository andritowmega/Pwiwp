class UserController {
  static async GetAll(req, res) {
    const userService = require("../../services/user.service");
    const data = await userService.CreateUser(req.body).catch((e) => {
      console.error("USER CONTROLLER: cant not create user");
      return null;
    });
    if (data) {
      res.render("create", { data: data});
    } else {
      res.render("create", { data: null });
    }
  }
}

module.exports = UserController;
