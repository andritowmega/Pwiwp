const connectionDb = require("../config/dbconnections");

module.exports = {
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
        /*
        data = {
            rows : [
                {id:1,name:"Test1"},
                {id:2,name:"Test2"},
                {id:3,name:"prueba"},
            ]
        }*/
        if (data && data.rows && data.rows.length > 0)
          return resolve(data.rows);
        return reject(null);
      });
    },
    async insert(email,password) {
        return new Promise(async (resolve, reject) => {
          const connection = connectionDb();
          const data = await connection
            .query(
              "INSERT INTO iniciosesion (email,password) VALUES ($1,$2) RETURNING *",[email,password]
            )
            .catch((err) => {
              console.error("MODEL InicioSesion: Can not insert", err);
              return null;
            });
          connection.end();
          /*
          data = {
              rows : [
                  {id:1,name:"Test1"},
                  {id:2,name:"Test2"},
                  {id:3,name:"prueba"},
              ]
          }*/
          if (data && data.rows && data.rows.length > 0)
            return resolve(data.rows);
          return reject(null);
        });
      },
  };