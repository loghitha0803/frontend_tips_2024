import { temperature, humidityValue, precipitationValue, farenheitValue, hrsMin, second, dateClass, amImage, imageValue, tempHourly, hourly } from './globalConstants.js';
import { sunny } from './sortCitiesButtons.js';
import { cloneCityCards } from './midcontainer.js';
/**
 * @function wrongCityName
 * @description - Deals with the wrong cityname given as input by the user
 */
export function wrongCityName () {
  const hidden = 'hidden';
  alert('Please Enter the Correct City Name');
  temperature.innerText = '-';
  humidityValue.innerText = '-';
  precipitationValue.innerText = '-';
  farenheitValue.innerText = '-';
  changeStyle(hidden);
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
 * @description            -To add the citycards default
 */
export function defaultMiddleCityCards (cityData) {
  document.querySelector('.arrow-move-left').style.visibility = 'hidden';
  document.querySelector('.arrow-move-right').style.visibility = 'hidden';
  const hoverDiv = document.querySelectorAll('.icon-combined');
  hoverDiv.forEach(function () {
    document.querySelector('.icon-size').style.borderBottom = '2px solid var(--bg-selection-blue)';

    const compareByTemperature = (a, b) => cityData[b].temperature - cityData[a].temperature;
    const sortedCitiesSunny = sunny(cityData).sort(compareByTemperature);
    cloneCityCards(sortedCitiesSunny, cityData);
  });
}
