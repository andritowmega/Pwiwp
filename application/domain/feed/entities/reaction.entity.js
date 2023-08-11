const connectionDb = require("../../../config/dbconnections");

module.exports = {
  async create({ id, user_id }) {
    const connection = connectionDb();

    try {
      const data = await connection.query(
        "INSERT INTO reaction (idpublication, user_id, date) VALUES ($1, $2, $3) RETURNING *",
        [id, user_id, new Date()]
      );

      connection.end();
      if (data?.rows?.length > 0) {
        return data.rows[0];
      } else {
        return null;
      }
    } catch (err) {
      console.error("MODEL Reaction: Can not create Reaction", err);
      connection.end();
      return null;
    }
  },
  
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
  
  async deleteReaction({ id, user_id }) {
    const connection = connectionDb();

    try {
      const data = await connection.query(
        "DELETE FROM reaction WHERE idpublication = $1 AND user_id = $2 RETURNING *",
        [id, user_id]
      );

      connection.end();
      return data?.rows || null;
    } catch (err) {
      console.error("MODEL Reaction: Can not delete Reaction", err);
      connection.end();
      return null;
    }
  }
};