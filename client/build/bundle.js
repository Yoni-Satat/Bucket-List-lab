/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Request = __webpack_require__(1);
const CountryView = __webpack_require__(2);

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

const Request = function(url) {
  this.url = url;
}

Request.prototype.get = function(callback) {
  const request = new XMLHttpRequest();
  request.open('GET', this.url);
  request.addEventListener('load', function() {
    if(this.status !== 200) {
      return;
    }
    const responseBody = JSON.parse(this.responseText);
    callback(responseBody);
  });
  request.send();
}

Request.prototype.post = function(callback, body) {
  const request = new XMLHttpRequest();
  request.open('POST', this.url);
  request.setRequestHeader('Content-Type', 'application/json');
  request.addEventListener('load', function() {
    console.log('Yoni wants to log');
    if(this.status !== 201) {
      return;
    }
    const responseBody = JSON.parse(this.responseText);
    console.log(responseBody);
    callback(responseBody);
  });
  console.log('body',body);
  request.send(JSON.stringify(body));
}

Request.prototype.delete = function(callback) {
  const request = new XMLHttpRequest();
  request.open('DELETE', this.url);
  request.addEventListener('load', function() {
    if(this.status !== 204) {
      return;
    }
    callback();
  });
  request.send();
}

module.exports = Request;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map