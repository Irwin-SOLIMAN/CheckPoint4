// Import access to database tables
const tables = require("../tables");

const browse = async (req, res) => {
  try {
    const status = await tables.status.read();

    res.status(201).json(status);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal servor error");
  }
};

module.exports = {
  browse,
};
