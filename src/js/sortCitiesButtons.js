import { removeCitycards, cloneCityCards } from './midcontainer.js';
let newTransformValue;
const index = document.querySelector('.option-click');
/**
 * @function sunny
 * @param {object}cityData - The extracted details of all the cities in json file
 * @returns {Array}        - Array which holds the city name under the condition of sunny
 * @description            - To filter the cities under city condition
 */
export function sunny (cityData) {
  const selectedCitiesSunny = Object.keys(cityData).filter((cityKey) => parseInt(cityData[cityKey].temperature) > 29 && parseInt(cityData[cityKey].humidity) < 50 && parseInt(cityData[cityKey].precipitation) >= 50);
  return selectedCitiesSunny;
}
/**
 * @function clickSunny
 * @param {object} cityData   -  The extracted details of all the cities in json file
 * @param {object}weatherIcon -  Holds the weather icon div
 * @param {number}clickIndex  -  Holds the weather icon index
 * @param {object}cityCards   -  The div inside which the citcards to be appended
 * @description               -  To sort the sunny cities
 */
export function clickSunny (cityData, weatherIcon, clickIndex, cityCards) {
  weatherIcon.addEventListener('click', function () {
    index.value = 3;
    index.disabled = true;
    newTransformValue = 0;
    cityCards.style.transform = 'translateX(0px)';
    removeCitycards();
    const compareByTemperature = (a, b) => cityData[b].temperature - cityData[a].temperature;
    const sortedCitiesRainy = sunny(cityData).sort(compareByTemperature);
    cloneCityCards(sortedCitiesRainy, cityData, clickIndex);
    changeIndex(sortedCitiesRainy, cityData, clickIndex, cityCards, index.value);
  });
}
/**
 * @function clickRainy
 * @param {object} cityData   -  The extracted details of all the cities in json file
 * @param {object}weatherIcon -  Holds the weather icon div
 * @param {number}clickIndex  -  Holds the weather icon index
 * @param {object}cityCards   -  The div inside which the citcards to be appended
 * @description               -  To sort the rainy cities
 */
export function clickRainy (cityData, weatherIcon, clickIndex, cityCards) {
  weatherIcon.addEventListener('click', function () {
    index.disabled = false;
    cityCards.style.transform = 'translateX(0px)';
    newTransformValue = 0;
    document.querySelector('.arrow-move-left').style.visibility = 'visible';
    removeCitycards();
    const compareByHumidity = (a, b) => parseInt(cityData[b].humidity) - parseInt(cityData[a].humidity);
    const sortedCitiesRainy = (Object.keys(cityData).filter((cityKey) => parseInt(cityData[cityKey].temperature) < 20 && parseInt(cityData[cityKey].humidity) >= 50)).sort(compareByHumidity);
    cloneCityCards(sortedCitiesRainy, cityData, clickIndex);
    changeIndex(sortedCitiesRainy, cityData, clickIndex, cityCards, index.value);
  });
}
/**
 * @function clickCloudy
 * @param {object} cityData   -  The extracted details of all the cities in json file
 * @param {object}weatherIcon -  Holds the weather icon div
 * @param {number}clickIndex  -  Holds the weather icon index
 * @param {object}cityCards   -  The div inside which the citcards to be appended
 * @description               -  To sort the cloudy cities
 */
export function clickCloudy (cityData, weatherIcon, clickIndex, cityCards) {
  weatherIcon.addEventListener('click', function () {
    cityCards.style.transform = 'translateX(0px)';
    newTransformValue = 0;
    index.value = 2;
    index.disabled = 'true';
    removeCitycards();
    const compareByPrecipitaion = (a, b) => cityData[b].precipitation - cityData[a].precipitation;
    const sortedCitiesCold = (Object.keys(cityData).filter((cityKey) => parseInt(cityData[cityKey].temperature) >= 20 && parseInt(cityData[cityKey].temperature) <= 28 && parseInt(cityData[cityKey].humidity) > 50 && parseInt(cityData[cityKey].precipitation) < 50)).sort(compareByPrecipitaion);
    cloneCityCards(sortedCitiesCold, cityData, clickIndex);
    changeIndex(sortedCitiesCold, cityData, clickIndex, cityCards, index.value);
  });
}
/**
 * @function changeIndex
 * @param {Array}sortedArray  -  The sorted array based on the weather condition
 * @param {object}cityData    -  The extracted details of all the cities in json file
 * @param {number}clickIndex  -  Holds the weather icon index
 * @param {object}cityCards   -  The div inside which the citcards to be appended
 * @param {string}indexValue  -  Change in the number of citycards by the user
 * @description               -  clone citycards based on the user input
 */
export function changeIndex (sortedArray, cityData, clickIndex, cityCards, indexValue) {
  if (+index.value <= 3) {
    document.querySelector('.arrow-move-right').style.visibility = 'hidden';
    document.querySelector('.arrow-move-left').style.visibility = 'hidden';
  }
  index.addEventListener('change', function () {
    console.log(clickIndex);
    if (+index.value === 3) {
      document.querySelector('.arrow-move-right').style.visibility = 'hidden';
      document.querySelector('.arrow-move-left').style.visibility = 'hidden';
    } else if (+index.value > 3 && clickIndex === 2) {
      document.querySelector('.arrow-move-left').style.visibility = 'visible';
    }
    cityCards.style.transform = 'translateX(0px)';
    cloneCityCards(sortedArray, cityData, clickIndex);
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
    if (+newTransformValue === 0) { document.querySelector('.arrow-move-right').style.visibility = 'hidden'; }
  }
}

/**
 * @function clickRightButton
 * @param {object}cityCards   -  The div inside which the citcards has been appended
 * @description               -  Deals with the function of left arrow button
 */
export function clickLeftButton (cityCards) {
  const numContainers = cityCards.children.length;
  const lastContainerIndex = numContainers - 1;
  if (lastContainerIndex > 2 && newTransformValue < 405 * (numContainers - 3)) {
    document.querySelector('.arrow-move-right').style.visibility = 'visible';
    newTransformValue += 405;
    cityCards.style.transform = `translateX(-${newTransformValue}px)`;
    if (+newTransformValue === 405 * (numContainers - 3)) { document.querySelector('.arrow-move-left').style.visibility = 'hidden'; }
  }
}
