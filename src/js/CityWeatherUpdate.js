import { changeStyle } from './errorHandling.js';
import { imageValue, temperature, humidityValue, timerSecond, styleVisible, precipitationValue, farenheitValue, tempHourly, hourly } from './globalConstants.js';
let time;
/**
 *
 * @param {object}cityDetails -  Particular city details in the json file
 * @description               - To change the city details in both default and user chosen input
 */
export function changeCityDetails (cityDetails) {
  updateDynamicTime(cityDetails);
  clearInterval(time);
  time = setInterval(updateDynamicTime, timerSecond, cityDetails);
  imageValue.src = `../../../Assets/Icons for cities/${cityDetails.cityName}.svg`;
  temperature.innerText = `${cityDetails.temperature}`;
  humidityValue.innerText = `${cityDetails.humidity}`;
  precipitationValue.innerText = `${cityDetails.precipitation}`;
  const tempvalue = parseInt(cityDetails.temperature);
  farenheitValue.innerText = Math.round(Number(tempvalue) * 1.8 + 32, 0) + 'F';
  changeStyle(styleVisible);
  /**
   *
   *@param {string}cityDetails - Particular city details in the json file
   * @description              - To Get the time of the city to the server
   */
  function updateDynamicTime (cityDetails) {
    const currentTime = new Date().toLocaleString('en-US', { timeZone: cityDetails.timeZone });
    updateDate(currentTime);
  }
  changeWeatherIcon(cityDetails);
}
/**
 *
 * @param {string}cityDetails - Particular city details in the json file
 * @description               - Holds the temperature value for next five hours
 */
function changeWeatherIcon (cityDetails) {
  const updatedTimings = cityDetails.nextFiveHrs;
  updatedTimings.unshift(cityDetails.temperature);
  hourly.forEach(function (element, index) {
    updatedTimings[index] = parseInt(updatedTimings[index]);
    tempHourly[index].textContent = updatedTimings[index] + '\u00B0C';
    if (Number(updatedTimings[index]) >= 23 && Number(updatedTimings[index]) <= 29) {
      element.src = '../../../Assets/Weather Icons/cloudyIcon.svg';
    } else if (Number(updatedTimings[index]) >= 18 && Number(updatedTimings[index]) <= 22) {
      element.src = '../../../Assets/Weather Icons/windyIcon.svg';
    } else if (Number(updatedTimings[index]) < 18) {
      element.src = '../../../Assets/Weather Icons/rainyIcon.svg';
    } else if (Number(updatedTimings[index])) {
      element.src = '../../../Assets/Weather Icons/sunnyIcon.svg';
    }
  });
  updatedTimings.shift();
}
/**
 *
 * @param {string} currentTime - Current time of the selected city
 * @description                -  Holds the time and date value for the city
 */
function updateDate (currentTime) {
  const hrsMin = document.querySelector('.hrs-mins');
  const second = document.querySelector('.seconds');
  const dateClass = document.querySelector('.date');
  const amImage = document.querySelector('.am-image');
  const nextFiveHrs = document.querySelectorAll('.next-five-hrs');
  const date = new Date(currentTime);
  let hrs = `${date.getHours()}`.padStart(2, 0);
  const mins = `${date.getMinutes()}`.padStart(2, 0);
  const sec = `${date.getSeconds()}`.padStart(2, 0);
  const datesplit = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();
  let meridian = Number(hrs) >= 12 ? 'PM' : 'AM';
  hrs = Number(hrs) === 12 || Number(hrs) === 0 ? 12 : hrs % 12;
  hrsMin.innerText = `${hrs}:${mins}`;
  second.innerText = `:${sec}`;
  dateClass.innerText = `${datesplit}/${month}/${year}`;
  amImage.src = '../../../Assets/General Images & Icons/' + `${meridian.toLowerCase()}` + 'State.svg';
  currentTime = hrs;
  nextFiveHrs.forEach(function (element, index) {
    if (meridian === 'AM') {
      meridian = Number(currentTime) === 11 ? 'PM' : 'AM';
    } else {
      meridian = Number(currentTime) === 11 ? 'AM' : 'PM';
    }
    currentTime = (currentTime % 12) + 1;
    element.textContent = currentTime + meridian;
  });
}
