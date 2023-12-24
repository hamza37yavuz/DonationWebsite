CREATE DATABASE DONATION_SITE;

-- ULKE ISIMLERI

CREATE TABLE ULKELER
(ID INT, ULKE_ID INT)

-- BAGISCI_BILGILERI

CREATE TABLE BAGISCI_BILGILERI
(ID SERIAL PRIMARY KEY,
BAGISCI_ADI VARCHAR (50),
BAGISCI_SOYADI VARCHAR (50),
TEL_NO VARCHAR(10))

-- BUYUKBAS_KURBAN

CREATE TABLE BUYUKBAS_KURBAN
(ID INT, ULKE_ID INT)


CREATE TABLE BUYUKBAS_HISSE
(ID SERIAL PRIMARY KEY,
KUEBAN_ID INT, HISSE INT,
TUR VARCHAR(10), NIYET VARCHAR(50))

-- KUCUKBAS_KURBAN

CREATE TABLE KUCUKBAS_KURBAN
(ID INT, KURBAN_TIPI INT, 
ULKE_ID INT, NOT VARCHAR(100))

-- KUYU

CREATE TABLE KUYU_HISSE
(ID INT, KUYU_ID INT, 
ULKE_ID INT, NOT VARCHAR(100))

-- ADMIN PANELI

CREATE TABLE YETKI
(ID SERIAL PRIMARY KEY,
KULLANICI_ADI VARCHAR(30),
SIFRE VARCHAR(20),
YETKI INT)