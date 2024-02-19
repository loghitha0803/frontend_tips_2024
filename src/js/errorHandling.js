import { temperature, humidityValue, precipitationValue, farenheitValue, hrsMin, second, dateClass, amImage, imageValue, tempHourly, hourly } from './globalConstants.js';
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
