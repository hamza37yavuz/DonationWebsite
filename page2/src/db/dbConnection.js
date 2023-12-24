const { Client } = require("pg");
require('dotenv').config();

const client = new Client({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_DATABASE || "donation_db",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
});

client.connect()
  .then(() => {
    console.log("Veritabanına bağlandı.");
  })
  .catch(error => {
    console.error('İşlem sırasında hata oluştu:', error);
  });

module.exports = client
