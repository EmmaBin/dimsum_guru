CREATE DATABASE dimsum;

CREATE TABLE admin(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE food(
    food_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    price INT NOT NULL,
    category VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL
);

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    status VARCHAR(255) NOT NULL
);

CREATE TABLE food_order(
    id SERIAL PRIMARY KEY,
    food_id INT NOT NULL,
    order_id INT NOT NULL
);