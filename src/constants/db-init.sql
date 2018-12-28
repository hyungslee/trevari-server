DROP DATABASE trevariapp;
create database trevariapp;
use trevariapp;

create table users(
id integer primary key auto_increment,
email text not null,
password text not null,
createdAt datetime,
phoneNumber int not null,
name text not null
);

insert into users (email, password, createdAt, phoneNumber, name) values ('aa@gmail.com','aaa',now(),123456, 'Anne')
