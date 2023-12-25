const { Sequelize } = require("sequelize");

async function connectDB(password) {
  const sequelize = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: password,
    database: "donation_db",
  });

  try {
    await sequelize.authenticate();
    console.log("Database connection successful");
    return sequelize;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
}

module.exports = {
  connectDB,
};
