import { temperature, humidityValue, precipitationValue, styleHidden, styleVisible, farenheitValue, hrsMin, second, dateClass, index, amImage, imageValue, tempHourly, hourly } from './globalConstants.js';
import { weatherArray } from './sortclick.js';
import { cloneCityCards } from './midcontainer.js';
/**
 * @function handleInvalidCityName
 * @description - Deals with the wrong cityname given as input by the user
 */
export function handleInvalidCityName () {
  alert('Please Enter the Correct City Name');
  temperature.innerText = '-';
  humidityValue.innerText = '-';
  precipitationValue.innerText = '-';
  farenheitValue.innerText = '-';
  changeStyle(styleHidden);
  hourly.innerText = 'NIL';
  tempHourly.forEach(function (element, index) {
    element.textContent = 'NIL';
  });
}
/**
 *
 * @param {string} visibilityProperty -Style of some classes on wrong city selection
 * @description                       -To change the style accordingly
 */
export function changeStyle (visibilityProperty) {
  hrsMin.style.visibility = visibilityProperty;
  second.style.visibility = visibilityProperty;
  dateClass.style.visibility = visibilityProperty;
  amImage.style.visibility = visibilityProperty;
  imageValue.style.visibility = visibilityProperty;
}
/**
 * @function defaultMiddleCityCards
 * @param {object}cityData -Holds the details of the cities from the extracted JSON file
 * @param {object}cityCards   -  The div inside which the citcards to be appended
 * @description            -To add the citycards default
 */
export function defaultMiddleCityCards (cityData, cityCards) {
  document.querySelector('.icon-size').style.borderBottom = '2px solid var(--bg-selection-blue)';
  const sortedCitiesSunny = weatherArray(cityData);
  if (Math.round(window.innerWidth / 352) <= +(index.value)) {
    document.querySelector('.arrow-move-right').style.visibility = styleHidden;
    document.querySelector('.arrow-move-left').style.visibility = styleVisible;
  } else {
    document.querySelector('.arrow-move-right').style.visibility = styleHidden;
    document.querySelector('.arrow-move-left').style.visibility = styleHidden;
  }
  cloneCityCards(sortedCitiesSunny[0], cityData, cityCards, 'sunny');
}
