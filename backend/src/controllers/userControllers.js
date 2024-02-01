// Import access to database tables
const tables = require("../tables");

const add = async (req, res, next) => {
  // Extract the item data from the request body
  const user = req.body;

  try {
    // Insert the item into the database
    const insertId = await tables.user.create(user);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const getbytoken = async (req, res) => {
  const user = req.auth; // payload

  try {
    if (user.sub) {
      const oneUser = await tables.user.getById(user.sub);

      res.status(201).json(oneUser);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal servor error");
  }
};

const getUser = async (req, res) => {
  try {
    const oneUser = await tables.user.getalluser();
    res.status(201).json(oneUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal servor error");
  }
};

module.exports = {
  add,
  getbytoken,
  getUser,
};
