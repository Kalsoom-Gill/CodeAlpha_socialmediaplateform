CREATE DATABASE socialmedia; // phpmyadmin code

USE socialmedia;

CREATE TABLE users(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100),
email VARCHAR(100)
);

CREATE TABLE posts(
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT,
content TEXT
);

CREATE TABLE comments(
id INT AUTO_INCREMENT PRIMARY KEY,
post_id INT,
comment TEXT
);

CREATE TABLE followers(
id INT AUTO_INCREMENT PRIMARY KEY,
follower_id INT,
following_id INT
);

CREATE TABLE likes(
id INT AUTO_INCREMENT PRIMARY KEY,
post_id INT
);

SELECT * FROM users;
SELECT * FROM posts;
SELECT * FROM likes;
SELECT * FROM comments;
SELECT * FROM followers;
