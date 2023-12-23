const { Client } = require("pg");
require('dotenv').config();

const client = new Client({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_DATABASE || "donation_db",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS countries (
    id SERIAL PRIMARY KEY,
    country_name VARCHAR(30) NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS donator_info (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    telno VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS sheep (
    donator_id INT,
    country_id INT NOT NULL,
    state VARCHAR(25) NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS cattle (
    donator_id INT,
    id int NOT NULL,
    quantity int NOT NULL,
    country_id INT NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS water_well (
    donator_id INT,
    quantity int NOT NULL,
    country_id INT NOT NULL
  );
`;

client.connect()
  .then(() => {
    console.log("Veritabanına bağlandı.");

    return client.query(createTableQuery);
  })
  .then(() => {
    console.log("TABLOLAR OLUŞTURULDU.");
  })
  .catch(error => {
    console.error('İşlem sırasında hata oluştu:', error);
  });

module.exports = client