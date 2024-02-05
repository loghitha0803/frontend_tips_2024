/**
 *
 * @param {object}cityData - Extracted JSON file
 * @param  {object}datalistOptions - Holds the datalist created in the html
 *  @description - Adds the option according to the cityname in the json file
 */
export function addDatalistOptions (cityData, datalistOptions) {
  let cityName;
  let optionsArray = [];
  for (Object.keys in cityData) {
    cityName = cityData[Object.keys].cityName;
    if (cityName) {
      optionsArray.push(cityName);
      optionsArray = optionsArray.sort();
    }
  }
  for (let index = 0; index < optionsArray.length; index++) {
    const options = document.createElement('option');
    options.value = optionsArray[index];
    datalistOptions.append(options);
  }
}
