/* eslint-disable id-match */
let cityGrid;
let cityBox;
let cityCloneBox;
let selectedCitiesContinent;
// let compareByContinent
let sortedCitiesContinent;
let cloneAll;
let continentName;
let currentCity;
let CurrentContinentTime;
let cityDetails;
/**
 *
 * @param cityData
 */
export function bottomContainer (cityData) {
  appendContinent(cityData);
  sortContinent(cityData);
}
/**
 *
 * @param cityData
 */
function appendContinent (cityData) {
  cityGrid = document.querySelector('.city-grid');
  cityBox = document.querySelector('.city-box');
  for (let i = 0; i < 11; i++) {
    cityCloneBox = cityBox.cloneNode(true);
    cityGrid.appendChild(cityCloneBox);
  }
}
/**
 *
 * @param cityData
 */
function sortContinent (cityData) {
  selectedCitiesContinent = Object.keys(cityData);
  console.log(selectedCitiesContinent);

  sortedCitiesContinent = sortDataByContinent(cityData);
  console.log(sortedCitiesContinent);
}
/**
 *
 * @param data
 * @param cityData
 */
function sortDataByContinent (cityData) {
  const sortedData = {};

  const continents = [
    ...new Set(
      Object.values(cityData).map((city) => city.timeZone.split('/')[0])
    )
  ].sort();

  continents.forEach(function (continent) {
    const citiesInContinent = Object.keys(cityData)
      .filter((cityKey) => cityData[cityKey].timeZone.startsWith(continent))
      .sort();
    citiesInContinent.forEach(function (cityKey, flag) {
      console.log(cityKey);
      sortedData[continent] = citiesInContinent.map((cityKey) => cityKey);
      console.log(sortedData.Africa[0]);
    });
    for (let i = 0; i < continents.length; i++) {
      const compareByTemperature = (a, b) =>
        cityData[b].temperature - cityData[a].temperature;
      //   sortedData[`${continents[i]}`] = sortedData[`${continents[i]}`].sort()

      console
        .log(sortedData[`${continents[i]}`])(sortedData[`${continents[i]}`])
        .sort();
      console.log(sortArray);
    }
  });
  changeContinent(sortedData, cityData);
  return sortedData;
}

// Call the function to sort the city data by continent names
/**
 *
 * @param data
 * @param city
 * @param cityData
 */
function changeContinent (city, cityData) {
  console.log(cityData.nome);
  cloneAll = document.querySelectorAll('.city-box');
  console.log(cloneAll);
  for (let j = 0; j < cloneAll.length; j++) {
    continentName = cloneAll[j].querySelector('.continent-name');

    continentName.textContent = cityData[city[j]].timeZone.split('/')[0];
    cityDetails = cloneAll[j].querySelector('.city-name');
    cityDetails.textContent =
      cityData[city[j]].cityName + ',' + updateContinentTime(cityData);
    cityDetails = cloneAll[j].querySelector('.temperature-align');
    cityDetails = cloneAll[j].querySelector('.humidity-continent');
    if (cityDetails == 'dsc') {
      console.log('nkn');
    }
    if (true) {
      console.log('jbjb');
    }
    /**
     *
     * @param cityData
     */
    function updateContinentTime (cityData) {
      const options = {
        hour: 'numeric',
        minute: 'numeric',
        timeZone: cityData[city[j]].timeZone,
        hour12: true
      };
      CurrentContinentTime = new Date().toLocaleString(undefined, options);
      return CurrentContinentTime;
    }
  }
}
