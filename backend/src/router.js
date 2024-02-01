const express = require("express");

const router = express.Router();

const { hashPassword, verifyToken } = require("./services/auth");

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");
const userController = require("./controllers/userControllers");
const authControllers = require("./controllers/authControllers");
const taskController = require("./controllers/taskController");
const statusController = require("./controllers/statusController");

// Route to get a list of items
router.get("/items", itemControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);

// route to add a new user with hashing of his password
router.post("/user", hashPassword, userController.add);

// route d'authentification

router.post("/login", authControllers.login);

router.use(verifyToken); // mur où le token est nécéssaire

router.get("/userbytoken", userController.getbytoken);
router.get("/usertodolist/:id", taskController.getTodolist);
router.put("/usertodolist", taskController.changeTodolist);
router.put("/deletteByidTodolist/:id", taskController.destroy);
router.get("/userlist", userController.getUser);
router.post("/addtask", taskController.addtask);
router.get("/status", statusController.browse);

/* ************************************************************************* */

module.exports = router;
