import { correctCityName } from './correctCityName.js';
import { wrongCityName } from './wrongCity.js';
import { addDatalistOptions } from './addDatalistOption.js';
/**
 *
 * @param {object}cityData - Extracted JSON file
 * @description - Validates the option selected
 */
export function topcontainer (cityData) {
  const datalistOptions = document.getElementById('listsdata');
  addDatalistOptions(cityData, datalistOptions);
  document.querySelector('.image-city').addEventListener('change', (city) => {
    const inputElement = document.querySelector('.image-city');
    if ([...datalistOptions.options].some((option) => option.value === inputElement.value)) {
      correctCityName(city, cityData);
    } else {
      wrongCityName();
    }
  });
}
