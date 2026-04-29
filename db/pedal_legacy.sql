-- Pedal Legacy Database
-- Run this in phpMyAdmin or MySQL CLI

CREATE DATABASE IF NOT EXISTS pedal_legacy CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE pedal_legacy;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    age TINYINT UNSIGNED NOT NULL CHECK (age >= 13),
    gender ENUM('Male','Female') NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    race_id TINYINT UNSIGNED NOT NULL,
    race_name VARCHAR(150) NOT NULL,
    race_category VARCHAR(100),
    race_date VARCHAR(50),
    race_location VARCHAR(100),
    race_price SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    prize_pool SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    payment_status ENUM('paid','unpaid') DEFAULT 'unpaid',
    payment_method VARCHAR(50),
    payment_datetime DATETIME,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    age TINYINT UNSIGNED NOT NULL CHECK (age >= 13),
    gender ENUM('Male','Female') NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    emergency_name VARCHAR(150) NOT NULL,
    emergency_number VARCHAR(20) NOT NULL,
    bike_category ENUM('Mountain Bike','Gravel Bike') NOT NULL,
    medical_conditions TEXT,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
