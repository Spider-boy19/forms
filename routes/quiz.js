const express = require('express');
const router = express.Router();
const {readFile} = require('fs').promises;

// Work goes here
let users = [];
let nextId = 1;

router.get('/', (req, res) =>{ 
    res.render("users", {users});
});

router.get("/new", (req, res) => {
    res.render("new");
});

router.get("/", async (req, res) => {
    let chosenWords = await getWords();

    let totalQuestions = parseInt(req.query.totalQuestions) || 0;
    let totalCorrect = parseInt(req.query.totalCorrect) || 0;
    let isCorrect = req.query.isCorrect;
    let correctDef = req.query.correctDef;

    res.render("quiz", {
        chosenWords,
        totalQuestions,
        totalCorrect,
        isCorrect,
        correctDef
    });
});

router.post("/", (req, res) => {
    let { userChoice, correctDef, totalQuestions, totalCorrect } = req.body;

    totalQuestions = parseInt(totalQuestions) || 0;
    totalCorrect = parseInt(totalCorrect) || 0;

    let isCorrect = userChoice === correctDef;

    if (isCorrect) {
        totalCorrect++;
    }

    totalQuestions++;

    res.redirect(`/quiz?totalQuestions=${totalQuestions}&totalCorrect=${totalCorrect}&isCorrect=${isCorrect}&correctDef=${encodeURIComponent(correctDef)}`);
});

router.get("/:id", (req, res) =>{
    let user = users.find(u => u.id == req.params.id);

    if (!user) {
        return res.status(404).send("User not found");
    }

    res.render("user", { user });
});

let getWords = async ()=>{
    let randomPart = getRandomPart();
    let allWords = await readFile('resources/allwords.txt', 'utf8');
    let wordArray = allWords.split('\n');
    shuffle(wordArray);
    //console.log(wordArray);
    let choices = [];
    while(choices.length < 5){
        let line = wordArray.pop();
        console.log("Truing to split", line);
        let tokens = line.split('\t');
        let word = tokens[0];
        let part = tokens[1];
        let def = tokens[2];
        if(part === randomPart){
            choices.push(line);
        }
    }
    return choices;
}

let getRandomPart = ()=>{
    let parts = ['noun', 'verb', 'adjetive'];
    let randomIndex = Math.floor(Math.random()*parts.length);
    let randomPart = parts[randomIndex];
    return randomPart;

    
}

let shuffle = (array)=>{
    for(let i = array.length-1;i>0;i--)
    {
        let randomNumber = Math.floor(Math.random()*(i+1));
        [array[i], array[randomNumber]] = [array[randomNumber], array[i]];
    }
}



module.exports = router;