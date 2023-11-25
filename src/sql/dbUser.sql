create table if not exists users (
    id serial primary key unique,
    first_name varchar(255),
    last_name varchar(255),
    email varchar(255) unique,
    cellphone_number varchar(11) unique,
    password varchar(1000)
);
