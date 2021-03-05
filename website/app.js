let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+"."+ d.getFullYear();

const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/jason',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
    } catch(error) {
        console.log('error', error);
    }
}

let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '490a42fa7e4cec1525544b1a37201a2e';

document.getElementById('generate').addEventListener('click', getWeatherInfo);

function getWeatherInfo(e){
    const newZipCode = document.getElementById('zip').value;
    getWeather(baseURL, newZipCode, apiKey)
}

const getWeather = async (baseURL, newZipCode, apiKey) => {
    const res = await fetch(baseURL+newZipCode+'&appid='+apiKey)
    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch(error) {
        console.log('error', error);
    }
}

function postJournal(){
    postData('/addJournal', {data: data})
}

postJournal();