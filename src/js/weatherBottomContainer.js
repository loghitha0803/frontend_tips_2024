let cityGrid;
let cityBox;
let cityCloneBox;
let selectedCitiesContinent;
let sortedCitiesContinent;
let cloneAll;
let continentName;
let currentContinentTime;
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
  const sortedData = [];

  const continents = [...new Set(Object.values(cityData).map((city) => city.timeZone.split('/')[0]))].sort();

  continents.forEach(function (continent) {
    let citiesInContinent = Object.keys(cityData).filter((cityKey) => cityData[cityKey].timeZone.startsWith(continent)).sort();
    console.log(continents);
    console.log(citiesInContinent);
    const compareByTemperature = (a, b) => parseInt(cityData[b].temperature) - parseInt(cityData[a].temperature);
    citiesInContinent = citiesInContinent.sort(compareByTemperature);
    console.log(citiesInContinent);
    citiesInContinent.forEach(function (cityname) {
      sortedData.push(cityname);
    });
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
  console.log(city);
  cloneAll = document.querySelectorAll('.city-box');
  console.log(cloneAll);
  for (let j = 0; j < cloneAll.length; j++) {
    continentName = cloneAll[j].querySelector('.continent-name');
    console.log(city[j]);
    console.log(cityData[city[j]]);
    continentName.textContent = cityData[city[j]].timeZone.split('/')[0];
    console.log(cloneAll[j]);
    cityDetails = cloneAll[j].querySelector('.city-name');
    console.log(cityDetails);
    cityDetails.textContent = cityData[city[j]].cityName + ',' + updateContinentTime(cityData);
    let cityTemperature = cloneAll[j].querySelector('.temperature-align');
    console.log(cityTemperature.textContent);
    cityTemperature.textContent= cityData[city[j]].temperature;
    console.log(cityTemperature);
    let cityHumidity = cloneAll[j].querySelector('.humidity-continent');
    cityHumidity.textContent = cityData[city[j]].humidity;
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
      currentContinentTime = new Date().toLocaleString(undefined, options);
      return currentContinentTime;
    }
  }
}
