const Request = require('./services/request.js');

const requestCountry = new Request("https://restcountries.eu/rest/v2/all");

const app = function() {
  const select = document.querySelector('#countries');
  requestCountry.get(function(countries) {
    countries.forEach(function(country) {
      const option = document.createElement('option');
      option.innerText = country.name;
      select.appendChild(option);
    });
  });

  
}

document.addEventListener('DOMContentLoaded', app);
