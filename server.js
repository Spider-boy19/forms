const express = require('express');
const app = express();
const userRouter = require('./routes/users');
const quizRouter = require('./routes/quiz');


app.set('view engine', 'ejs');
app.use(express.static("public"));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/users', userRouter);
app.use('/quiz', quizRouter);
// GET /submit - logs query parameters
app.get('/submit', (req, res) => {
  console.log('--- GET Request Received ---');
  console.log('Query Parameters:', req.query);
  Object.entries(req.query).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}`);
  });
  console.log('----------------------------');
  res.send('<h2>GET request received!</h2><pre>' + JSON.stringify(req.query, null, 2) + '</pre>');
});

app.get('/solution', (req, res)=>{
  let FirstNum = parseInt(req.query['FirstNum']);
  let SecondNum = parseInt(req.query['SecondNum']);
  let total = FirstNum + SecondNum;
  res.send(`<h2>${FirstNum} + ${SecondNum} = ${total} </h2>`);
});

// POST /submit - logs body contents
app.post('/submit', (req, res) => {
  console.log('--- POST Request Received ---');
  console.log('Body:', req.body);
  Object.entries(req.body).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}`);
  });
  console.log('-----------------------------');
  res.send('<h2>POST request received!</h2><pre>' + JSON.stringify(req.body, null, 2) + '</pre>');
});

app.listen(3030, () => {
  console.log('Server running on http://localhost:3030');
});