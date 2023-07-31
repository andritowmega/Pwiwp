class UserService {
    static async CreateUser(data) {
        const loginRepository = require("../domain/repository/models/login.model");
        //const body = data;
        //se insertan estos datos de prueba
        const body = {email:"acarrascoq@unsa.edu.pe",password:"123456789",user_id:"1"}
        const dataResponse = await loginRepository.create(body).catch((err) => {
          console.error("USER SERVICE - can not create user", err);
          return null;
        });
        return dataResponse;
      }
}

module.exports = UserService;