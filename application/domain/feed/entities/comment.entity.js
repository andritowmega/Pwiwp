const connectionDb = require("../../../config/dbconnections");

module.exports = {
  async create({ user_id, id, content }) {
    const connection = connectionDb();

    try {
      const data = await connection.query(
        "INSERT INTO comment (user_id, id_publication, content) VALUES ($1, $2, $3) RETURNING *",
        [user_id, id, content]
      );

      connection.end();
      if (data?.rows?.length > 0) {
        return data.rows[0];
      } else {
        return null;
      }
    } catch (err) {
      console.error("MODEL Comment: Can not create Comment", err);
      connection.end();
      return null;
    }
  },
  
  async getByIdPost({ id }) {
    const connection = connectionDb();

    try {
      const data = await connection.query(
        "SELECT c.*, u.firstname, u.lastname FROM comment c INNER JOIN userinfo u ON c.user_id = u.id WHERE c.id_publication = $1",
        [id]
      );

      connection.end();
      return data?.rows || null;
    } catch (err) {
      console.error("MODEL Comment: Can not get Comments By Post Id", err);
      connection.end();
      return null;
    }
  }
};
