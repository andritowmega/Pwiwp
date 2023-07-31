const connectionDb = require("../../../config/dbconnections");

module.exports = {
    async create(name) {
      return new Promise(async (resolve, reject) => {
        const connection = connectionDb();
        const data = await connection
          .query(
            "INSERT INTO tabletest (name) VALUES ($1) RETURNING *", [name]
          )
          .catch((err) => {
            console.error("MODEL TABLE TEST: Can not create", err);
            return null;
          });
        connection.end();
        if (data && data.rows && data.rows.length > 0)
          return resolve(data.rows[0]);
        return reject(null);
      });
    },
    async get() {
      return new Promise(async (resolve, reject) => {
        const connection = connectionDb();
        const data = await connection
          .query(
            "SELECT * FROM tabletest"
          )
          .catch((err) => {
            console.error("MODEL TABLE TEST: Can not get all", err);
            return null;
          });
        connection.end();
        if (data && data.rows && data.rows.length > 0)
          return resolve(data.rows);
        return reject(null);
      });
    },
  };