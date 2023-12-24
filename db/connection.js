const { Sequelize, DataTypes } = require("sequelize");

async function connectDB(password) {
  const sequelize = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: password,
    database: "postgres",
  });

  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    },
    {
      tableName: "users",
      timestamps: false,
    }
  );

  await sequelize.authenticate(); // Veritabanı bağlantısını test etmek için ekledim
  console.log("Database connection successful");

  return { sequelize, User };
}

module.exports = {
  connectDB,
};
