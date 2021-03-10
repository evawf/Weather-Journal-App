const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');
const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const entryHolder = document.getElementById('entryHolder');

//Retrive Data from Openweather API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '490a42fa7e4cec1525544b1a37201a2e';
const getWeatherData = async (ZipCode) => {
    const res = await fetch(baseURL+ZipCode+'&appid='+apiKey+'&units=metric')
    try {
        const data = await res.json();
        return data;
    }
    catch(error) {
        console.log("error", error);
    }
}

//Async POST
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log('error', error);
    }
}

//Post data 
document.getElementById('generate').addEventListener('click', addJournal);
async function addJournal(e){
    if(zip.value != "" && feelings.value != ""){
        let currentDate = new Date().toDateString() + " " + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        let data = await getWeatherData(document.getElementById('zip').value);
        let tempValue = data.main.temp;
        let locationValue = data.name + ", " + data.sys.country;
        let weatherValue = data.weather[0].main + ", feels like " + data.main.feels_like;
        const contentValue = document.getElementById('feelings').value;
        postData('/journal', {
            date: currentDate,
            location: locationValue,
            temp: tempValue,
            weather: weatherValue,
            content: contentValue
        })
        .then(
            updateUI()
        )
    }else{
        document.getElementById('entryHolder').innerHTML = "Please enter Zipcode and your feelings!";
        document.getElementById('entryHolder').style.color = "red";
    }
}

//Update UI
const updateUI = async () => {
    const request = await fetch('/journal');
    try{
        const allData = await request.json();
        const location = document.getElementById('location');
        const weather = document.getElementById('weather');
        date.innerHTML = allData[allData.length - 1].date;
        location.innerHTML = allData[allData.length - 1].location;
        const icon = document.createElement("SPAN");
        weather.appendChild(icon);
        icon.classList.add("material-icons-outlined");
        
        temp.innerHTML = allData[allData.length - 1].temp + '&deg;C';
        weather.innerHTML = allData[allData.length - 1].weather + '&deg;C';
        content.innerHTML = "I feel " + allData[allData.length - 1].content;
        entryHolder.classList.add("showCard");

        //Load map
        displayMap();
    }catch(error){
        console.log('error', error);
    }
}

//Display Map
async function displayMap(){
    let data = await getWeatherData(document.getElementById('zip').value);
    let lat = data.coord.lat;
    let lon = data.coord.lon;

    mapboxgl.accessToken = 'pk.eyJ1IjoiZXZhMjAyMSIsImEiOiJja2tiemNsbDIwaGJqMm9xaTYwYmE1Y3ZxIn0.YhNzI7I8fXILKdhilpnLUQ';
    var map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [lon, lat], // starting position [lng, lat]
    zoom: 9 // starting zoom
    });

    // Set options
    var marker = new mapboxgl.Marker({
        color: "#16c79a",
        draggable: true
    }).setLngLat([lon, lat])
    .addTo(map);
}