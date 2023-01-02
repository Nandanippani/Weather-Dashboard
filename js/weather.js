var searchButtonEl = $('.search-button');
var searchInputEl = $('#search-input');
var weatherTodayEl = $('#today');
var weatherForecastEl = $('#forecast');
var forecastHeadingEl = $('#forecast-heading');
var apiKey = 'daa042d001552289a98a636ea00daaed';
var iconUrl = 'https://openweathermap.org/img/w/';

function displayCurrentWeather(currentObj) {

    weatherTodayEl.html('');
    weatherTodayEl.append(`
        <div class="weather-today">
        <p>${currentObj.name} ${moment(new Date(currentObj.dt * 1000).toUTCString()).format("DD/MM/YYYY")} <img src='${iconUrl + currentObj.weather[0].icon}.png'></p>
        <p>Temp: ${currentObj.main.temp}C</p>
        <p>Wind: ${currentObj.wind.speed}KPH</p>
        <p>Humidity: ${currentObj.main.humidity}%</p>
</div>`)

}

function displayForecastWeather(forcastObj) {
    weatherForecastEl.html('');
    for (var obj of forcastObj) {
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

function getWeather(event) {
    event.preventDefault();
    var searchCity = searchInputEl.val();
    $.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=metric`)
        .then(function (currentData) {
            console.log(currentData);
            displayCurrentWeather(currentData);
            $.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&appid=${apiKey}&units=metric`)
                .then(function (weatherData) {
                    console.log(weatherData);
                    displayForecastWeather(weatherData.list.slice(0, 5));
                })

        });




}



function init() {

    searchButtonEl.click(getWeather);
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







