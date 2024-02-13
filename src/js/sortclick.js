import { removeCitycards, cloneCityCards } from './midcontainer.js';
import { index } from './globalConstants.js';
let newTransformValue;

/**
 * @function sortcityWeatherBased
 * @param {object} cityData   -  The extracted details of all the cities in json file
 * @returns {Array}           -  Holds the sorted cities (sunny,cloudy,rainy)
 * @description               -  To sort the cities based on weather conditions
 */
export function sortcityWeatherBased (cityData) {
  const compareByPrecipitaion = (a, b) => parseInt(cityData[b].precipitation) - parseInt(cityData[a].precipitation);
  const sortCloudy = Object.keys(cityData)
    .filter(
      (cityKey) =>
        parseInt(cityData[cityKey].temperature) >= 20 && parseInt(cityData[cityKey].temperature) <= 28 && parseInt(cityData[cityKey].humidity) > 50 && parseInt(cityData[cityKey].precipitation) < 50
    )
    .sort(compareByPrecipitaion);
  const compareByTemperature = (a, b) => parseInt(cityData[b].temperature) - parseInt(cityData[a].temperature);
  const sortSunny = Object.keys(cityData)
    .filter((cityKey) => parseInt(cityData[cityKey].temperature) > 29 && parseInt(cityData[cityKey].humidity) < 50 && parseInt(cityData[cityKey].precipitation) >= 50)
    .sort(compareByTemperature);
  const compareByHumidity = (a, b) => parseInt(cityData[b].humidity) - parseInt(cityData[a].humidity);
  const sortRainy = Object.keys(cityData)
    .filter((cityKey) => parseInt(cityData[cityKey].temperature) < 20 && parseInt(cityData[cityKey].humidity) >= 50)
    .sort(compareByHumidity);
  return [sortSunny, sortCloudy, sortRainy];
}
/**
 * @function sortCities
 * @param {object} cityData     -  The extracted details of all the cities in json file
 * @param {object} iconCombined -  Holds the weather icon div
 * @param {object} cityCards    -  The div inside which the citcards to be appended
 * @description                 -  To add the sorted cities based on the input
 */
export function addSortCities (cityData, iconCombined, cityCards) {
  const sortedCities = sortcityWeatherBased(cityData);
  iconCombined.forEach(function (element, clickIndex) {
    element.addEventListener('click', function () {
      newTransformValue = 0;
      cityCards.style.transform = 'translateX(0px)';
      document.querySelector('.arrow-move-left').style.visibility = 'hidden';
      removeCitycards();
      const sortCall = {
        imageIcons: 'sunny',
        sortedCities: [],
        cloneCity: function () {
          cloneCityCards(this.sortedCities, cityData, cityCards, this.imageIcons);
        },
        indexplay: function () {
          indexChange(this.sortedCities, cityData, clickIndex, cityCards, this.imageIcons);
        }
      };
      if (clickIndex === 0) {
        index.value = 3;
        sortCall.sortedCities = sortedCities[clickIndex];
        sortCall.imageIcons = 'sunny';
      }

      if (clickIndex === 1) {
        index.value = 2;
        sortCall.sortedCities = sortedCities[clickIndex];
        sortCall.imageIcons = 'snowflake';
      }
      if (clickIndex === 2) {
        if (+index.value > 3) {
          document.querySelector('.arrow-move-right').style.visibility = 'hidden';
          document.querySelector('.arrow-move-left').style.visibility = 'visible';
        }
        sortCall.sortedCities = sortedCities[clickIndex];
        sortCall.imageIcons = 'rainy';
      }
      sortCall.cloneCity();
      sortCall.indexplay();
    });
  });
}
/**
 * @function changeIndex
 * @param {Array}sortedArray  -  The sorted array based on the weather condition
 * @param {object}cityData    -  The extracted details of all the cities in json file
 * @param {number}clickIndex  -  Holds the weather icon index
 * @param {object}cityCards   -  The div inside which the citcards to be appended
 * @param {string}imageIcons  -  The string that holds the weather condition
 * @description               -  clone citycards based on the user input
 */
export function indexChange (sortedArray, cityData, clickIndex, cityCards, imageIcons) {
  index.addEventListener('change', function () {
    if (+index.value > 3 && +clickIndex === 2) {
      document.querySelector('.arrow-move-right').style.visibility = 'hidden';
      document.querySelector('.arrow-move-left').style.visibility = 'visible';
    } else { document.querySelector('.arrow-move-left').style.visibility = 'hidden'; }
    cityCards.style.transform = 'translateX(0px)';
    cloneCityCards(sortedArray, cityData, cityCards, imageIcons);
    newTransformValue = 0;
  });
}
/**
 * @function clickRightButton
 * @param {object}cityCards   -  The div inside which the citcards has been appended
 * @description               -  Deals with the function of right arrow button
 */
export function clickRightButton (cityCards) {
  const numContainers = cityCards.children.length;
  const lastContainerIndex = numContainers - 1;
  if (lastContainerIndex > 2 && newTransformValue > 0) {
    document.querySelector('.arrow-move-left').style.visibility = 'visible';
    newTransformValue -= 405;
    cityCards.style.transform = `translateX(-${newTransformValue}px)`;
    if (+newTransformValue === 0) {
      document.querySelector('.arrow-move-right').style.visibility = 'hidden';
    }
  }
}

/**
 * @function clickLeftButton
 * @param {object}cityCards   -  The div inside which the citcards has been appended
 * @description               -  Deals with the function of right arrow button
 */
export function clickLeftButton (cityCards) {
  const numContainers = cityCards.children.length;
  const lastContainerIndex = numContainers - 1;
  if (lastContainerIndex > 2 && newTransformValue < 405 * (numContainers - 3)) {
    document.querySelector('.arrow-move-right').style.visibility = 'visible';
    newTransformValue += 405;
    cityCards.style.transform = `translateX(-${newTransformValue}px)`;
    if (+newTransformValue === 405 * (numContainers - 3)) {
      document.querySelector('.arrow-move-left').style.visibility = 'hidden';
    }
  }
}
