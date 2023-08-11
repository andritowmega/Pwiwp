let express = require('express');
let router = express.Router();
const AutorController = require("./autor.controller");
const auth = require("../../../utils/auth");

router.get('/', auth.middlewareUser, AutorController.Index);
router.get('/register', AutorController.Register);
router.get('/users', auth.middlewareUser, AutorController.ViewGetAllUsers);
router.get('/profile/:nickname', auth.middlewareUser,AutorController.ViewGetByNickname);

//apis
router.post('/api/register', AutorController.RegisterAccount);
router.post('/api/login', AutorController.Login);
module.exports = router;
