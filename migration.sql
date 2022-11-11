DROP TABLE IF EXISTS scoreboard;
DROP TABLE IF EXISTS triva;

CREATE TABLE triva(
    id serial PRIMARY KEY,
    question varchar,
    correct_answer varchar,
    options text []
);

CREATE TABLE scoreboard(
    id serial PRIMARY KEY,
    name varchar,
    age integer,
    score integer
);
