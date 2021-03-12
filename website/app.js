const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');
const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const entryHolder = document.getElementById('entryHolder');

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
const addJournal = async (e) => {
    if(zip.value != "" && feelings.value != ""){
        data = await postData('/journal', {
            zip: zip.value,
            content: feelings.value,
        });
        updateUI();
    }else{
        if(zip.value == ""){
            document.getElementById('entryHolder').innerHTML = "Please enter the correct zipcode!";
        }
        if(feelings.value == ""){
            document.getElementById('entryHolder').innerHTML = "Please enter your feelings!";
        }
        if(zip.value == "" && feelings.value == ""){
            document.getElementById('entryHolder').innerHTML = "Please enter zipcode and your feelings!";
        }
        document.getElementById('entryHolder').style.color = "#ff9900";
        setTimeout(function() {
            location.reload(1);
        }, 5000);
    }
}

//Update UI
const updateUI = async () => {
    const request = await fetch('/journal');
    try{
        const allData = await request.json();
        const location = document.getElementById('location');
        const weather = document.getElementById('weather');
        data = allData[allData.length - 1];
        date.innerHTML = data.date;
        location.innerHTML = data.location;
        temp.innerHTML = "<i class='fas fa-snowflake'></i>" + data.temp + '&deg;C' + "<i class='fas fa-temperature-low'></i>";
        weather.innerHTML = "<i class='fas fa-cloud'></i>" + data.weather + '&deg;C';
        content.innerHTML = "I feel " + data.content;
        entryHolder.classList.add("showCard");

        //Load map
        await displayMap(data.lat, data.lon);
    }catch(error){
        console.log('error', error);
    }
}

//Display Map
const displayMap = async(lat, lon) => {
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

document.getElementById('generate').addEventListener('click', addJournal);
updateUI();
