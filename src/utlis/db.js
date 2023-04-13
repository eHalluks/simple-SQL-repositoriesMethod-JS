import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'todolist',
    namedPlaceholders: true,
    decimalNumbers: true,
    queueLimit: 0,
    connectionLimit: 10,
    waitForConnections: true,
});

export const dbConfigModule = {
    pool,
}