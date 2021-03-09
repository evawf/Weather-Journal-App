const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
let projectData = {};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('website'));

const port = 3000;
const server = app.listen(port, listening);
function listening(){
    console.log(`running on localhost: ${port}`);
};

//GET route
app.get('/journal', getJournal);
function getJournal(req, res){
    let projectData = data;
    console.log(projectData);
    res.send(projectData);
};

//POST a journal
const data = [];
app.post('/journal', addJournal);
function addJournal(req, res){
    let currentDate = new Date().toLocaleDateString();
    const newEntries = {
        date: currentDate,
        temp: req.body.temp,
        content: req.body.content
     }
    data.push(newEntries);
    let projectData = data;
    res.send(projectData);
}