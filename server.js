if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
console.log(process.env.apiKey);

let projectData = {};

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('website'));

const port = 3000;
const server = app.listen(port, listening);
function listening(){
    console.log(`Server is running on localhost: ${port}`);
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
    const newEntries = {
        date: req.body.date,
        location: req.body.location,
        temp: req.body.temp,
        weather: req.body.weather,
        content: req.body.content
     }
    data.push(newEntries);
    let projectData = data;
    res.send(projectData);
};