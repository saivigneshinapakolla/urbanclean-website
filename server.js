const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3016;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.'));

// Create the connection pool
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || 'db',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'Vignesh@9#',
    database: process.env.MYSQL_DATABASE || 'urbanclean_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Initialize database and create table
const initializeDatabase = async () => {
    try {
        const connection = await pool.getConnection();
        
        // Create the contact_form table if it doesn't exist
        await connection.query(`
            CREATE TABLE IF NOT EXISTS contact_form (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                phone VARCHAR(20),
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        console.log('Database and table initialized successfully');
        connection.release();
    } catch (err) {
        console.error('Error initializing database:', err);
        throw err;
    }
};

// Initialize database when app starts
initializeDatabase().catch(console.error);

// Handle form submission
app.post('/api/contact', async (req, res) => {
    try {
        console.log('Received form submission:', req.body);
        
        const { name, email, phone, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({ 
                status: 'error', 
                message: 'Please fill in all required fields' 
            });
        }

        // Insert into database
        const [result] = await pool.execute(
            'INSERT INTO contact_form (name, email, phone, message) VALUES (?, ?, ?, ?)',
            [name, email, phone || null, message]
        );

        console.log('Message saved successfully:', result);
        
        return res.json({ 
            status: 'success', 
            message: 'Thank you for your message! We will get back to you soon.' 
        });

    } catch (err) {
        console.error('Database error:', err);
        return res.status(500).json({ 
            status: 'error', 
            message: 'Error saving your message. Please try again later.' 
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ 
        status: 'error', 
        message: 'An unexpected error occurred. Please try again later.' 
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 