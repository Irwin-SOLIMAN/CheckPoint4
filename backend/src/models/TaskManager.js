const AbstractManager = require("./AbstractManager");

class TaskManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "item" as configuration
    super({ table: "todolist" });
  }

  async getAllUserTask(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [result] = await this.database.query(
      `SELECT u.*, s.description AS status_description FROM ${this.table} u
       JOIN status s ON s.id = u.status_id
       WHERE u.user_id = ?`,
      [id]
    );
    // Return the first row of the result, which represents the item

    return result;
  }

  async modifyById(task) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [result] = await this.database.query(
      `UPDATE  ${this.table} SET status_id = ?, task = ? where id = ?`,
      [task.status_id, task.task, task.id]
    );
    // Return the first row of the result, which represents the item
    return result;
  }

  async delete(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} where id = ?`,
      [id]
    );
    // Return the first row of the result, which represents the item
    return result;
  }

  async add(task) {
    const [result] = await this.database.query(`
    INSERT INTO ${this.table} (task, user_id, deadline) VALUES ('${task.task}', ${task.ownerid}, '${task.deadline}')
  `);
    return result[0];
  }
}

module.exports = TaskManager;
