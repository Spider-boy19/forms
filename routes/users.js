const express = require('express');
const router = express.Router();

// Fake database
const users = [
    { id: 0, firstName: "George",  lastName:"Salayka", age:40, gender:"male"},
];

// GET all users
router.route('/').get( (req, res) => {
    res.render('users');
}).post((req,res)=>{
    const firstName = req.body.firstName;
    const age = parseInt(req.body.lastName);
    const gender = req.body.gender;
    const lastName = req.body.lastName;
    const isValid = firstName !=="" && lastName !=="" && age!=="";
    if (isValid){
        console.log(`Adding user: ${firstName}`);
        users.push({firstName, lastName, age, gender});
        console.log("users", users);
        res.render('users/list' ,{users});
    }
    else{
        console.log("Error adding users!");
        res.render("users/new", {firstName:firstName});
    }
});

router.get(`list`, (req,res)=>{
    res.render('users/list', {users});
})
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
    res.render('users/user', {user:req.user}); //instead do res.render to a page and send back the whole user object
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
    // const user = users.find(u => u.id === parseInt(id));
    req.user=users[id];
    // if (!user) {
    //     req.user = null;
    // } else {
    //     req.user = user;
    // }

    next();
});

module.exports = router;
