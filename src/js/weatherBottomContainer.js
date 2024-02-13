import { removeCitycards } from './midcontainer.js';
let isAscendingContinent = false;
let isAscendingTemperature = true;
let time;
/**
 * @function bottomContainer
 * @param {object} cityData   -  The extracted details of all the cities in json file
 * @description               -  To update the bottom container of the website based on the input
 */
export function bottomContainer (cityData) {
  const sortDefault = sortDataByContinent(cityData, isAscendingContinent, isAscendingTemperature);
  appendContinentCards(sortDefault, cityData);
  clickSortContinent(cityData);
  clickSortTemperature(cityData);
}
/**
 * @function sortDataByContinent
 * @param {object} cityData            `       -  The extracted details of all the cities in json file
 * @param {boolean}isAscendingContinent        -  Flag indicating the alphabetical order of the continent
 * @param {boolean}isAscendingTemperature      -  Flag indicating whether sorting of temperature should be in ascending
 * @returns {Array}                            -  Sorted Array based on the input
 * @description                                -  Sort the Array based on the continent and temperature.
 */
function sortDataByContinent (cityData, isAscendingContinent, isAscendingTemperature) {
  const continents = [...new Set(Object.values(cityData).map((city) => city.timeZone.split('/')[0]))].sort();
  let sortedData = continents.reduce((acc, continent) => {
    let citiesInContinent = Object.keys(cityData).filter((cityKey) => cityData[cityKey].timeZone.startsWith(continent)).sort();
    const compareByTemperature = (a, b) => isAscendingTemperature ? (parseInt(cityData[a].temperature) - parseInt(cityData[b].temperature)) : (parseInt(cityData[b].temperature) - parseInt(cityData[a].temperature));
    citiesInContinent = citiesInContinent.sort(compareByTemperature);
    acc.push(citiesInContinent);
    return acc;
  }, []);
  sortedData = isAscendingContinent ? sortedData : sortedData.reverse();
  return sortedData.flat(6);
}
/**
 * @function clickSortContinent
 * @param {object} cityData -  The extracted details of all the cities in json file
 * @description             -  To change the continent cards based on the continent flag
 */
function clickSortContinent (cityData) {
  const continent = document.querySelector('.continent-arrow');
  continent.addEventListener('click', function () {
    isAscendingContinent = !isAscendingContinent;
    const updown = isAscendingContinent ? 'Up' : 'Down';
    continent.src = `../../../Assets/General Images & Icons/arrow${updown}.svg`;
    const continentSort = sortDataByContinent(cityData, isAscendingContinent, isAscendingTemperature);
    appendContinentCards(continentSort, cityData);
  });
}
/**
 * @function clickSortTemperature
 * @param {object} cityData -  The extracted details of all the cities in json file
 * @description             -  To change the continent cards based on the temperature flag
 */
function clickSortTemperature (cityData) {
  const temperatureArrow = document.querySelector('.temp-arrow');
  temperatureArrow.addEventListener('click', function () {
    isAscendingTemperature = !isAscendingTemperature;
    const updown = isAscendingTemperature ? 'Up' : 'Down';
    temperatureArrow.src = `../../../Assets/General Images & Icons/arrow${updown}.svg`;
    const temperatureSort = sortDataByContinent(cityData, isAscendingContinent, isAscendingTemperature);
    appendContinentCards(temperatureSort, cityData);
  });
}
/**
 * @function appendContinentCards
 * @param {Array}sortedArray -Sorted array based on the continent and temperature order
 * @param {object} cityData  -  The extracted details of all the cities in json file
 * @description              -  To append the continent cards
 */
function appendContinentCards (sortedArray, cityData) {
  const cityGrid = document.querySelector('.city-grid');
  removeCitycards(cityGrid);
  let cityBox;
  for (let noOfContinentCards = 0; noOfContinentCards < 12; noOfContinentCards++) {
    cityBox = `<div class="city-box">
    <div class="continent-name-city">
        <div class="continent-name">
            <span>${cityData[sortedArray[noOfContinentCards]].timeZone.split('/')[0]}</span>
        </div>
        <div class="city-name">
            <span>${cityData[sortedArray[noOfContinentCards]].cityName} , </span><span class='city-name continent-time'></span>
        </div>
    </div>
    <div class="temp-status">
        <div class="temperature-align font-color font-size-large">
            <span>${cityData[sortedArray[noOfContinentCards]].temperature}</span>
        </div>
        <div class="note-status">
            <img
                class="weather-icon-city"
                src="../../Assets/Weather Icons/humidityIcon.svg"
                alt="humidityIcon"
            >
            <span class="font-color font-size-small humidity-continent">${cityData[sortedArray[noOfContinentCards]].humidity}</span>
        </div>
    </div>
              </div>`;
    cityGrid.insertAdjacentHTML('beforeend', cityBox);
  }
  updateContinentTime(cityData, sortedArray);
  clearInterval(time);
  time = setInterval(() => { updateContinentTime(cityData, sortedArray); }, 1000 * 60);
}
/**
 * @function updateContinentTime
 * @param {object} cityData  -  The extracted details of all the cities in json file
 * @param {Array}sortedArray - Sorted array based on the continent and temperature order
 * @description              -  To update the time
 */
function updateContinentTime (cityData, sortedArray) {
  const continentDetails = document.querySelectorAll('.city-box');
  continentDetails.forEach(function (cityCard, index) {
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: cityData[sortedArray[index]].timeZone,
      hour12: true
    };
    const currentContinentTime = new Date().toLocaleString(undefined, options);
    const continentTime = cityCard.querySelector('.continent-time');
    continentTime.textContent = currentContinentTime;
  }
  );
}
