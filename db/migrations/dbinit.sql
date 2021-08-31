CREATE DATABASE blur_db OWNER blur;
GRANT ALL PRIVILEGES ON DATABASE blur_db TO blur;

CREATE TABLE topic (
  id SERIAL,
  title VARCHAR ( 50 ) NOT NULL,
  content VARCHAR ( 500 ) NOT NULL,
  author VARCHAR ( 20 ) NOT NULL,
  comments INTEGER DEFAULT 0,
  created TIMESTAMP
);