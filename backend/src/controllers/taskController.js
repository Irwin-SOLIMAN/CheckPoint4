// Import access to database tables
const tables = require("../tables");

const getTodolist = async (req, res) => {
  const userId = req.params.id; // payload

  try {
    if (userId) {
      const todolist = await tables.todolist.getAllUserTask(userId);

      res.status(201).json(todolist);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal servor error");
  }
};

const changeTodolist = async (req, res) => {
  const task = req.body;

  try {
    const change = await tables.todolist.modifyById(task);
    res.status(201).json(change);
  } catch (error) {
    console.error("error");
    res.status(500).send("Internal servor error");
  }
};

const destroy = async (req, res) => {
  const taskId = req.params.id;

  try {
    const change = await tables.todolist.delete(taskId);
    res.status(201).json(change);
  } catch (error) {
    console.error("error");
    res.status(500).send("Internal servor error");
  }
};

const addtask = async (req, res) => {
  const task = req.body;

  try {
    const add = await tables.todolist.add(task);
    res.status(201).json(add);
  } catch (error) {
    console.error("error");
    res.status(500).send("Internal servor error");
  }
};

module.exports = {
  getTodolist,
  changeTodolist,
  destroy,
  addtask,
};
