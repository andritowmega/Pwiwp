const connectionDb = require("../../../config/dbconnections");
module.exports = {
  async create({ email, password, user_id, nickname }) {
    return new Promise(async (resolve, reject) => {
      const bcrypt = require("bcryptjs");
      password = bcrypt.hashSync(password, 8);
      const connection = connectionDb();
      const data = await connection
        .query(
          "INSERT INTO account (email,password,user_id,nickname) VALUES ($1,$2,$3,$4) RETURNING *",
          [email, password, user_id, nickname]
        )
        .catch((err) => {
          console.error("MODEL Account: Can not create Account", err);
          return null;
        });
      connection.end();
      if (data && data.rows && data.rows.length > 0)
        return resolve(data.rows[0]);
      return reject(null);
    });
  },
  async getByEmail(email) {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query(
          "SELECT a.email,a.password,a.user_id,a.nickname,u.firstname,u.lastname FROM account a INNER JOIN userinfo u ON a.user_id = u.id WHERE a.email = $1",[email]
        )
        .catch((err) => {
          console.error("MODEL Account: Can not get By Email", err);
          return null;
        });
      connection.end();
      if (data && data.rows && data.rows.length > 0)
        return resolve(data.rows[0]);
      return reject(null);
    });
  },
  async getAll(){
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query(
          "SELECT a.email,a.nickname,u.* FROM account a INNER JOIN userinfo u ON a.user_id = u.id ORDER BY a.user_id DESC"
        )
        .catch((err) => {
          console.error("MODEL Account: Can not get All Users", err);
          return null;
        });
      connection.end();
      if (data && data.rows && data.rows)
        return resolve(data.rows);
      return reject(null);
    });
  },
  async searchUserByName({name}){
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query(
          "SELECT u.*,a.email,a.nickname FROM userinfo u INNER JOIN account a ON u.id = a.user_id WHERE u.firstname LIKE $1",['%' + name + '%']
        )
        .catch((err) => {
          console.error("MODEL Account: Can not get All Users", err);
          return null;
        });
      connection.end();
      if (data && data.rows && data.rows)
        return resolve(data.rows);
      return reject(null);
    });
  },
  async getByUserByNick({nickname}) {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query(
          "SELECT a.email,a.nickname,u.* FROM account a INNER JOIN userinfo u ON a.user_id = u.id WHERE a.nickname=$1",[nickname]
        )
        .catch((err) => {
          console.error("MODEL Account: Can not get By NickName", err);
          return null;
        });
      connection.end();
      if (data && data.rows && data.rows.length > 0)
        return resolve(data.rows[0]);
      return reject(null);
    });
  },
};
