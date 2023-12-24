const { connectDB } = require("../db/connection");

const getUsers = async (req, res) => {
  try {
    const { User } = await connectDB(process.env.DB_PASSWORD);
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getUsers };
