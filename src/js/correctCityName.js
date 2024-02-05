import { weatherIconChange } from './weatherIconChange.js';
import { updateDate } from './updateDate.js';
const imageValue = document.querySelector('.first-image');
const temperature = document.querySelector('.temp-value-celsius');
const humidityValue = document.querySelector('.humidity-value');
const precipitationValue = document.querySelector('.precipitation-value');
const hrsMin = document.querySelector('.hrs-mins');
const second = document.querySelector('.seconds');
const dateClass = document.querySelector('.date');
const amImage = document.querySelector('.am-image');
const farenheitValue = document.querySelector('.temp-value-farenheit');
let givenInput;
export { imageValue, temperature, humidityValue, precipitationValue, hrsMin, second, dateClass, amImage, farenheitValue };
/**
 *
 * @param { string } city - Name of the city chosen by the user(Capitalised text)
 * @param { object }cityData - Extracted JSON file
 * @description - Temperature parameter changes if the user selects the city
 */
export function correctCityName (city, cityData) {
  givenInput = city.target.value.toLowerCase();
  setInterval(() => updateDynamicTime(givenInput, cityData), 1000);
  imageValue.style.visibility = 'visible';
  imageValue.src = `../../../Assets/Icons for cities/${givenInput}.svg`;
  temperature.innerText = `${cityData[givenInput].temperature}`;
  humidityValue.innerText = `${cityData[givenInput].humidity}`;
  precipitationValue.innerText = `${cityData[givenInput].precipitation}`;
  const [tempvalue] = cityData[givenInput].temperature.split('\u00B0C');
  farenheitValue.innerText = Math.round(Number(tempvalue) * 1.8 + 32, 0) + 'F';
  hrsMin.style.visibility = 'visible';
  second.style.visibility = 'visible';
  dateClass.style.visibility = 'visible';
  amImage.style.visibility = 'visible';
  /**
   *
   *@param {string}givenInput - Name of the city chosen by the user(lowercased text)
   * @param {object}cityData  - Extracted JSON file
   */
  function updateDynamicTime (givenInput, cityData) {
    console.log(givenInput);
    const currentTime = new Date().toLocaleString(undefined, {
      timeZone: cityData[givenInput].timeZone
    });

    updateDate(currentTime);
  }
  weatherIconChange(givenInput, cityData);
}
