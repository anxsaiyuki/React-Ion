DROP DATABASE IF EXISTS reaction;
CREATE DATABASE reaction;
USE reaction;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(50) NOT NULL,
  password varchar(255) NOT NULL,
  salt varchar(255) NOT NULL,
  PRIMARY KEY (ID),
  UNIQUE KEY (username)
);

CREATE TABLE projects (
  id          int             NOT NULL AUTO_INCREMENT,
  name        varchar(255)    NOT NULL,
  project_tree varchar(1000)  NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE permissions (
  id         int          NOT NULL AUTO_INCREMENT,
  name       varchar(255) NOT NULL,
  PRIMARY KEY (ID),
  UNIQUE KEY (name)
);

CREATE TABLE user_project (
  id            int NOT NULL AUTO_INCREMENT,
  user_id       int NOT NULL,
  project_id    int NOT NULL,
  permission_id int NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (user_id)       REFERENCES users (id)       ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (project_id)    REFERENCES projects (id)    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (permission_id) REFERENCES permissions (id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO permissions(id, name) VALUE(1, 'Admin');
INSERT INTO permissions(id, name) VALUE(2, 'Normal');
INSERT INTO permissions(id, name) VALUE(3, 'Restricted');
INSERT INTO permissions(id, name) VALUE(4, 'Special');