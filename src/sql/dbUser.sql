create table if not exists users (
    id serial primary key,
    first_name varchar(255),
    last_name varchar(255),
    email varchar(255),
    cellphone_number varchar(11),
    password varchar(1000)
);