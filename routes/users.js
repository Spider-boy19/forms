const express = require('express');
const router = express.Router();


router.get('/', (req, res)=>{
    res.send('User List')
});

router.get('/new', (req, res) => {
    res.render('users/new', {firstName: "Test"});
});

router.route('/:id').get((req, res)=>{
    console.log(req.user);
    console.log(`getting User data for id: ${req.user['name']}`);
    res.send(`Getting User Data for id: ${req.param.id}`);
}).delete((req, res)=>{
    res.send(`Deleting User data for id: ${req.param.id}`);
}).put((req, res)=>{
    res.send(`Updating User data for id: ${req.params.id}`);
});

const users = [{name:"George"}, {name:"Justyna"}];
router.param("id", (req, res, nest, id)=>{
    req.user = user[id];
    next();
});

module.exports = router;
