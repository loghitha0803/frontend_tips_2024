import { addSortCities, clickRightButton, clickLeftButton } from './sortclick.js';
import { defaultMiddleCityCards } from './errorHandling.js';
import { timerSecond } from './globalConstants.js';
let time;
/**
 * @function midcontainer
 * @param {object}cityData - The extracted details of all the cities in json file
 * @description    - To get the weather chosen by user
 */
export function midcontainer (cityData) {
  const cityCards = document.querySelector('.city-cards');
  const icons = document.querySelector('.icons');
  icons.addEventListener('click', function (e) {
    const iconClass = e.target;
    if (iconClass.getAttribute('class') === 'icon-size') {
      document.querySelectorAll('.icon-size').forEach(function (element) {
        element.style.borderBottom = 'none';
      });

      iconClass.style.borderBottom = '2px solid var(--bg-selection-blue)';
    }
  });
  const iconCombined = document.querySelectorAll('.icon-combined');
  defaultMiddleCityCards(cityData, cityCards);
  document.querySelector('.arrow-move-right').addEventListener('click', function () {
    clickRightButton(cityCards);
  });
  document.querySelector('.arrow-move-left').addEventListener('click', function () {
    clickLeftButton(cityCards);
  });
  addSortCities(cityData, iconCombined, cityCards);
}
/**
 * @function cloneCityCards
 * @param {Array}arr          -Sorted Array based on the given condition
 * @param {object}cityData    - The extracted details of all the cities in json file
 * @param {object}cityCards   -  The div inside which the citcards has been appended
 * @param {string}imageIcons  -  The string that holds the weather condition
 * @description               - To clone the cityCards
 */
export function cloneCityCards (arr, cityData, cityCards, imageIcons) {
  const index = document.querySelector('.option-click');
  let indexValue = index.value;
  removeCitycards(cityCards);
  let cloneDiv;
  for (let userInput = 0; userInput < indexValue; userInput++) {
    cloneDiv = `<div class="first-container">
    <div class="text-contained font-color">
        <span class="font-size-medium country-name">${cityData[arr[userInput]].cityName}</span>
        <span class="font-size-medium existing-time"></span>
        <div class="bottom-date">
            <span></span>
        </div>
        <div class="weather-icon">
            <div class="icons-weather">
                <img
                    class="weather-notation"
                    src="../../Assets/Weather Icons/humidityIcon.svg "
                    alt="humidityIcon"
                >
                <span class="font-size-small humidity-value">${cityData[arr[userInput]].humidity} </span>
            </div>
            <div class="icons-weather">
                <img
                    class="weather-notation"
                    src="../../Assets/Weather Icons/precipitationIcon.svg"
                    alt="precipitationIcon"
                >
                <span class="font-size-small precipitation-value"
                >${cityData[arr[userInput]].precipitation}
                </span>
            </div>
        </div>
    </div>
    <div class="image-contained">
        <div class="top-temp">
            <div class="icons-weather">
                <img
                    class="weather-notation particular-icon"
                    src="../../Assets/Weather Icons/${imageIcons}Icon.svg"
                    alt="sunnyIcon"
                >
                <span
                    class="font-size-small font-color temp-value-celsius"
                >${cityData[arr[userInput]].temperature}
                </span>
            </div>
            <br >
        </div>
        <div class="img-inside">
            <img
                class="img-top-inside"
                src="../../Assets/Icons for cities/${arr[userInput]}.svg"
                alt="city-image"
            >
        </div>
    </div>
</div>`;
    indexValue = arr.length > indexValue ? indexValue : arr.length;
    cityCards.insertAdjacentHTML('beforeend', cloneDiv);
  }
  updateTime(cityData, arr);
  clearInterval(time);
  time = setInterval(() => { updateTime(cityData, arr); }, timerSecond);
}
/**
 *@function updateTime
 *@param {object}cityData    - The extracted details of all the cities in json file
 *@param {Array}arr          -Sorted Array based on the given condition
 *@description               - To Calculate and update the Date and time every minute
 */
function updateTime (cityData, arr) {
  const cityCardsChange = document.querySelectorAll('.first-container');
  cityCardsChange.forEach(function (cityCard, userInput) {
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour12: true,
      timeZone: cityData[arr[userInput]].timeZone
    };
    const cityTime = new Date().toLocaleString('en-US', { ...options, day: undefined, month: undefined, year: undefined });
    const cityDate = new Date().toLocaleString('en-UK', { ...options, hour: undefined, minute: undefined });
    const existingTime = cityCard.querySelector('.existing-time');
    const bottomDate = cityCard.querySelector('.bottom-date');
    existingTime.textContent = cityTime;
    bottomDate.textContent = cityDate;
  });
}
/**
 * @function removeCitycards
 * @param {object}cityCards   -  The div inside which the citcards has been appended
 * @description               -  To remove the continent cards
 */
export function removeCitycards (cityCards) {
  while (cityCards.firstChild) {
    cityCards.removeChild(cityCards.firstChild);
  }
}
