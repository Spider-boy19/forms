const express = require('express');
const router = express.Router();

// Fake database
const users = [
    { id: 0, name: "George" },
    { id: 1, name: "Justyna" }
];

// GET all users
router.get('/', (req, res) => {
    res.send(users);
});

// GET new user form
router.get('/new', (req, res) => {
    res.render('users/new', { firstName: "Test" });
});

// Routes for specific user
router.route('/:id')
.get((req, res) => {
    if (!req.user) {
        return res.status(404).send("User not found");
    }
    res.send(`Getting User Data for: ${req.user.name}`);
})
.delete((req, res) => {
    if (!req.user) {
        return res.status(404).send("User not found");
    }
    res.send(`Deleting User: ${req.user.name}`);
})
.put((req, res) => {
    if (!req.user) {
        return res.status(404).send("User not found");
    }
    res.send(`Updating User: ${req.user.name}`);
});

// Middleware to get user by ID
router.param("id", (req, res, next, id) => {
    const user = users.find(u => u.id === parseInt(id));

    if (!user) {
        req.user = null;
    } else {
        req.user = user;
    }

    next();
});

module.exports = router;
