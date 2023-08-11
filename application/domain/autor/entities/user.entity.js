const connectionDb = require("../../../config/dbconnections");
module.exports = {
  async create({ firstName, lastName }) {
    const connection = connectionDb();
  
    try {
      const data = await connection.query(
        "INSERT INTO userinfo (firstname, lastname) VALUES ($1, $2) RETURNING *",
        [firstName, lastName]
      );
  
      connection.end();
      if (data?.rows?.length > 0) {
        return data.rows[0];
      } else {
        return null;
      }
    } catch (err) {
      console.error("MODEL User: Can not create User", err);
      connection.end();
      return null;
    }
  },
  
  async getById(id) {
    const connection = connectionDb();
  
    try {
      const data = await connection.query(
        "SELECT * FROM user WHERE id = $1",
        [id]
      );
  
      connection.end();
      if (data?.rows?.length > 0) {
        return data.rows[0];
      } else {
        return null;
      }
    } catch (err) {
      console.error("MODEL User: Can not get By Id", err);
      connection.end();
      return null;
    }
  },
};
