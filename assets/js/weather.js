var searchButtonEl = $('.search-button');
var searchInputEl = $('#search-input');
var weatherTodayEl = $('#today');
var weatherForecastEl = $('#forecast');
var forecastHeadingEl = $('#forecast-heading');
var historyEl = $('#history');
var apiKey = 'daa042d001552289a98a636ea00daaed';
var iconUrl = 'https://openweathermap.org/img/w/';



function displayCurrentWeather(currentObj) {
    // display current weather of inputed city
    weatherTodayEl.html('');
    weatherTodayEl.append(`
        <div class="weather-today">
        <h3><b>${currentObj.name} (${moment(new Date(currentObj.dt * 1000).toUTCString()).format("DD/MM/YYYY")}) <img src='${iconUrl + currentObj.weather[0].icon}.png'></b></h3>
        <p>Temp: ${currentObj.main.temp} <span>&#176;</span>C</p>
        <p>Wind: ${currentObj.wind.speed} KPH</p>
        <p>Humidity: ${currentObj.main.humidity}%</p>
</div>`)

}

function displayForecastWeather(forcastObj) {
    // display forecast weather of inputed city
    weatherForecastEl.html('');
    for (var i = 0; i < forcastObj.length; i = i + 8) {
        var obj = forcastObj[i];
        weatherForecastEl.append(`
        <div class="eachdayforecast">
        <p>${moment(new Date(obj.dt * 1000).toUTCString()).format("DD/MM/YYYY")}</p>
        <img src='${iconUrl + obj.weather[0].icon}.png'>
              <p>Temp: ${obj.main.temp} <span>&#176;</span>C</p>
              <p>Wind: ${obj.wind.speed} KPH</p>
              <p>Humidity: ${obj.main.humidity}%</p>  
        </div>     

`);

    }
}

function onSearchClick(event) {
    // get inputed city value
    event.preventDefault();
    var searchCity = searchInputEl.val();
    getWeather(searchCity);
}

function getWeather(searchCity) {
    searchInputEl.val(searchCity);
    // fetch current and 5 day forecast weather data of inputed city from server 
    $.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=metric`)
        .then(function (currentData) {                // getting current weather from server
            console.log(currentData);
            displayCurrentWeather(currentData);
            $.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&appid=${apiKey}&units=metric`)
                .then(function (weatherData) {        // getting 5 day forecast weather from server
                    console.log(weatherData);
                    displayForecastWeather(weatherData.list);
                    updateHistory(searchCity);
                })

        });
}

function updateHistory(searchCity) {
    // store city in local storage
    cityName = [];
    if (!localStorage.getItem('ct'))
        localStorage.setItem('ct', JSON.stringify(cityName));
    var cName = localStorage.getItem('ct');
    cityName = JSON.parse(cName);
    if (!cityName.find(x => x === searchCity)) {
        cityName.push(searchCity);
    }
    localStorage.setItem('ct', JSON.stringify(cityName));

    displayhistory();
}

function displayhistory() {
    // parse city from cityName array and display weather of that city when history button of that city clicked
    var cName = localStorage.getItem('ct');
    cityName = JSON.parse(cName);
    historyEl.html('');
    for (var obj of cityName) {

        historyEl.append(`

<button class='btn search-history' onClick=getWeather('${obj}') >${obj}</button>

`)
    }

}




function init() {
    // when search button clicked

    searchButtonEl.click(onSearchClick);

}

init();












