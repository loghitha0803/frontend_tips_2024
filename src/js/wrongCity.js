import { imageValue, temperature, humidityValue, precipitationValue, hrsMin, second, dateClass, amImage, farenheitValue } from './correctCityName.js';
import { tempHourly, hourlyImage } from './weatherIconChange.js';
/**
 * @description - Deals with the wrong cityname by the user
 */
export function wrongCityName () {
  alert('Please Enter the Correct City Name');
  imageValue.style.visibility = 'hidden';
  temperature.innerText = '-';
  humidityValue.innerText = '-';
  precipitationValue.innerText = '-';
  farenheitValue.innerText = '-';
  hrsMin.style.visibility = 'hidden';
  second.style.visibility = 'hidden';
  dateClass.style.visibility = 'hidden';
  amImage.style.visibility = 'hidden';
  hourlyImage.innerText = 'NIL';
  const tempHourlyUpdate = Array.from(tempHourly).map((element) => element.textContent);
  for (let index = 0; index < tempHourlyUpdate.length; index++) {
    tempHourly[index].textContent = 'NIL';
  }
  document.querySelectorAll('.first-class').textContent = '-';
}
