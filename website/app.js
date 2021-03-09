const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');

//Retrive Data from Openweather API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '490a42fa7e4cec1525544b1a37201a2e';
const getWeatherData = async (ZipCode) => {
    const res = await fetch(baseURL+ZipCode+'&appid='+apiKey+'&units=metric')
    try {
        const data = await res.json();
        const tempValue = data['main']['temp'];
        console.log(tempValue);
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
    let currentDate = new Date().toLocaleDateString();
    // date.textContent = currentDate;
    let tempValue = await getWeatherData(document.getElementById('zip').value);
    const contentValue = document.getElementById('feelings').value;
    console.log(contentValue);
    // content.textContent = contentValue;
    postData('/journal', {date: currentDate, temp: tempValue, content: contentValue})
    .then(
        updateUI()
    )
}

//Update UI
const updateUI = async () => {
    const request = await fetch('/journal');
    try{
        const allData = await request.json();
        date.innerHTML = allData[0].date;
        temp.innerHTML = allData[0].temp;
        content.innerHTML = allData[0].content;
    }catch(error){
        console.log('error', error);
    }
}
