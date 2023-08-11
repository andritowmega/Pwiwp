
# Pwipw: RED SOCIAL

## URL DEMO: https://piw.smarttech.pe/

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
![image](https://github.com/andritowmega/Pwiwp/assets/104222114/0bcf9b7f-5b36-4c57-81a3-9463a5a2ee44)

## Prácticas de codificación limpia aplicadas (CLEAN CODE)
### 1. Deep nesting
#### Descripción
A veces usamos bucles anidados que son difíciles de entender. La forma de manejar eso es extraer todos los bucles en funciones separadas.
#### Evidencia
``` javascript
try {
      const data = await connection.query(
        "INSERT INTO message (content, chatid, userid) VALUES ($1, $2, $3) RETURNING *",
        [content, chatid, userid]
      );

      connection.end();
      if (data?.rows?.length > 0) {
        return data.rows[0];
      } 
      return null;
    } catch (err) {
      console.error("MODEL message: Can not create message", err);
      connection.end();
      return null;
    }
```

### 2. Reglas de nombres
#### Descripción
* Elija nombres descriptivos e inequívocos.
* Hacer una distinción significativa.
* Usa nombres pronunciables.
* Utilice nombres buscables.
* Reemplace los números mágicos con constantes con nombre.
* Evite las codificaciones. No agregue prefijos ni escriba información.
#### Evidencia
``` javascript
async getByIdPost({ id }) {
    const connection = connectionDb();

    try {
      const data = await connection.query(
        "SELECT * FROM reaction WHERE idpublication = $1",
        [id]
      );

      connection.end();
      return data?.rows || null;
    } catch (err) {
      console.error("MODEL Reaction: Can not get Reactions By Post Id", err);
      connection.end();
      return null;
    }
  },
```

### 3. Consejos de comprensibilidad
#### Despcripción 
* Se consistente. Si haces algo de cierta manera, haz todas las cosas similares de la misma manera.
* Usa variables explicativas.
* Encapsular las condiciones de contorno. Las condiciones de contorno son difíciles de seguir. Ponga el procesamiento para ellos en un solo lugar.
* Prefiere los objetos de valor dedicados al tipo primitivo.
* Evita la dependencia lógica.
* No escriba métodos que funcionen correctamente dependiendo de otra cosa en la misma clase.
* Evita los condicionales negativos.
#### Evidencia
``` javascript
router.post(
  "/api/publication/push",
  auth.middlewareUserApi,
  FeedController.PublishPublication
);
router.post(
  "/api/publication/getall",
  auth.middlewareUserApi,
  FeedController.GetPublications
);
router.post(
  "/api/my/publication/getall",
  auth.middlewareUserApi,
  FeedController.GetPublicationsByUserId
);
```

### 4. Reglas de funciones
#### Descripción
* Pequeña.
* Haz una cosa.
* Utilice nombres descriptivos.
* Prefiere menos argumentos.
* No tiene efectos secundarios.
* No use argumentos de bandera. Divida el método en varios métodos independientes que se pueden llamar desde el cliente sin la bandera.
#### Evidencia
``` javascript
function closeSession() {
  let path = "/";
  easyFetch.setCookie("dpwi", "", (path));
  location.replace("/");
}
```

### 5. Objetos y estructuras de datos (Por Implementar)
#### Descripción
* Ocultar estructura interna.
* Preferir estructuras de datos.
* Evita estructuras híbridas (mitad objeto y mitad datos).
* Debería ser pequeño.
* Haz una cosa.
* Pequeño número de variables de instancia.
* La clase base no debe saber nada acerca de sus derivados.
* Es mejor tener muchas funciones que pasar algo de código a una función para seleccionar un comportamiento.
* Prefiere métodos no estáticos a métodos estáticos.
#### Evidencia
``` javascript
class MessageDomain {
    static async createMessage(data) {
        const messageEntity = require("../entities/message.entity");
        const messageResponse = await messageEntity.create(data).catch((e) => {
            console.error("SERVICE MESSAGE SYSTEM: can not regist message", e);
            return null;
        });
        return messageResponse;
    }
    static async getMessage(data) {
        const messageEntity = require("../entities/message.entity");
        const messageResponse = await messageEntity.getMessagesByChatId(data).catch((e) => {
            console.error("SERVICE MESSAGE SYSTEM: can not regist message", e);
            return null;
        });
        return messageResponse;
    }
}
```

### 6. Capitalize SQL Special Words
#### Descripción
* La interacción con la base de datos es una parte importante de la mayoría de las aplicaciones web. Si está escribiendo consultas SQL sin procesar, es una buena idea mantenerlas legibles también.
* Aunque las palabras especiales de SQL y los nombres de funciones no distinguen entre mayúsculas y minúsculas, es una práctica común usar mayúsculas para distinguirlos de los nombres de tablas y columnas.
#### Evidencia
``` javascript
   async get() {
      return new Promise(async (resolve, reject) => {
        const connection = connectionDb();
        const data = await connection
          .query(
            "SELECT * FROM iniciosesion"
          )
          .catch((err) => {
            console.error("MODEL InicioSesion: Can not get", err);
            return null;
          });
        connection.end();
        if (data && data.rows && data.rows.length > 0)
          return resolve(data.rows);
        return reject(null);
      });
    },
```

## Estilos de programación Aplicados
### 1. Letterbox
#### Descripción
* El problema más grande se descompone en 'cosas' que tienen sentido para el dominio del problema.
* Cada 'cosa' es una cápsula de datos que expone un solo procedimiento, a saber, la capacidad de recibir y enviar mensajes que se le envían.
* El envío de mensajes puede resultar en el envío del mensaje a otra cápsula.
#### Evidencia
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

### 2. Tantrum
#### Descripción
* Cada procedimiento y función verifica la cordura de sus argumentos y se niega a continuar cuando los argumentos no son razonables.
* Todos los bloques de código verifican todos los posibles errores, posiblemente imprimen mensajes específicos del contexto cuando ocurren errores y pasan los errores a la cadena de llamadas de función
#### Evidencia
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

### 3. Aspects
#### Descripción
* El problema se descompone utilizando alguna forma de abstracción (procedimientos, funciones, objetos, etc.)
* Los aspectos del problema se agregan al programa principal sin editar el código fuente de las abstracciones. Estas funciones secundarias se aferran a las abstracciones principales nombrándolas, como en "Soy un aspecto de foo (¡aunque puede que foo no lo sepa!)".
#### Evidencia
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

## Principios SOLID aplicados
### 1. Principio de responsabilidad única (SPP)
#### Descripción
Si una clase tiene muchas responsabilidades, aumenta la posibilidad de errores porque hacer cambios en una de sus responsabilidades podría afectar a las otras sin que lo sepas.
#### Evidencia
```javascript
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
```

### 2. Principio abierto/cerrado (OCP)
#### Descripción
El Principio Abierto/Cerrado, también conocido como Open/Closed Principle o por sus siglas OCP, es el segundo de los 5 principios SOLID de la programación orientada a objetos.
Los módulos que cumplen con el principio abierto-cerrado tienen dos características principales. Estos son:
* Abiertos para la extensión: Esto significa que el comportamiento del módulo puede ser extendido. Cuando los requerimientos de la aplicación cambian, debemos ser capaces de extender el módulo con estos nuevos comportamientos que satisfagan esos cambios. En otras palabras, debemos ser capaces de cambiar lo que el módulo hace.
* Cerrado para la modificación: Esto significa que extender el comportamiento de un módulo no debería tener como resultado cambiar el código fuente, es decir, el código original debe permanecer sin cambios.
#### Evidencia
```javascript
class FeedController {
  static async PublishPublication(req, res) {
    const FeetService = require("../services/feed.service");
    req.body.id = req.datatoken.id;
    const data = await FeetService.PublishPublication(req.body).catch((e) => {
      console.error("Feed CONTROLLER: cant not publish");
      return null;
    });
    if (data) {
      return res.json({
        status: "ok",
        msg: "Post publicado",
        data: data,
      });
    } else {
      return res.json({
        status: "error",
        msg: "Error al publicar post",
        data: null,
      });
    }
  }
  static async GetPublications(req, res) {
    const FeedService = require("../services/feed.service");
    const data = await FeedService.GetPosts().catch((e) => {
      console.error("Feed CONTROLLER: cant not get");
      return null;
    });
    if (data) {
      return res.json({
        status: "ok",
        msg: "Todas las Publicaciones",
        data: data,
      });
    }
    return res.json({
      status: "error",
      msg: "Error al obtener publicaciones",
      data: null,
    });
  }
  static async GetSinglePublication(req, res) {
    const FeedService = require("../services/feed.service");
    const data = await FeedService.GetSinglePost(req.params).catch((e) => {
      console.error("Feed CONTROLLER: cant not get");
      return null;
    });
    if (data) {
      return res.render("feed/singlePost",{post:data,my:req.datatoken})
    }
    return res.render("feed/singlePost",{post:null,my:req.datatoken})
  }
  static async GetPublicationsByUserId(req, res) {
    const FeedService = require("../services/feed.service");
    let data = null
    if(req.params?.id){
      data = await FeedService.GetPostsByUserId(req.params).catch((e) => {
        console.error("Feed CONTROLLER: cant not get");
        return null;
      });
    }else{
      data = await FeedService.GetPostsByUserId(req.datatoken).catch((e) => {
        console.error("Feed CONTROLLER: cant not get");
        return null;
      });
    }
    if (data) {
      return res.json({
        status: "ok",
        msg: "Todas las Publicaciones",
        data: data,
      });
    }
    return res.json({
      status: "error",
      msg: "Error al obtener publicaciones",
      data: null,
    });
  }
  static async CreateComment(req, res) {
    const FeedService = require("../services/feed.service");
    req.body.user_id=req.datatoken.id;
    const data = await FeedService.CreateComment(req.body).catch((e) => {
      console.error("Feed CONTROLLER: cant not create comment");
      return null;
    });
    if (data) {
      return res.json({
        status: "ok",
        msg: "comentario creado",
        data: null,
      });
    }
    return res.json({
      status: "error",
      msg: "Error al crear comentario",
      data: null,
    });
  }
  static async GetCommentsByIdPost(req, res) {
    const FeedService = require("../services/feed.service");
    const data = await FeedService.GetCommentsByIdPost(req.params).catch((e) => {
      console.error("Feed CONTROLLER: cant not create comment");
      return null;
    });
    if (data) {
      return res.json({
        status: "ok",
        msg: "Comentarios obtenidos",
        data: data,
      });
    }
    return res.json({
      status: "error",
      msg: "No se pudo obtener comentarios",
      data: null,
    });
  }
  static async CreateReaction(req, res) {
    const FeedService = require("../services/feed.service");
    req.body.user_id = req.datatoken.id;
    const data = await FeedService.CreateReaction(req.body).catch((e) => {
      console.error("Feed CONTROLLER: cant not create comment");
      return null;
    });
    if (data) {
      return res.json({
        status: "ok",
        msg: "Reacción creada",
        data: null,
      });
    }
    return res.json({
      status: "error",
      msg: "Error al crear reacción",
      data: null,
    });
  }
  static async GetReactions(req, res) {
    const FeedService = require("../services/feed.service");
    const data = await FeedService.GetReactionsById(req.params).catch((e) => {
      console.error("Feed CONTROLLER: cant not get reactions");
      return null;
    });
    if (data) {
      return res.json({
        status: "ok",
        msg: "Se obtuvo reacciones",
        data: data,
        my: req.datatoken.id
      });
    }
    return res.json({
      status: "error",
      msg: "Error al obtener reacciones",
      data: null,
    });
  }
  static async DeleteReactions(req, res) {
    const FeedService = require("../services/feed.service");
    req.params.user_id = req.datatoken.id;
    const data = await FeedService.DeleteReactions(req.params).catch((e) => {
      console.error("Feed CONTROLLER: cant not delete reactions");
      return null;
    });
    if (data) {
      return res.json({
        status: "ok",
        msg: "Se elimino",
        data: null,
      });
    }
    return res.json({
      status: "error",
      msg: "Error al eliminar",
      data: null,
    });
  }
}

module.exports = FeedController;
```

### 3. Interface segregation principle (ISP)
#### Descripción
* No se debe obligar a los clientes a depender de métodos que no utilizan. Cuando se requiere que una Clase realice acciones que no son útiles, es un desperdicio y puede producir errores inesperados si la Clase no tiene la capacidad de realizar esas acciones.
* Una clase debe realizar solo las acciones necesarias para cumplir su función. Cualquier otra acción debe eliminarse por completo o moverse a otro lugar si otra Clase podría usarla en el futuro.
#### Evidencia
```javascript
class MessageDomain {
    static async createMessage(data) {
        const messageEntity = require("../entities/message.entity");
        const messageResponse = await messageEntity.create(data).catch((e) => {
            console.error("SERVICE MESSAGE SYSTEM: can not regist message", e);
            return null;
        });
        return messageResponse;
    }
    static async getMessage(data) {
        const messageEntity = require("../entities/message.entity");
        const messageResponse = await messageEntity.getMessagesByChatId(data).catch((e) => {
            console.error("SERVICE MESSAGE SYSTEM: can not regist message", e);
            return null;
        });
        return messageResponse;
    }
}
```

## Conceptos DDD aplicados
![image](https://github.com/andritowmega/Pwiwp/assets/104222114/ee6b5c1c-3162-49dd-b95a-49e5cbc6366f)

### 1. Entidades
En las entidades se definen todos los modelos que el negocio necesita para representar. Las entidades son objetos con identidad única, que se mantiene en el tiempo y cuyos atributos no son su principal característica.

### 2. Arquitectura en Capas
* #### Vistas (Capa de Presentación):
En esta capa, se encuentran las interfaces de usuario y prototipos que permiten a los usuarios interactuar con la red social. Las imágenes de los prototipos y los diagramas de casos de uso ayudan a visualizar cómo los usuarios pueden utilizar la aplicación y acceder a las funcionalidades proporcionadas por las capas subyacentes.

* #### Capa de Negocio (Capa de Lógica de Aplicación):
La capa de negocio contiene la lógica que gobierna la funcionalidad principal de la red social. Aquí se manejan aspectos como la publicación y compartición de contenido, la autenticación y la gestión de perfiles de usuarios. La separación de esta capa permite que las reglas de negocio sean independientes de las preocupaciones de la interfaz de usuario y de la manipulación directa de la base de datos.

* #### Capa de Base de Datos (Capa de Acceso a Datos):
En la capa de base de datos, se gestionan las operaciones de almacenamiento y recuperación de datos. Se utilizan modelos de dominio y entidades para representar las estructuras de datos en la base de datos, y se aplican patrones como el Modelo de Dominio DDD (Domain-Driven Design) para modelar y acceder a la información de manera coherente. Las consultas SQL y las interacciones con la base de datos se manejan en esta capa.
