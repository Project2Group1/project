const router = require('express').Router();
const { Users } = require('../models');

// GET the homepage
router.get('/', async (req, res) => {
    try {
        res.render('homepage', {
            loggedIn: req.session.loggedIn,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// Login route
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// Logout route
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        // Remove the session variables
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;