const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "SmartNotes",
    port: process.env.DB_PORT,
});

// Test connection
db.getConnection((err, connection) => {
    if (err) {
        console.error("❌ MySQL connection error:", err);
    } else {
        console.log("✅ MySQL connected!");
        connection.release();
    }
});

module.exports = db;

