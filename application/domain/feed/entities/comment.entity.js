const connectionDb = require("../../../config/dbconnections");
module.exports = {
  async create({ user_id,id,content }) {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query(
          "INSERT INTO comment (user_id,id_publication,content) VALUES ($1,$2,$3) RETURNING *",
          [user_id,id,content]
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
          "SEELCT c.*,u.firstname,u.lastname FROM comment c INNER JOIN userinfo u ON c.user.id = u.id WHERE c.id_publication = $1",[id]
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
