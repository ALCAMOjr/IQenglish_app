CREATE DATABASE IF NOT EXISTS iqenglishdb;

USE iqenglishdb;


CREATE TABLE prospects (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    lastname VARCHAR(45) DEFAULT NULL,
    email VARCHAR(45) DEFAULT NULL,
    phone_number VARCHAR(20) DEFAULT NULL,
    age INT DEFAULT NULL,
    addresses VARCHAR(100) DEFAULT NULL,
    PRIMARY KEY (id)
);


DESCRIBE prospects;

INSERT INTO prospects (name, lastname, email, phone_number, reason, age, addresses) 
VALUES ('John', 'Doe', 'john.doe@example.com', '1234567890', 'Inquiry', 30, '123 Main St');

CREATE TABLE advisors (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(45) NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_type ENUM('admin', 'advisor') NOT NULL,
    PRIMARY KEY (id)
);
