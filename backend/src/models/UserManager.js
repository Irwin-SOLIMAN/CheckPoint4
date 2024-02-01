const AbstractManager = require("./AbstractManager");

class ItemManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  async create(user) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await this.database.query(
      `insert into ${this.table} (name, email, hashed_password) values (?, ?, ?)`,
      [user.username, user.email, user.hashedPassword]
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  async getByMail(email) {
    const [result] = await this.database.query(
      `SELECT u.id, u.email, u.name, u.hashed_password
        FROM ${this.table} u
        WHERE u.email = ? `,
      [email]
    );
    return result[0];
  }

  async getById(id) {
    const [result] = await this.database.query(
      `SELECT u.id, u.email, u.name
          FROM ${this.table} u
          WHERE u.id = ? `,
      [id]
    );
    return result[0];
  }

  async getalluser() {
    const [result] = await this.database.query(
      `SELECT u.id, u.name 
    FROM ${this.table} u`
    );
    return result;
  }
}

module.exports = ItemManager;
