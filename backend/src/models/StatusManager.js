const AbstractManager = require("./AbstractManager");

class StatusManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "item" as configuration
    super({ table: "status" });
  }

  async read() {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [result] = await this.database.query(`SELECT * FROM ${this.table}`);
    // Return the first row of the result, which represents the item

    return result;
  }
}

module.exports = StatusManager;
