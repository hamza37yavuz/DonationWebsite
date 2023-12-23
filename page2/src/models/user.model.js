// const db = require('../db/dbConnection'); 

// async function createUser(userData){
//     // const db = dbConnection.getClient(); // PostgreSQL bağlantı havuzunu al
//   try {
//       const {username, email, password } = userData;
  
//       const result = await db.query(`
//           INSERT INTO users (username, email, password)
//           VALUES ($1, $2, $3)
//           RETURNING *;
//       `, [username, email, password]);
  
//       console.log('Kullanıcı başarıyla kaydedildi:', result);
//       return result; 
//     } catch (error) {
//       console.error('Kullanıcı kaydedilirken hata oluştu:', error);
//       throw error;
//     }
//   };
  
//   module.exports = createUser

// const { Sequelize, DataTypes } = require("sequelize");

// const sequelize = new Sequelize({
//   dialect: "postgres",
//   host: process.env.DB_HOST || "localhost",
//   port: process.env.DB_PORT || 5432,
//   database: process.env.DB_DATABASE || "donation_db",
//   user: process.env.DB_USER || "root",
//   password: process.env.DB_PASSWORD || "root",
// });

// const User = sequelize.define(
//   "User",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         len: [1, 50],
//       },
//     },
//     surname: {
//       type: DataTypes.STRING,
//       allowNull: true, // Surname alanı opsiyonel olabilir
//       validate: {
//         len: [1, 50],
//       },
//     },
//     telno: {
//       type: DataTypes.STRING,
//       allowNull: true, 
//       validate: {
//         len: [1, 20],
//       },
//     },
//     created_at: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
//     },
//   },
//   {
//     tableName: "users",
//     timestamps: false,
//   }
// );

// sequelize.sync();

// async function getUsers() {
//   try {
//     const users = await User.findAll();
//     console.log(users);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//   }
// }

// // getUsers fonksiyonunu çağırın
// getUsers();

// module.exports = User;