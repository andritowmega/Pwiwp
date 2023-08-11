class AutorController {
  static async Index(req, res) {
    res.render("autor/index", {my:req.datatoken});
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
        msg: "Registro correcto. Redireccionando...",
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
  static async Login(req, res) {
    const AutorService = require("../services/autor.service");
    const data = await AutorService.Login(req.body).catch((e) => {
      console.error("USER CONTROLLER: cant not create user");
      return null;
    });
    if (data) {
      return res.json({
        status: "ok",
        msg: "Registro correcto. Redireccionando...",
        data: {
          token: data.token
        },
      });
    } else {
      return res.json({
        status: "error",
        msg: "Error al registrarse, algún dato ya es repetido",
        data: null,
      });
    }
  }
  static async ViewGetAllUsers(req, res) {
    const AutorService = require("../services/autor.service");
    let data = null
    if (req.query?.name !== ""){
      data = await AutorService.SearchUsersByName(req.query).catch((e) => {
        console.error("USER CONTROLLER: cant not find users");
        return null;
      });
    } else{
      data = await AutorService.GetAllUsers().catch((e) => {
        console.error("USER CONTROLLER: cant not get all user");
        return null;
      });
    }
    if (data) {
      return res.render("autor/users",{users:data,my:req.datatoken})
    } else {
      return res.render("autor/users",{users:null,my:req.datatoken})
    }
  }
  static async ViewGetByNickname(req, res) {
    const AutorService = require("../services/autor.service");
    let data = null
    if (req.params?.nickname){
      data = await AutorService.getByNickName(req.params).catch((e) => {
        console.error("USER CONTROLLER: cant not find users");
        return null;
      });
    } else{
      data = await AutorService.GetAllUsers().catch((e) => {
        console.error("USER CONTROLLER: cant not get all user");
        return null;
      });
    }
    if (data) {
      return res.render("autor/profile",{user:data,my:req.datatoken})
    } else {
      return res.render("autor/profile",{user:null,my:req.datatoken})
    }
  }
}

module.exports = AutorController;
