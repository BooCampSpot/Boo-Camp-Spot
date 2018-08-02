DROP DATABASE IF EXISTS haunted_places_db;
CREATE DATABASE haunted_places_db;
USE haunted_places_db;

CREATE TABLE Types(
    typeID INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100),
    PRIMARY KEY(typeID)
);

CREATE TABLE user (
    userID INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100),
    PRIMARY KEY(userID)
);

CREATE TABLE hauntedPlaces (
    hauntedID INT NOT NULL AUTO_INCREMENT,
    typeID INT NOT NULL ,
    name VARCHAR(100),
    location VARCHAR(100),
    description VARCHAR(100),
    PRIMARY KEY(hauntedID),
    FOREIGN KEY(typeID) REFERENCES Types(typeID)
);

CREATE TABLE Review (
    reviewID INT NOT NULL AUTO_INCREMENT,
    hauntedID INT NOT NULL,
    userID INT NOT NULL,
    title VARCHAR(100),
    body VARCHAR(100),
    rating VARCHAR(100),
    PRIMARY KEY(reviewID),
    FOREIGN KEY(hauntedID) REFERENCES hauntedPlaces(hauntedID),
    FOREIGN KEY(userID) REFERENCES user(userID)
)