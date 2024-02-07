import { changeCityDetails } from './CityWeatherUpdate.js';
import { wrongCityName } from './errorHandling.js';
/**
 *
 * @param {object}cityData - Extracted JSON file
 * @description            - Validates the option selected
 */
export function topcontainer (cityData) {
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
  const defaultInput = 'anadyr';
  const cityDetails = cityData[defaultInput];
  changeCityDetails(cityDetails, defaultInput);
  document.querySelector('.image-city').addEventListener('change', (city) => {
    const inputElement = document.querySelector('.image-city');
    if ([...datalistOptions.options].some((option) => option.value === inputElement.value)) {
      const givenInput = city.target.value.toLowerCase();
      const cityDetails = cityData[givenInput];
      changeCityDetails(cityDetails, givenInput);
    } else {
      wrongCityName();
    }
  });
}
