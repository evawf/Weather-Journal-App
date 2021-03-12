if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const apiKey = process.env.OW_KEY;

let projectData = {};

const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static('website'));

const port = 3000;
const server = app.listen(port, listening);
function listening(){
    console.log(`Server is running on localhost: ${port}`);
}

//GET route
app.get('/journal', getJournal);
function getJournal(req, res){
    let projectData = data;
    console.log(projectData);
    res.send(projectData);
}

//POST a journal
const data = [];
app.post('/journal', addJournal);
async function addJournal(req, res){
    let currentDate = new Date().toDateString() + " " + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const newEntry = {
        content: req.body.content,
        zip: req.body.zip,
        date: currentDate,
    }
    weatherData = await getWeatherData(newEntry.zip);
    newEntry['temp'] = Math.round(weatherData.main.temp);
    newEntry['location'] = `${weatherData.name}, ${weatherData.sys.country}`;
    newEntry['weather'] = `${weatherData.weather[0].main}, feels like ${weatherData.main.feels_like}`;
    newEntry['lat'] = weatherData.coord.lat;
    newEntry['lon'] = weatherData.coord.lon;


    data.push(newEntry);
    res.send(data);
}

const weatherApiBaseURL = 'http://api.openweathermap.org/data/2.5/weather';
const getWeatherData = async (ZipCode) => {
    try {
        const res = await axios.get(weatherApiBaseURL, { params: {
            zip: `${ZipCode},us`,
            appid: apiKey,
            units: 'metric',
        }})
        return res.data;
    }
    catch(error) {
        console.log("error", error);
    }
}

