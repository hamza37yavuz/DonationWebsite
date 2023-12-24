const { Client } = require("pg");
require('dotenv').config();
const bcrypt = require('bcrypt');

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
    donationtype INT NOT NULL,
    donationquantity INT NOT NULL,
    donationamount INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS sacrfice (
    donator_id INT,
    country_id INT NOT NULL,
    state VARCHAR(25) NOT NULL,
    sacrifice_type INT NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS water_well_part (
    donator_id INT,
    quantity int NOT NULL,
    well_id INT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS water_well (
    id SERIAL PRIMARY KEY,
    quantity int NOT NULL,
    country_id INT NOT NULL
  );
`;
const countriesData = [
    { country_name: 'Çad' },
    { country_name: 'Kamerun' },
    { country_name: 'Uganda' },
    { country_name: 'Burkina' },
    { country_name: 'Tanzanya' },
    { country_name: 'Bangladeş' },
    { country_name: 'Somali' },
    { country_name: 'Nijer' },
    { country_name: 'Kenya' },
    { country_name: 'Nijerya' }
  ];
  
const waterWellData = { quantity: 70, country_id: 1 };

async function addCountries() {
    try {
      for (const countryData of countriesData) {
        const result = await client.query(
          'INSERT INTO countries (country_name) VALUES ($1) RETURNING *',
          [countryData.country_name]
        );
        console.log(`Ülke eklendi: ${result.rows[0].country_name}`);
      }
    } catch (error) {
      console.error('Ülkeler eklenirken hata oluştu:', error);
    }
  }
  
  async function addWaterWell() {
    try {
      const result = await client.query(
        'INSERT INTO water_well (quantity, country_id) VALUES ($1, $2) RETURNING *',
        [waterWellData.quantity, waterWellData.country_id]
      );
      console.log(`Su kuyusu eklendi: ${result.rows[0].id}`);
    } catch (error) {
      console.error('Su kuyusu eklenirken hata oluştu:', error);
    }
  }

  async function addAdminUser() {
    try {
      const adminPassword = 'admin'; // Admin şifresi
      const hashedPassword = await bcrypt.hash(adminPassword, 10); // Şifreyi bcrypt ile hashle
  
      const result = await client.query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
        ['admin', 'yavuzhamza22@gmail.com', hashedPassword]
      );
  
      console.log('Admin kullanıcı eklendi:', result.rows[0]);
    } catch (error) {
      console.error('Admin kullanıcı eklenirken hata oluştu:', error);
    }
  }



client.connect()
  .then(() => {
    console.log("Veritabanına bağlandı.");

    return client.query(createTableQuery);
  })
  .then(async () => {
    console.log("TABLOLAR OLUŞTURULDU.");
    // Ulkeleri ekledim
    await addCountries();

    // Su kuyusunu ekledim
    await addWaterWell();

    // Admin kullanıcısını ekledim
    await addAdminUser();

  })
  .catch(error => {
    console.error('İşlem sırasında hata oluştu:', error);
  })  .finally(() => {
    client.end(); // Veritabanı bağlantısını kapat
  });
