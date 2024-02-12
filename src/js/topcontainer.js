import { changeCityDetails } from './cityWeatherUpdate.js';
import { wrongCityName } from './errorHandling.js';
import { midcontainer } from './midcontainer.js';
/**
 *
 * @param {object}cityData - Extracted JSON file
 * @description            - Validates the option selected
 */
export function topcontainer (cityData) {
  midcontainer(cityData);
  const datalistOptions = document.getElementById('listsdata');
  let cityName;
  let optionsArray = [];
  Object.keys(cityData).forEach(function (key) {
    cityName = cityData[key].cityName;
    if (cityName) {
      optionsArray.push(cityName);
    }
  });
  optionsArray = optionsArray.sort();
  optionsArray.forEach(function (element) {
    const options = document.createElement('option');
    options.value = element;
    datalistOptions.append(options);
  });
  const cityChange = {
    cityDetails: 'anadyr',
    changeCity: function () {
      changeCityDetails(cityData[this.cityDetails]);
    }
  };

  cityChange.changeCity();
  document.querySelector('.image-city').addEventListener('change', (city) => {
    const inputElement = document.querySelector('.image-city');
    console.log(cityChange.changeCity());
    if ([...datalistOptions.options].some((option) => option.value === inputElement.value)) {
      console.log(city.target.value.toLowerCase());
      const chooseCity = {
        cityDetails: city.target.value.toLowerCase()
      };
      const givenCityBind = cityChange.changeCity.bind(chooseCity);
      givenCityBind();
    } else {
      wrongCityName();
    }
  });
}
