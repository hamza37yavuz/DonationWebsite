const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123789",
  database: "postgres",
});

const User = sequelize.define(
  "User",
  {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, // userid sütununu primary key olarak belirtin
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],
      },
    },
  },
  {
    tableName: "users",
    timestamps: false, // timestamps seçeneğini false olarak ayarlayın
  }
);

sequelize.sync();

async function getUsers() {
  try {
    const users = await User.findAll();
    console.log(users);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

// getUsers fonksiyonunu çağırın
getUsers();

module.exports = User;
