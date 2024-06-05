function displayCityWeather(response) {
    temperatureElement = document.querySelector("#temperature");
    temperature = response.data.temperature.current

    cityElement = document.querySelector("#search-city");
    descriptionElement= document.querySelector("#description");
    humidityElement = document.querySelector("#Humidity");
    windElement= document.querySelector("#wind");
    timeElement = document.querySelector("#time");
    let date = new Date ( response.data.time * 1000);
    let iconElement = document.querySelector("#icon")
    


    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date)
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`
    windElement.innerHTML = `${response.data.wind.speed}km/h`
    iconElement.innerHTML = `<img src =" ${response.data.condition.icon_url}" class="weather-app-icon" >`
    temperatureElement.innerHTML = Math.round(temperature)

    getForecast(response.data.city)
}
function formatDate(date){
    
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    let day = days[date.getDay()]

    if (minutes<10) {
         minutes=`0${minutes}`
    } 

    


    return `${day} ${hours}:${minutes},`

}



function searchCity(city) {
    apikey = "1df5t4a9fa606ob9e4a15e053411da3c";
    apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&units=metric`;
    axios.get(apiUrl).then(displayCityWeather);
}


function showSearch(event) {
    event.preventDefault();
let searchElement = document.querySelector("#search-input-form");
    


searchCity(searchElement.value);
}
function formatDay(timestamp) {
    let date = new Date (timestamp* 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

    return days [date.getDay()];
}

function getForecast(city) {
    let apikey = "1df5t4a9fa606ob9e4a15e053411da3c";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apikey}&units=metric`;
    console.log(apiUrl);
    axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");

    
    let forecastHtml = "";

    response.data.daily.forEach(function(day){
        forecastHtml = 
        forecastHtml +
            `<div class="weather-forecast-day">
                        
                            
                                
                                    <div class="forecast-date">${formatDay(day.time)}</div>
                                    <img src="${day.condition.icon_url}"
                                        alt="" width="40" class="forecast-image">
                                    <div class="forecast-temperature">
                                        <span class="temperature-maximum">${Math.round(day.temperature.maximum)}&deg;</span>
                                        <span class="temperature-minimum">${Math.round(day.temperature.minimum)}&deg;</span>
                                    </div>

                                </div>


                            </div>
                         </div>`
            ;

    })

    forecastElement.innerHTML= forecastHtml;

    
    

}


let searchInputElement= document.querySelector("#search-input");
searchInputElement.addEventListener("submit",showSearch);

searchCity("Paris");




