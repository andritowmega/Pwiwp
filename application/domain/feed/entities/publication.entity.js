const connectionDb = require("../../../config/dbconnections");

module.exports = {
  async create({ content, id }) {
    const connection = connectionDb();

    try {
      const data = await connection.query(
        "INSERT INTO publication (content, date, user_id) VALUES ($1, $2, $3) RETURNING *",
        [content, new Date(), id]
      );

      connection.end();
      if (data?.rows?.length > 0) {
        return data.rows[0];
      } else {
        return null;
      }
    } catch (err) {
      console.error("MODEL Publication: Can not create Publication", err);
      connection.end();
      return null;
    }
  },
  
  async getPublicationById({ id }) {
    const connection = connectionDb();

    try {
      const data = await connection.query(
        "SELECT p.*, u.firstname, u.lastname, a.nickname FROM publication p INNER JOIN userinfo u ON p.user_id = u.id INNER JOIN account a ON p.user_id = a.user_id WHERE p.id = $1",
        [id]
      );

      connection.end();
      return data?.rows?.[0] || null;
    } catch (err) {
      console.error("MODEL Publication: Can not get By Id", err);
      connection.end();
      return null;
    }
  },
  
  async getPublicationsByUserId({ id }) {
    const connection = connectionDb();

    try {
      const data = await connection.query(
        "SELECT p.*, u.firstname, u.lastname FROM publication p INNER JOIN userinfo u ON p.user_id = u.id WHERE p.user_id = $1 ORDER BY p.id DESC",
        [id]
      );

      connection.end();
      return data?.rows || null;
    } catch (err) {
      console.error("MODEL Publication: Can not get By User id", err);
      connection.end();
      return null;
    }
  },
  
  async getPublications() {
    const connection = connectionDb();

    try {
      const data = await connection.query(
        "SELECT p.*, u.firstname, u.lastname FROM publication p INNER JOIN userinfo u ON p.user_id = u.id ORDER BY p.id DESC"
      );

      connection.end();
      return data?.rows || null;
    } catch (err) {
      console.error("MODEL Publication: Can not get Publications", err);
      connection.end();
      return null;
    }
  }
};