
# Pwipw: RED SOCIAL

## Propósito
La motivación para la realización es ayudar a la comunicación en la sociedad con el fin
de mejorar la libertad de expresión y la libertad de información. Ello implica que nuestros
usuarios puedan compartir información al momento en una época donde las personas
necesitamos interconexión al instante.

## Funcionalidades
### Diagrama de Casos de Uso
![image](https://github.com/andritowmega/Pwiwp/assets/104222114/f6b442f2-efbc-40b7-a34d-80dbe07ffca2)
### Prototipos
Algunas imágenes de los prototipos iniciales, que al final tuvieron que cambiar
![Ajustes@1x](https://github.com/andritowmega/Pwiwp/assets/104222114/b1b87420-8e93-45b5-bcde-3263f218481d)
![Inicio@1x](https://github.com/andritowmega/Pwiwp/assets/104222114/2b9fcad3-fc35-4b35-93e4-f5ecaddcc99f)
![publicar pwipp@1x](https://github.com/andritowmega/Pwiwp/assets/104222114/9620cdb6-23a3-41d3-9d46-3f3a9612ebd4)
![Repwippear@1x](https://github.com/andritowmega/Pwiwp/assets/104222114/eb77888c-470d-4bcc-a87c-236ec8ceb1c1)


## Modelo de dominio
![DDD](https://github.com/andritowmega/Pwiwp/assets/104222114/a1d058c2-a283-4716-b5e8-6ce20c43c747)


## Arquitectura y patrones

## Prácticas de codificación limpia aplicadas

## Estilos de programación Aplicados

## Principios SOLID aplicados

## Conceptos DDD aplicados

# LAB 9: ESTILOS DE LA PROGRAMACIÓN
Estilo 1 - Aspect: Descomponer el problema con formas de abstracción.

```javascript
class AutorService {
  static async AccountProfile(data) {
    const accountEntity = require("../entities/account.entity");
    const userEntity = require("../entities/user.entity");

    const userResponse = await userEntity.create(data).catch((e) => {
      console.error("SERVICE ACCOUNT PROFILE: cant create account profile", e);
      return null;
    });
    if (userResponse) {
      data.user_id = userResponse.id;
      const accountResponse = await accountEntity.create(data).catch((e) => {
        console.error(
          "SERVICE ACCOUNT PROFILE: cant create account profile",
          e
        );
        return null;
      });
      return accountResponse;
    }
    return null;
  }
  static async Login(data) {
    const accountEntity = require("../entities/account.entity");
    const accountResponse = await accountEntity
      .getByEmail(data.email)
      .catch((e) => {
        console.error("SERVICE ACCOUNT LOGIN: cant find by email", e);
        return null;
      });
    if (accountResponse && accountResponse.password) {
      const auth = require("../../../utils/auth");
      const ok = await auth.comparePassword(data.password, accountResponse.password);
      if (ok) {
        const newToken = await auth.newTokenUser(accountResponse);
        accountResponse.token = newToken;
        return accountResponse;
      }
      return null;
    }
    return null;
  }
  static async GetAllUsers() {
    const accountEntity = require("../entities/account.entity");
    const accountResponse = await accountEntity
      .getAll()
      .catch((e) => {
        console.error("SERVICE ACCOUNT LOGIN: cant get all", e);
        return null;
      });
    return accountResponse;
  }
  static async SearchUsersByName(data) {
    const accountEntity = require("../entities/account.entity");
    const accountResponse = await accountEntity
      .searchUserByName(data)
      .catch((e) => {
        console.error("SERVICE ACCOUNT LOGIN: cant find users", e);
        return null;
      });
    return accountResponse;
  }
  static async getByNickName(data) {
    const accountEntity = require("../entities/account.entity");
    const accountResponse = await accountEntity
      .getByUserByNick(data)
      .catch((e) => {
        console.error("SERVICE ACCOUNT LOGIN: cant get by nickname", e);
        return null;
      });
    return accountResponse;
  }
}

module.exports = AutorService;

```

Estilo 2 - Letterbox: De los problemas más grandes, descomponer a cosas de acuerdo al dominio

```javascript
const connectionDb = require("../../../config/dbconnections");
module.exports = {
  async create({ email, password, user_id, nickname }) {
    return new Promise(async (resolve, reject) => {
      const bcrypt = require("bcryptjs");
      password = bcrypt.hashSync(password, 8);
      const connection = connectionDb();
      const data = await connection
        .query(
          "INSERT INTO account (email,password,user_id,nickname) VALUES ($1,$2,$3,$4) RETURNING *",
          [email, password, user_id, nickname]
        )
        .catch((err) => {
          console.error("MODEL Account: Can not create Account", err);
          return null;
        });
      connection.end();
      if (data && data.rows && data.rows.length > 0)
        return resolve(data.rows[0]);
      return reject(null);
    });
  },
  async getByEmail(email) {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query(
          "SELECT a.email,a.password,a.user_id,a.nickname,u.firstname,u.lastname FROM account a INNER JOIN userinfo u ON a.user_id = u.id WHERE a.email = $1",[email]
        )
        .catch((err) => {
          console.error("MODEL Account: Can not get By Email", err);
          return null;
        });
      connection.end();
      if (data && data.rows && data.rows.length > 0)
        return resolve(data.rows[0]);
      return reject(null);
    });
  },
  async getAll(){
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query(
          "SELECT a.email,a.nickname,u.* FROM account a INNER JOIN userinfo u ON a.user_id = u.id ORDER BY a.user_id DESC"
        )
        .catch((err) => {
          console.error("MODEL Account: Can not get All Users", err);
          return null;
        });
      connection.end();
      if (data && data.rows && data.rows)
        return resolve(data.rows);
      return reject(null);
    });
  },
  async searchUserByName({name}){
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query(
          "SELECT u.*,a.email,a.nickname FROM userinfo u INNER JOIN account a ON u.id = a.user_id WHERE u.firstname LIKE $1",['%' + name + '%']
        )
        .catch((err) => {
          console.error("MODEL Account: Can not get All Users", err);
          return null;
        });
      connection.end();
      if (data && data.rows && data.rows)
        return resolve(data.rows);
      return reject(null);
    });
  },
  async getByUserByNick({nickname}) {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query(
          "SELECT a.email,a.nickname,u.* FROM account a INNER JOIN userinfo u ON a.user_id = u.id WHERE a.nickname=$1",[nickname]
        )
        .catch((err) => {
          console.error("MODEL Account: Can not get By NickName", err);
          return null;
        });
      connection.end();
      if (data && data.rows && data.rows.length > 0)
        return resolve(data.rows[0]);
      return reject(null);
    });
  },
};

```

Estilo 2 - Letterbox: verificar argumentos (datos de sesión correctos para continuar navegando en la plataforma)

```javascript
middlewareUser: async function (req, res, next) {
    //console.log("req.cookies",req.cookies)
    let tokenBrowser =
      req.body.token ||
      req.query.token ||
      req.headers["authorization"] ||
      req.cookies.token ||
      req.cookies.dpwi;

    if (!tokenBrowser)
      return res.render("autor/login",);
    const JWT = require("jsonwebtoken");
    const configToken = require("../config/token");
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined")
      tokenBrowser = bearerHeader.split(" ")[1];

    JWT.verify(
      tokenBrowser,
      configToken.TOKEN_SECRET_USER,
      async (err, decoded) => {
        if (err) {
          console.error("Error for validating user token", err.name);
          return res.render("autor/login",);
        } else {
          req.datatoken = decoded;
          return next();
        }
      }
    );
  },
```

# LAB 10: CLEAN CODE

- Intenta siempre explicarte en código.
- No seas redundante.
- No agregue ruido obvio.
- No use comentarios de llaves de cierre.
- No comente el código. Solo elimina.
- Capitalize SQL Special Words

```javascript
class AutorService {
  //obtener perfil y datos de usuario
  static async AccountProfile(data) {
    const accountEntity = require("../entities/account.entity");
    const userEntity = require("../entities/user.entity");

    const userResponse = await userEntity.create(data).catch((e) => {
      console.error("SERVICE ACCOUNT PROFILE: cant create account profile", e);
      return null;
    });
    if (userResponse) {
      data.user_id = userResponse.id;
      const accountResponse = await accountEntity.create(data).catch((e) => {
        console.error(
          "SERVICE ACCOUNT PROFILE: cant create account profile",
          e
        );
        return null;
      });
      return accountResponse;
    }
    return null;
  }
  //iniciar sesión con email y password
  static async Login(data) {
    const accountEntity = require("../entities/account.entity");
    const accountResponse = await accountEntity
      .getByEmail(data.email)
      .catch((e) => {
        console.error("SERVICE ACCOUNT LOGIN: cant find by email", e);
        return null;
      });
    if (accountResponse && accountResponse.password) {
      const auth = require("../../../utils/auth");
      const ok = await auth.comparePassword(data.password, accountResponse.password);
      if (ok) {
        const newToken = await auth.newTokenUser(accountResponse);
        accountResponse.token = newToken;
        return accountResponse;
      }
      return null;
    }
    return null;
  }
  //obtener todos los usuarios
  static async GetAllUsers() {
    const accountEntity = require("../entities/account.entity");
    const accountResponse = await accountEntity
      .getAll()
      .catch((e) => {
        console.error("SERVICE ACCOUNT LOGIN: cant get all", e);
        return null;
      });
    return accountResponse;
  }
  //buscar por nombre
  static async SearchUsersByName(data) {
    const accountEntity = require("../entities/account.entity");
    const accountResponse = await accountEntity
      .searchUserByName(data)
      .catch((e) => {
        console.error("SERVICE ACCOUNT LOGIN: cant find users", e);
        return null;
      });
    return accountResponse;
  }
  //buscar por nickname
  static async getByNickName(data) {
    const accountEntity = require("../entities/account.entity");
    const accountResponse = await accountEntity
      .getByUserByNick(data)
      .catch((e) => {
        console.error("SERVICE ACCOUNT LOGIN: cant get by nickname", e);
        return null;
      });
    return accountResponse;
  }
}

module.exports = AutorService;


const connectionDb = require("../../../config/dbconnections");
module.exports = {
  async create({ email, password, user_id, nickname }) {
    return new Promise(async (resolve, reject) => {
      const bcrypt = require("bcryptjs");
      password = bcrypt.hashSync(password, 8);
      const connection = connectionDb();
      const data = await connection
        .query(
          "INSERT INTO account (email,password,user_id,nickname) VALUES ($1,$2,$3,$4) RETURNING *",
          [email, password, user_id, nickname]
        )
        .catch((err) => {
          console.error("MODEL Account: Can not create Account", err);
          return null;
        });
      connection.end();
      if (data && data.rows && data.rows.length > 0)
        return resolve(data.rows[0]);
      return reject(null);
    });
  },
  async getByEmail(email) {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query(
          "SELECT a.email,a.password,a.user_id,a.nickname,u.firstname,u.lastname FROM account a INNER JOIN userinfo u ON a.user_id = u.id WHERE a.email = $1",[email]
        )
        .catch((err) => {
          console.error("MODEL Account: Can not get By Email", err);
          return null;
        });
      connection.end();
      if (data && data.rows && data.rows.length > 0)
        return resolve(data.rows[0]);
      return reject(null);
    });
  },
  async getAll(){
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query(
          "SELECT a.email,a.nickname,u.* FROM account a INNER JOIN userinfo u ON a.user_id = u.id ORDER BY a.user_id DESC"
        )
        .catch((err) => {
          console.error("MODEL Account: Can not get All Users", err);
          return null;
        });
      connection.end();
      if (data && data.rows && data.rows)
        return resolve(data.rows);
      return reject(null);
    });
  },
  async searchUserByName({name}){
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query(
          "SELECT u.*,a.email,a.nickname FROM userinfo u INNER JOIN account a ON u.id = a.user_id WHERE u.firstname LIKE $1",['%' + name + '%']
        )
        .catch((err) => {
          console.error("MODEL Account: Can not get All Users", err);
          return null;
        });
      connection.end();
      if (data && data.rows && data.rows)
        return resolve(data.rows);
      return reject(null);
    });
  },
  async getByUserByNick({nickname}) {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query(
          "SELECT a.email,a.nickname,u.* FROM account a INNER JOIN userinfo u ON a.user_id = u.id WHERE a.nickname=$1",[nickname]
        )
        .catch((err) => {
          console.error("MODEL Account: Can not get By NickName", err);
          return null;
        });
      connection.end();
      if (data && data.rows && data.rows.length > 0)
        return resolve(data.rows[0]);
      return reject(null);
    });
  },
};


```



# LAB 10: PRINCIPIOS SOLID

- Interface segregation principle(ISP).

```javascript

```
