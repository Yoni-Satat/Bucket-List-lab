const Request = require('./services/request.js');
const CountryView = require('./views/countryView.js');

const countryView = new CountryView();
const requestCountry = new Request("https://restcountries.eu/rest/v2/all");
const request = new Request("http://localhost:3000/countries");

const app = function() {
  const select = document.querySelector('#countries');

  requestCountry.get(function(countries) {
    const addButtonClicked = function(evt) {
      const index = document.querySelector('#countries').value;
      const country = countries[index];
      request.post(createCountryRequestComplete, country);
    }

    const addCountryButton = document.querySelector('#add-country');
    addCountryButton.addEventListener('click', addButtonClicked);

    countries.forEach(function(country, index) {
      const option = document.createElement('option');
      option.innerText = country.name;
      option.value = index;
      select.appendChild(option);
    });
  });

  const deleteButton = document.querySelector('#delete-all');
  deleteButton.addEventListener('click', deleteButtonClicked);

// END
}

const deleteButtonClicked = function(evt) {
  console.log('delete button clicked');
  request.delete(deleteRequestComplete);
}

const deleteRequestComplete = function() {
  countryView.clear();
}

const createCountryRequestComplete = function(country) {
  countryView.addCountry(country);
}

document.addEventListener('DOMContentLoaded', app);
