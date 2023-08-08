const connectionDb = require("../../../config/dbconnections");
module.exports = {
  async create({ id,user_id }) {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query(
          "INSERT INTO reaction (idpublication,user_id,date) VALUES ($1,$2,$3) RETURNING *",
          [id,user_id,new Date()]
        )
        .catch((err) => {
          console.error("MODEL User: Can not create User", err);
          return null;
        });
      connection.end();
      if (data && data.rows && data.rows.length > 0)
        return resolve(data.rows[0]);
      return reject(null);
    });
  },
  async getByIdPost({id}) {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query(
          "SELECT * FROM reaction WHERE idpublication = $1",[id]
        )
        .catch((err) => {
          console.error("MODEL User: Can not get By Id", err);
          return null;
        });
      connection.end();
      if (data && data.rows)
        return resolve(data.rows);
      return reject(null);
    });
  },
  async DeleteReaction({id,user_id}) {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query(
          "DELETE FROM reaction WHERE idpublication = $1 AND user_id=$2 RETURNING *",[id,user_id]
        )
        .catch((err) => {
          console.error("MODEL User: Can not get By Id", err);
          return null;
        });
      connection.end();
      if (data && data.rows)
        return resolve(data.rows);
      return reject(null);
    });
  },
};
