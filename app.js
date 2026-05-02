const express = require('express');
const db = require('./db');
const app = express();

// Set EJS as our Server-Side Rendering (SSR) engine
app.set('view engine', 'ejs');

// This middleware allows Express to read data sent from HTML forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// READ - Display all users
app.get('/', async (req, res) => {
    try {
        const [users] = await db.query('SELECT * FROM users');
        res.render('index', { users });
    } catch (err) {
        res.status(500).send('Database Error');
    }
});

// CREATE - Add a new user
app.post('/add', async (req, res) => {
    const { name, email } = req.body;
    await db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    res.redirect('/'); // Refresh the page to show the new user
});

// DELETE - Remove a user (Using POST because standard HTML forms don't support DELETE methods)
app.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM users WHERE id = ?', [id]);
    res.redirect('/');
});

module.exports = app;