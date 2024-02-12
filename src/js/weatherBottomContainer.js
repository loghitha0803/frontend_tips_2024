// import { temperature } from './globalConstants';
let isascendingcontinent = false;
let istemperatureSort = true;
/**
 *
 * @param cityData
 */
export function bottomContainer (cityData) {
  const sortDefault = sortDataByContinent(cityData, isascendingcontinent, istemperatureSort);
  changeContinent(sortDefault, cityData);
  clickSortContinent(cityData);
  clickSortTemp(cityData);
}
/**
 *
 * @param cityData
 */
// function appendContinent (cityData) {

//   // const cityBox = document.querySelector('.city-box');
//   for (let i = 0; i < 11; i++) {
//     const cityBox =`<div class="city-box">
//     <div class="continent-name-city">
//         <div class="continent-name">
//             <span>Asia</span>
//         </div>
//         <div class="city-name">
//             <span>Delhi, 10:10AM</span>
//         </div>
//     </div>
//     <div class="temp-status">
//         <div class="temperature-align font-color font-size-large">
//             <span>38 &deg;C</span>
//         </div>
//         <div class="note-status">
//             <img
//                 class="weather-icon-city"
//                 src="../../Assets/Weather Icons/humidityIcon.svg"
//                 alt="humidityIcon"
//             >
//             <span class="font-color font-size-small humidity-continent">53%</span>
//         </div>
//     </div>
// </div>`
//     cityGrid=document.querySelector('.city-grid')
//     cityGrid.
//   }
// }
/**
 *
 * @param cityData
 */
/**
 *
 * @param data
 * @param cityData
 * @param isascending
 * @param isascendingcontinent
 * @param istemperatureSort
 */
function sortDataByContinent (cityData, isascendingcontinent, istemperatureSort) {
  let sortedData = [];
  const continents = [...new Set(Object.values(cityData).map((city) => city.timeZone.split('/')[0]))].sort();
  continents.forEach(function (continent) {
    let citiesInContinent = Object.keys(cityData).filter((cityKey) => cityData[cityKey].timeZone.startsWith(continent)).sort();
    const compareByTemperature = (a, b) => istemperatureSort ? (parseInt(cityData[a].temperature) - parseInt(cityData[b].temperature)) : (parseInt(cityData[b].temperature) - parseInt(cityData[a].temperature));
    citiesInContinent = citiesInContinent.sort(compareByTemperature);
    sortedData.push(citiesInContinent);
  });
  sortedData = isascendingcontinent ? sortedData : sortedData.reverse();
  sortedData = sortedData.flat(6);
  return sortedData;
}
/**
 *
 * @param cityData
 */
function clickSortContinent (cityData) {
  const continent = document.querySelector('.continent-arrow');
  continent.addEventListener('click', function () {
    isascendingcontinent = !isascendingcontinent;
    const updown = isascendingcontinent ? 'Up' : 'Down';
    continent.src = `../../../Assets/General Images & Icons/arrow${updown}.svg`;
    const continentSort = sortDataByContinent(cityData, isascendingcontinent, istemperatureSort);
    changeContinent(continentSort, cityData);
  });
}
/**
 *
 * @param cityData
 */
function clickSortTemp (cityData) {
  const temperatureArrow = document.querySelector('.temp-arrow');
  temperatureArrow.addEventListener('click', function () {
    istemperatureSort = !istemperatureSort;
    const updown = istemperatureSort ? 'Up' : 'Down';
    temperatureArrow.src = `../../../Assets/General Images & Icons/arrow${updown}.svg`;
    const temperatureSort = sortDataByContinent(cityData, isascendingcontinent, istemperatureSort);
    changeContinent(temperatureSort, cityData);
  });
}
// Call the function to sort the city data by continent names
/**
 *
 * @param data
 * @param city
 * @param cityData
 * @param cityCards
 */
function removeCitycards (cityCards) {
  while (cityCards.firstChild) {
    cityCards.removeChild(cityCards.firstChild);
  }
}
/**
 *
 * @param city
 * @param cityData
 */
function changeContinent (city, cityData) {
  const cityGrid = document.querySelector('.city-grid');
  removeCitycards(cityGrid);

  for (let j = 0; j < 12; j++) {
    const cityBox = `<div class="city-box">
    <div class="continent-name-city">
        <div class="continent-name">
            <span>${cityData[city[j]].timeZone.split('/')[0]}</span>
        </div>
        <div class="city-name">
            <span>${cityData[city[j]].cityName + ',' + updateContinentTime(cityData)}</span>
        </div>
    </div>
    <div class="temp-status">
        <div class="temperature-align font-color font-size-large">
            <span>${cityData[city[j]].temperature}</span>
        </div>
        <div class="note-status">
            <img
                class="weather-icon-city"
                src="../../Assets/Weather Icons/humidityIcon.svg"
                alt="humidityIcon"
            >
            <span class="font-color font-size-small humidity-continent">${cityData[city[j]].humidity}</span>
        </div>
    </div>
</div>`;
    cityGrid.insertAdjacentHTML('beforeend', cityBox);

    /**
     *
     * @param cityData
     */
    function updateContinentTime (cityData) {
      const options = {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: cityData[city[j]].timeZone,
        hour12: true
      };
      const currentContinentTime = new Date().toLocaleString(undefined, options);
      console.log(currentContinentTime)
      return currentContinentTime;
    }
  }
}
