const connectionDb = require("../../../config/dbconnections");

module.exports = {
  async create({ email, password, user_id, imei = null }) {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query(
          "INSERT INTO login (email,password,imei,user_id) VALUES ($1,$2,$3,$4) RETURNING *",
          [email, password, imei, user_id]
        )
        .catch((err) => {
          console.error("MODEL LOGIN: Can not create", err);
          return null;
        });
      connection.end();
      if (data && data.rows && data.rows.length > 0)
        return resolve(data.rows[0]);
      return reject(null);
    });
  },
};
