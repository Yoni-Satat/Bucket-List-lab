const CountryView = function() {
  this.countries = [];
}

CountryView.prototype.addCountry = function(country) {
  this.countries.push(country);
  console.log(this.countries);
  this.render(country);
}

CountryView.prototype.render = function(country) {
  console.log(country);
  const ul = document.querySelector('#countries-list');
  const liName = document.createElement('li');
  liName.innerText = `D BucketList ${country.name}`;
  const liCapital = document.createElement('li');
  liCapital.innerText = country.capital;
  ul.appendChild(liName);
  ul.appendChild(liCapital);
}

CountryView.prototype.clear = function(country) {
  this.country = [];
  const ul = document.querySelector('#countries-list');
  ul.innerHTML = '';
}


module.exports = CountryView;
