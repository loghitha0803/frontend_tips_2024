import { updateIcon } from './updateIcon.js';
const tempHourly = document.querySelectorAll('.temperature-hourly-update');
const hourly = document.querySelectorAll('.hourly-image');
const hourlyImage = Array.from(hourly).map((element) => element.src);
export { tempHourly, hourlyImage };
/**
 *
 * @param {string}givenInput - Name of the city chosen by the user(lowercased text)
 * @param {object}cityData - Extracted JSON file
 * @description - Holds the temperature value for next five hours
 */
export function weatherIconChange (givenInput, cityData) {
  const updatedTimings = cityData[givenInput].nextFiveHrs;
  updatedTimings.unshift(cityData[givenInput].temperature);

  for (let index = 0; index < updatedTimings.length; index++) {
    updatedTimings[index] = updatedTimings[index].slice(0, -2);
    if (Number(updatedTimings[index]) >= 23 && Number(updatedTimings[index]) <= 29) {
      hourlyImage[index] = '../../../Assets/Weather Icons/cloudyIcon.svg';
    } else if (Number(updatedTimings[index]) >= 18 && Number(updatedTimings[index]) <= 22) {
      hourlyImage[index] = '../../../Assets/Weather Icons/windyIcon.svg';
    } else if (Number(updatedTimings[index]) < 18) {
      hourlyImage[index] = '../../../Assets/Weather Icons/rainyIcon.svg';
    } else if (Number(updatedTimings[index])) {
      hourlyImage[index] = '../../../Assets/Weather Icons/sunnyIcon.svg';
    }
  }
  const tempHourlyUpdate = Array.from(tempHourly).map((element) => element.textContent);
  for (let index = 0; index < tempHourlyUpdate.length; index++) {
    tempHourly[index].textContent = updatedTimings[index] + '\u00B0C';
  }
  updatedTimings.shift();
  updateIcon(hourlyImage);
}
