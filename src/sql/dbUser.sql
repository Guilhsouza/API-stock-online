create table if not exists usuarios (
    id serial primary key,
    name varchar(255),
    email varchar(255),
    password varchar(1000)
);