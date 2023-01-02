var searchButtonEl = $('.search-button');
var searchInputEl = $('#search-input');
var weatherTodayEl = $('#today');
var weatherForecastEl = $('#forecast');
var forecastHeadingEl = $('#forecast-heading');
var historyEl = $('#history');
var apiKey = 'daa042d001552289a98a636ea00daaed';
var iconUrl = 'https://openweathermap.org/img/w/';

function displayCurrentWeather(currentObj) {

    weatherTodayEl.html('');
    weatherTodayEl.append(`
        <div class="weather-today">
        <h3><b>${currentObj.name} (${moment(new Date(currentObj.dt * 1000).toUTCString()).format("DD/MM/YYYY")}) <img src='${iconUrl + currentObj.weather[0].icon}.png'></b></h3>
        <p>Temp: ${currentObj.main.temp}C</p>
        <p>Wind: ${currentObj.wind.speed}KPH</p>
        <p>Humidity: ${currentObj.main.humidity}%</p>
</div>`)

}

function displayForecastWeather(forcastObj) {
    weatherForecastEl.html('');
    for (var i = 0; i < forcastObj.length; i = i + 8) {
        var obj = forcastObj[i];
        weatherForecastEl.append(`

        <div class="eachdayforecast">
        <p>${moment(new Date(obj.dt * 1000).toUTCString()).format("DD/MM/YYYY")}</p>
        <img src='${iconUrl + obj.weather[0].icon}.png'>
              <p>Temp: ${obj.main.temp}</p>
              <p>Wind: ${obj.wind.speed}</p>
              <p>Humidity: ${obj.main.humidity}</p>
              
        </div>     

`);

    }
}

function onSearchClick(event) {
    event.preventDefault();
    var searchCity = searchInputEl.val();
    getWeather(searchCity);
}

function getWeather(searchCity) {
    $.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=metric`)
        .then(function (currentData) {
            console.log(currentData);
            displayCurrentWeather(currentData);
            $.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&appid=${apiKey}&units=metric`)
                .then(function (weatherData) {
                    console.log(weatherData);
                    displayForecastWeather(weatherData.list);
                    updateHistory(searchCity);
                })

        });
}

function updateHistory(searchCity) {
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
    var cName = localStorage.getItem('ct');
    cityName = JSON.parse(cName);
    historyEl.html('');
    for (var obj of cityName) {

        historyEl.append(`

<button class='search-history' onClick=getWeather('${obj}') >${obj}</button>


`)
    }

}




function init() {

    searchButtonEl.click(onSearchClick);

}

init();






//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}











/* <div class="weather-today">
            <h4>London (21/12/2022)</h4>
            <p>Temp: 15C</p>
            <p>Wind: 1.7KPH</p>
            <p>Humidity: 84%</p>
    </div>
          
   
        
        
    <div class="five-day-forecast">
            <div class="eachday-forecast">
                  <p>20/12/2022</p>
                  <p>Cloud Icon</p>
                  <p>Temp: 12C</p>
                  <p>Wind:1.7KPH</p>
                  <p>Humidity: 84%</p>
            </div>     
    </div> 
*/







