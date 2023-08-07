const connectionDb = require("../../../config/dbconnections");
class messageEntity {
  async create({content, chatid, userid}) {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query(
          "INSERT INTO message (content,chatid,userid) VALUES ($1,$2,$3) RETURNING *",
          [content, chatid, userid]
        )
        .catch((err) => {
          console.error("MODEL message: Can not regist message", err);
          return null;
        });
      connection.end();
      for(var i = 0; i<data.rows.length; i++){
        if (!data || !data.rows[i]){
          return reject(null);
        }
      }
      return resolve(data.rows[0]);
    });
  }
};

module.exports = messageEntity;