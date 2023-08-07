const connectionDb = require("../../../config/dbconnections");
module.exports = {
  async create({ content, id }) {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query(
          "INSERT INTO publication (content,date,user_id) VALUES ($1,$2,$3) RETURNING *",
          [content, new Date(), id]
        )
        .catch((err) => {
          console.error("MODEL Publication: Can not create Publication", err);
          return null;
        });
      connection.end();
      if (data && data.rows && data.rows.length > 0)
        return resolve(data.rows[0]);
      return reject(null);
    });
  },
  async getPublicationById({id}) {
    console.log("id",id)
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query("SELECT p.*,u.firstname,u.lastname,a.nickname FROM publication p INNER JOIN userinfo u ON p.user_id = u.id INNER JOIN account a ON p.user_id = a.user_id WHERE p.id = $1", [id])
        .catch((err) => {
          console.error("MODEL Publication: Can not get By Id", err);
          return null;
        });
      connection.end();
      if (data && data.rows && data.rows.length > 0){
        return resolve(data.rows[0]);
      }
        
      return reject(null);
    });
  },
  async getPublicationsByUserId({id}) {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query("SELECT p.*,u.firstname,u.lastname FROM publication p INNER JOIN userinfo u ON p.user_id = u.id WHERE p.user_id = $1 ORDER BY p.id DESC", [id])
        .catch((err) => {
          console.error("MODEL Publication: Can not get By User id", err);
          return null;
        });
      connection.end();
      if (data && data.rows) return resolve(data.rows);
      return reject(null);
    });
  },
  async getPublications() {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query(
          "SELECT p.*,u.firstname,u.lastname FROM publication p INNER JOIN userinfo u ON p.user_id = u.id ORDER BY p.id DESC"
        )
        .catch((err) => {
          console.error("MODEL Publication: Can not get By User id", err);
          return null;
        });
      connection.end();
      if (data && data.rows) return resolve(data.rows);
      return reject(null);
    });
  },
};
