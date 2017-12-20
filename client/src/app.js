const Request = require('./services/request.js');
const CountryView = require('./views/countryView.js');

const countryView = new CountryView();
const requestCountry = new Request("https://restcountries.eu/rest/v2/all");
const request = new Request("http://localhost:3000/countries");

const app = function() {
  const select = document.querySelector('#countries');
  requestCountry.get(function(countries) {
    countries.forEach(function(country) {
      const option = document.createElement('option');
      option.innerText = country.name;
      select.appendChild(option);
    });
  });

  const addCountryButton = document.querySelector('#add-country');
  addCountryButton.addEventListener('click', addButtonClicked);
}

const addButtonClicked = function(evt) {
  console.log('add btn has been clicked');
  const nameValue = document.querySelector('#countries').value;
  console.log(nameValue);

  const body = {
    countryName: nameValue
  }
  request.post(createCountryRequestComplete, body);
}

const createCountryRequestComplete = function(country) {
  console.log('checking log status');
  countryView.addCountry(country);
}

document.addEventListener('DOMContentLoaded', app);
