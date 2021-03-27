CREATE TABLE helo_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(250),
  password VARCHAR(250),
  profile_pic TEXT
)

CREATE TABLE helo_posts (
id SERIAL PRIMARY KEY,
title VARCHAR(45),
content TEXT,
img TEXT,
author_id INTEGER REFERENCES helo_users(helo_usersId),
date_created TIMESTAMP
)