const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');
const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');

//Retrive Data from Openweather API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '490a42fa7e4cec1525544b1a37201a2e';
const getWeatherData = async (ZipCode) => {
    const res = await fetch(baseURL+ZipCode+'&appid='+apiKey+'&units=metric')
    try {
        const data = await res.json();
        const tempValue = data['main']['temp'];
        return tempValue;
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
        let currentDate = new Date().toLocaleDateString();
        let tempValue = await getWeatherData(document.getElementById('zip').value);
        const contentValue = document.getElementById('feelings').value;
        postData('/journal', {date: currentDate, temp: tempValue, content: contentValue})
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
        console.log(allData);
        date.innerHTML = allData[allData.length - 1].date;
        temp.innerHTML = allData[allData.length - 1].temp + '&deg;C';
        content.innerHTML = allData[allData.length - 1].content;
    }catch(error){
        console.log('error', error);
    }
}
