const connectionDb = require("../../../config/dbconnections");

module.exports = {
  async create({ content, chatid, userid }) {
    const connection = connectionDb();

    try {
      const data = await connection.query(
        "INSERT INTO message (content, chatid, userid) VALUES ($1, $2, $3) RETURNING *",
        [content, chatid, userid]
      );

      connection.end();
      if (data?.rows?.length > 0) {
        return data.rows[0];
      } else {
        return null;
      }
    } catch (err) {
      console.error("MODEL message: Can not create message", err);
      connection.end();
      return null;
    }
  },
  
  async getMessagesByChatId({ id }) {
    const connection = connectionDb();

    try {
      const data = await connection.query(
        "SELECT * FROM message WHERE chatid = $1 ORDER BY id ASC",
        [id]
      );

      connection.end();
      return data?.rows || null;
    } catch (err) {
      console.error("MODEL message: Can not get messages", err);
      connection.end();
      return null;
    }
  }
};