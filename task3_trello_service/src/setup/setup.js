import pkg from "pg"
const { Pool } = pkg
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "root",
    database: "postgres",
    port: 5432
})

export async function setup() {
    try {
        await pool.query(`CREATE DATABASE trello;`)
        console.log(`DATABASE TRELLO CREATED SUCCESSFULLY!`)

    } catch (error) {
        if (error.code = "42P04") {
            console.log(`DATABASE ALREADY EXISTED!`)
        }
        console.log(`ERROR WHILE CREATING DATABASE`, error.message)
    }
    const newDB = new Pool({
        user: "postgres",
        host: "localhost",
        password: "root",
        database: "trello",
        port: 5432
    })
    await newDB.query(`create table users(id serial primary key,
        name varchar not null,
        email varchar not null unique,
        password varchar not null);`)

    await newDB.query(`create table boards(id serial primary key,
        title varchar not null);`)

    await newDB.query(`create table columns(id serial primary key,
        name varchar not null);`)

    await newDB.query(`create table tasks(id serial primary key,
        title varchar not null,
        "order" smallint,
        description text,
        user_id int REFERENCES users(id) on delete cascade,
        board_id int REFERENCES boards(id) on delete cascade,
        colmun_id int REFERENCES columns(id) on delete cascade)`)

    console.log(`TABLES CREATED SUCCESSFULLY!`)
    return { success: true, message: `SETUP COMPLETED!` }
}


