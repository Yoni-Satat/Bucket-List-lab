const CountryView = function() {
  this.countries = [];
}

CountryView.prototype.addCountry = function(country) {
  this.countries.push(country);
  console.log(this.countries);
  this.render(country);
}

CountryView.prototype.render = function(country) {
  console.log('are you logged?');
  const ul = document.querySelector('#countries-list');
  const li = document.createElement('li');
  li.innerText = `D BucketList ${country.countryName}`;
  ul.appendChild(li);
}


module.exports = CountryView;
