const connectionDb = require("../../../config/dbconnections");
module.exports = {
  async create({ email, password, user_id, nickname }) {
    const bcrypt = require("bcryptjs");
    password = bcrypt.hashSync(password, 8);
    const connection = connectionDb();
    try {
      const data = await connection.query(
        "INSERT INTO account (email,password,user_id,nickname) VALUES ($1,$2,$3,$4) RETURNING *",
        [email, password, user_id, nickname]
      );
  
      connection.end();
      if (data?.rows?.length > 0) {
        return data.rows[0];
      } else {
        return null;
      }
    } catch (err) {
      console.error("MODEL Account: Can not create Account", err);
      connection.end();
      return null;
    }
  },
  async getByEmail(email) {
    const connection = connectionDb();
  
    try {
      const data = await connection.query(
        "SELECT a.email,a.password,a.user_id,a.nickname,u.firstname,u.lastname FROM account a INNER JOIN userinfo u ON a.user_id = u.id WHERE a.email = $1",
        [email]
      );
  
      connection.end();
      if (data?.rows?.length > 0) {
        return data.rows[0];
      } else {
        return null;
      }
    } catch (err) {
      console.error("MODEL Account: Can not get By Email", err);
      connection.end();
      return null;
    }
  },
  
  async getAll() {
    const connection = connectionDb();
  
    try {
      const data = await connection.query(
        "SELECT a.email,a.nickname,u.* FROM account a INNER JOIN userinfo u ON a.user_id = u.id ORDER BY a.user_id DESC"
      );
  
      connection.end();
      return data?.rows || null;
    } catch (err) {
      console.error("MODEL Account: Can not get All Users", err);
      connection.end();
      return null;
    }
  },
  
  async searchUserByName({ name }) {
    const connection = connectionDb();
  
    try {
      const data = await connection.query(
        "SELECT u.*,a.email,a.nickname FROM userinfo u INNER JOIN account a ON u.id = a.user_id WHERE u.firstname LIKE $1",
        ['%' + name + '%']
      );
  
      connection.end();
      return data?.rows || null;
    } catch (err) {
      console.error("MODEL Account: Can not search User By Name", err);
      connection.end();
      return null;
    }
  },
  
  async getByUserByNick({ nickname }) {
    const connection = connectionDb();
    
    try {
      const data = await connection.query(
        "SELECT a.email,a.nickname,u.* FROM account a INNER JOIN userinfo u ON a.user_id = u.id WHERE a.nickname=$1",
        [nickname]
      );
  
      connection.end();
      if (data?.rows?.length > 0) {
        return data.rows[0];
      } else {
        return null;
      }
    } catch (err) {
      console.error("MODEL Account: Can not get By NickName", err);
      connection.end();
      return null;
    }
  },
};
