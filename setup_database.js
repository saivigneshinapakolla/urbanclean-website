const mysql = require('mysql2');

// Database configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Change this to your MySQL username
    password: 'Vignesh@9#', // Change this to your MySQL password
    multipleStatements: true // Allow multiple SQL statements
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');

    // Create database and table
    const sql = `
        CREATE DATABASE IF NOT EXISTS urbanclean_db;
        USE urbanclean_db;
        CREATE TABLE IF NOT EXISTS contact_form (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            phone VARCHAR(20),
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error setting up database:', err);
            return;
        }
        console.log('Database and table created successfully');
        process.exit();
    });
}); 