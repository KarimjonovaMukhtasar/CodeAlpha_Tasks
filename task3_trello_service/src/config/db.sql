-- Active: 1759236905510@@127.0.0.1@5432@trello

create database trello;
create extension if not exists "pgcrypto";


drop table tasks;
drop table columns;

drop table boards;
drop table users;

create table users (
    id UUID primary KEY DEFAULT gen_random_uuid(),
    name varchar not null,
    email varchar not null unique,
    password varchar not null
);

create table boards (
    id UUID primary KEY DEFAULT gen_random_uuid(),
    title varchar not null
);

create table columns (
    id UUID primary KEY DEFAULT gen_random_uuid(),
    board_id UUID REFERENCES boards (id) on delete Cascade not null,
    name varchar not null
);

create table tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title varchar not null,
    task_order smallint,
    task_description text,
    user_id uuid REFERENCES users (id) on delete cascade not null,
    board_id uuid REFERENCES boards (id) on delete cascade not null,
    column_id uuid REFERENCES columns (id) on delete cascade not null
)
