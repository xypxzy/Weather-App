'use strict'

const container = document.querySelector('.container');
const weatherContent = document.querySelector('.weatherContent');


let weather = {
    'apiKeys': '4e0f733bcb83269e7da9165f48542178',
    fetchWeather: function (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKeys}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.displayWeather(data)
            })
    },
    displayWeather: function (data) {
        const {name} = data;
        const {country} = data.sys;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        console.log(name, icon, description, temp, humidity, speed, country)

        weatherContent.classList.add('hidden')

        const html = `
            <div class="weatherContentWindow">
                <div class="headerBlock">                
                    <span class="material-symbols-outlined backBtn">arrow_back</span>
                    <p class="contentText"> Weather App</p>
                </div>
                <div class="line"></div>
                <div class="innerBlock">
                    <img class="icon" alt="Icons" width="120px">
                    <div class="temperature">${(temp - 273).toFixed(2)}&degC</div>
                    <div class="description">${capitalize(description)}</div>
                    <div class="city country">${name}, ${country}</div>
                </div>
                <div class="line"></div>
                <div class="floorBlock">
                    <div class="speedWind">
                        <img src="./windSpeedIcon.png" alt="wind speed icon" width="30px">
                        <div class="speedInfo">
                            <p>${speed} mps</p>
                            <p>Wind Speed</p>
                        </div>
                    </div>
                    <div class="humidity">
                        <img src="./humadityIcon.png" alt="humidity icon" width="30px">
                        <div class="humidityInfo">
                            <p>${humidity}%</p>
                            <p>Humadity</p>
                        </div>
                    </div>
                </div>`;
        container.insertAdjacentHTML('beforeend', html)
        document.querySelector('.icon').src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        document.querySelector('.backBtn').addEventListener('click', arrowBackBtn);

    }
}

/*Button Arrow Back*/

function arrowBackBtn(event) {
    document.querySelector('.weatherContentWindow').classList.add('hidden');
    weatherContent.classList.remove('hidden');
}

/*Capitalizing every word in the string*/
function capitalize(str) {
    return str.split(' ').map((word) => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`).join(' ')

}

/*Clear input value*/

let city;

const input = document.querySelector('.inputCity');
input.addEventListener('click', (e) => {
    input.value = '';
})

input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        console.log(input.value)
        city = input.value;
        weather.fetchWeather(city)
        input.value = ''
    }
})