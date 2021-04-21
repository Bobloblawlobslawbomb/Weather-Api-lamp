import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './services/weather-service.js';
import GiphyService from './services/giphy-service';

function clearFields() {
  $('#location').val("");
  $('.showErrors').text("");
}

function displayWeatherDescription(description) {
  $('.weather-desription').text(`The weather is ${description}!`);
}

function displayGif(response) {
  const url = response.data.[0].images.downsized.url;
  $('.show-gif').html(`<img src='${url}'>`);
}

function displayErrors(error) {
  $('.show-errors').text(`${error}`);
}

function getElements(response) {
  if (response.main) {
    $('.showHumidity').text(`The humidity in ${response.name} is ${response.main.humidity}%`);
    $('.showTemp').text(`The temperature in Fahrenheit is ${response.main.temp} degrees.`);
  } else {
    $('.showErrors').text(`There was an error: ${response.message}`);
  }
}

async function makeApiCall(city){
  const response = await WeatherService.getWeather(city);
  getElements(response);
}


$(document).ready(function() {
  $('#weatherLocation').click(function() {
    let city = $('#location').val();
    clearFields();
    makeApiCall(city);
  });
});