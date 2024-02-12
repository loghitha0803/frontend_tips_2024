import { clickSunny, clickRainy, clickCloudy, clickLeftButton, clickRightButton } from './sortCitiesButtons.js';
import { defaultMiddleCityCards } from './errorHandling.js';
const cityCards = document.querySelector('.city-cards');
let firstContainer;
/**
 * @function midcontainer
 * @param {object}cityData - The extracted details of all the cities in json file
 * @description    - To get the weather chosen by user
 */
export function midcontainer (cityData) {
  firstContainer = document.querySelector('.first-container');
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
  defaultMiddleCityCards(cityData);
  document.querySelector('.arrow-move-right').addEventListener('click', function () {
    clickRightButton(cityCards);
  });
  document.querySelector('.arrow-move-left').addEventListener('click', function () {
    clickLeftButton(cityCards);
  });

  iconCombined.forEach(function (weatherIcon, clickIndex) {
    if (clickIndex === 0) {
      clickSunny(cityData, weatherIcon, clickIndex, cityCards);
    }
    if (clickIndex === 1) {
      clickCloudy(cityData, weatherIcon, clickIndex, cityCards);
    }

    if (clickIndex === 2) {
      clickRainy(cityData, weatherIcon, clickIndex, cityCards);
    }
  });
}
/**
 * @function removeCitycards
 * @description - To  remove the citycards according to the input
 */
export function removeCitycards () {
  const cityCards = document.querySelector('.city-cards');
  while (cityCards.firstChild) {
    cityCards.removeChild(cityCards.firstChild);
  }
}
/**
 * @function cloneCityCards
 * @param {Array}arr -Sorted Array based on the given condition
 * @param {object}cityData - The extracted details of all the cities in json file
 * @param {number}clickIndex - index of the chosen weather icon
 * @description - To clone the cityCards
 */
export function cloneCityCards (arr, cityData, clickIndex) {
  const index = document.querySelector('.option-click');
  let indexValue = index.value;
  removeCitycards();
  for (let userInput = 0; userInput < indexValue; userInput++) {
    const cloneDiv = firstContainer.cloneNode(true);
    const countryName = cloneDiv.querySelector('.country-name');
    const existingTime = cloneDiv.querySelector('.existing-time');
    const bottomDate = cloneDiv.querySelector('.bottom-date');
    countryName.textContent = arr[userInput];
    updateTime();
    indexValue = arr.length > indexValue ? indexValue : arr.length;
    /**
     *@function updateTime
     *@description - To Calculate and update the Date and time every minute
     */
    function updateTime () {
      const options = {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour12: true,
        timeZone: cityData[arr[userInput]].timeZone
      };
      existingTime.textContent = new Date().toLocaleString('en-US', { ...options, day: undefined, month: undefined, year: undefined });
      bottomDate.textContent = new Date().toLocaleString('en-UK', { ...options, hour: undefined, minute: undefined });
      setInterval(updateTime, 1000 * 60);
    }
    const tempValue = cloneDiv.querySelector('.temp-value-celsius');
    tempValue.textContent = cityData[arr[userInput]].temperature;
    const humidityChange = cloneDiv.querySelector('.humidity-value');
    humidityChange.textContent = cityData[arr[userInput]].humidity;
    const precipitationChange = cloneDiv.querySelector('.precipitation-value');
    precipitationChange.textContent = cityData[arr[userInput]].precipitation;
    if (clickIndex === 2) {
      cloneDiv.querySelector('.particular-icon').src = '../../Assets/Weather Icons/rainyIcon.svg';
    } else if (clickIndex === 1) {
      cloneDiv.querySelector('.particular-icon').src = '../../Assets/Weather Icons/snowflakeIcon.svg';
    }

    cloneDiv.querySelector('.img-top-inside').src = `../../Assets/Icons for cities/${arr[userInput]}.svg`;
    cityCards.appendChild(cloneDiv);
  }
}
