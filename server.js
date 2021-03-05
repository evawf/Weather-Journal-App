projectData = {};

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('website'));

const port = 3000;
const server = app.listen(port, listening);
function listening(){
    console.log(`running on localhost: ${port}`);
};

app.get('/', sendData);
function sendData(req, res){
    res.send(projectData);
};

const data = [];
app.post('/addJournal', addJournal);
function addJournal(req, res){
    function addJournal(req, res){
        newEntry = {
            zip: req.body.zip,
            feelings: req.body.feelings
        }
        data.push(newEntry);
        console.log(data);
    }
}