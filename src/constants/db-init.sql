create database expressapp;
use expressapp;

create table users(
email text not null,
password text not null,
createdAt datetime,
phoneNumber int not null,
name text not null
);
