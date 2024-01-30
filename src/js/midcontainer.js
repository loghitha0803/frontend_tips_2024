/* eslint-disable no-unused-vars */
let cityCards
let hoverDiv
let firstContainer
let newTransformValue = 0
let lastContainerIndex
let numContainers
let options
let climate
let indexValue
let compareByTemperature
let temperature
let index
let selectedCitiesCold
let selectedCitiesRainy
let selectedCitiesSunny
let compareByPrecipitaion
let sortedCitiesSunny
let sortedCitiesRainy
let sortedCitiesCold
let humidity
let precipitation
let compareByHumidity
let cloneDiv
let countryName
let existingTime
let tempValue
let humidityChange
let precipitationChange
/**
 *
 * @param cityData
 */
// eslint-disable-next-line no-unused-vars
function midcontainer (cityData) {
  cityCards = document.querySelector('.city-cards')
  index = document.querySelector('.option-click')
  hoverDiv = document.querySelectorAll('.icon-combined')
  firstContainer = document.querySelector('.first-container')
  climate = sunny(cityData)
  windowchange(cityData)
  document
    .querySelector('.arrow-move-right')
    .addEventListener('click', function () {
      rightButton(cityCards)
    })
  document
    .querySelector('.arrow-move-left')
    .addEventListener('click', function () {
      leftButton(cityCards, indexValue)
    })

  hoverDiv.forEach(function (hover, clickIndex) {
    if (clickIndex === 0) {
      clickSunny(cityData, hover, clickIndex)
    }
    if (clickIndex === 1) {
      clickCloudy(cityData, hover, clickIndex)
    }

    if (clickIndex === 2) {
      clickRainy(cityData, hover, clickIndex)
    }
  })

  /**
   *
   * @param arr
   */

  /**
   *
   */
}
/**
 *
 * @param cityData
 */
function sunny (cityData) {
  selectedCitiesSunny = Object.keys(cityData).filter((cityKey) => {
    temperature = parseInt(cityData[cityKey].temperature)

    humidity = parseInt(cityData[cityKey].humidity)

    precipitation = parseInt(cityData[cityKey].precipitation)

    return (
      !isNaN(temperature) &&
      !isNaN(humidity) &&
      !isNaN(precipitation) &&
      temperature > 29 &&
      humidity < 50 &&
      precipitation >= 50
    )
  })
  return selectedCitiesSunny
}
/**
 *
 */
function removeCitycards () {
  while (cityCards.firstChild) {
    cityCards.removeChild(cityCards.firstChild)
  }
}
/**
 *
 * @param cityData
 * @param hover
 * @param clickIndex
 */
function clickSunny (cityData, hover, clickIndex) {
  hover.addEventListener('click', function () {
    hoverDiv[0].style.setProperty('--initial-size', '100%')
    hoverDiv[1].style.setProperty('--initial-size', '0%')
    hoverDiv[2].style.setProperty('--initial-size', '0%')
    cityCards.style.transform = 'translateX(0px)'
    document.querySelector('.arrow-move-right').style.visibility = 'hidden'
    document.querySelector('.arrow-move-left').style.visibility = 'hidden'

    removeCitycards()

    selectedCitiesSunny = Object.keys(cityData).filter((cityKey) => {
      temperature = parseInt(cityData[cityKey].temperature)

      humidity = parseInt(cityData[cityKey].humidity)

      precipitation = parseInt(cityData[cityKey].precipitation)

      return (
        !isNaN(temperature) &&
        !isNaN(humidity) &&
        !isNaN(precipitation) &&
        temperature > 29 &&
        humidity < 50 &&
        precipitation >= 50
      )
    })

    compareByTemperature = (a, b) => b.temperature - a.temperature
    sortedCitiesSunny = selectedCitiesSunny.sort(compareByTemperature)
    climate = sortedCitiesSunny
    addEvent(sortedCitiesSunny, cityData, clickIndex)
    indexChange(sortedCitiesSunny, cityData, clickIndex)
  })
}
/**
 *
 * @param climate
 * @param gran
 * @param cityData
 * @param clickIndex
 */
function indexChange (gran, cityData, clickIndex) {
  index.addEventListener('change', function () {
    console.log(gran)
    addEvent(gran, cityData, clickIndex)
    cityCards.style.transform = 'translateX(0px)'
    newTransformValue = 0
    document.querySelector('.arrow-move-right').style.visibility = 'visible'
    document.querySelector('.arrow-move-left').style.visibility = 'visible'
  })
}
/**
 *
 * @param cityData
 * @param hover
 * @param clickIndex
 */
function clickCloudy (cityData, hover, clickIndex) {
  hover.addEventListener('click', function () {
    hoverDiv[0].style.setProperty('--initial-size', '0%')
    hoverDiv[1].style.setProperty('--initial-size', '100%')
    hoverDiv[2].style.setProperty('--initial-size', '0%')
    cityCards.style.transform = 'translateX(0px)'
    document.querySelector('.arrow-move-right').style.visibility = 'hidden'
    document.querySelector('.arrow-move-left').style.visibility = 'hidden'
    removeCitycards()
    selectedCitiesCold = Object.keys(cityData).filter((cityKey) => {
      temperature = parseInt(cityData[cityKey].temperature)

      humidity = parseInt(cityData[cityKey].humidity)

      precipitation = parseInt(cityData[cityKey].precipitation)

      return (
        !isNaN(temperature) &&
        !isNaN(humidity) &&
        !isNaN(precipitation) &&
        temperature >= 20 &&
        temperature <= 28 &&
        humidity > 50 &&
        precipitation < 50
      )
    })

    compareByPrecipitaion = (a, b) => b.precipitation - a.precipitation
    sortedCitiesCold = selectedCitiesCold.sort(compareByPrecipitaion)
    climate = sortedCitiesCold
    addEvent(sortedCitiesCold, cityData, clickIndex)
    indexChange(selectedCitiesCold, cityData, clickIndex)
  })
}
/**
 *
 * @param arr
 * @param cityData
 * @param clickIndex
 * @param firstContainer
 * @param cityCards
 */
function rightButton (cityCards) {
  numContainers = cityCards.children.length
  lastContainerIndex = numContainers - 1

  if (lastContainerIndex > 2 && newTransformValue > 0) {
    document.querySelector('.arrow-move-left').style.visibility = 'visible'
    newTransformValue -= 405
    cityCards.style.transform = `translateX(-${newTransformValue}px)`
    console.log(newTransformValue)
  } else {
    document.querySelector('.arrow-move-right').style.visibility = 'hidden'
  }
}

/**
 *
 * @param firstContainer
 * @param cityCards
 * @param index
 */
function leftButton (cityCards, index) {
  console.log(index)
  numContainers = cityCards.children.length
  lastContainerIndex = numContainers - 1
  if (lastContainerIndex > 2 && newTransformValue < 405 * (indexValue - 3)) {
    document.querySelector('.arrow-move-right').style.visibility = 'visible'
    newTransformValue += 405
    cityCards.style.transform = `translateX(-${newTransformValue}px)`
    console.log(newTransformValue)
  } else {
    document.querySelector('.arrow-move-left').style.visibility = 'hidden'
  }
}
// /**
//  *
//  * @param arr
//  * @param cityData
//  * @param clickIndex
//  */
/**
 *
 * @param arr
 * @param cityData
 * @param clickIndex
 */
function addEvent (arr, cityData, clickIndex) {
  console.log(arr)
  indexValue = index.value
  removeCitycards()
  for (let i = 0; i < indexValue; i++) {
    cloneDiv = firstContainer.cloneNode(true)
    countryName = cloneDiv.querySelector('.country-name')
    existingTime = cloneDiv.querySelector('.existing-time')
    console.log(arr)
    countryName.textContent = arr[i]
    updateTime()
    /**
     *
     */
    indexValue = arr.length > indexValue ? indexValue : arr.length
    /**
     *
     */
    function updateTime () {
      options = {
        hour: 'numeric',
        minute: 'numeric',
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour12: true,
        timeZone: cityData[arr[i]].timeZone
      }
      existingTime.textContent = new Date().toLocaleString(undefined, options)
      setInterval(updateTime, 1000)
    }
    cloneDiv.querySelector('.bottom-date').style.visibility = 'hidden'
    tempValue = cloneDiv.querySelector('.temp-value-celsius')
    tempValue.textContent = cityData[arr[i]].temperature
    humidityChange = cloneDiv.querySelector('.humidity-value')
    humidityChange.textContent = cityData[arr[i]].humidity
    precipitationChange = cloneDiv.querySelector('.precipitation-value')
    precipitationChange.textContent = cityData[arr[i]].precipitation
    if (clickIndex === 2) {
      cloneDiv.querySelector('.particular-icon').src =
        '../../Assets/Weather Icons/rainyIcon.svg'
    } else if (clickIndex === 1) {
      cloneDiv.querySelector('.particular-icon').src =
        '../../Assets/Weather Icons/snowflakeIcon.svg'
    }

    cloneDiv.querySelector(
      '.img-top-inside'
    ).src = `../../Assets/Icons for cities/${arr[i]}.svg`
    console.log(cloneDiv.querySelector('.img-top-inside').src)
    cityCards.appendChild(cloneDiv)
    console.log(cloneDiv)
  }
}
/**
 *
 * @param cityData
 */
function windowchange (cityData) {
  hoverDiv.forEach(function () {
    hoverDiv[0].style.setProperty('--initial-size', '100%')
    hoverDiv[1].style.setProperty('--initial-size', '0%')
    hoverDiv[2].style.setProperty('--initial-size', '0%')
    compareByTemperature = (a, b) => b.temperature - a.temperature
    sortedCitiesSunny = sunny(cityData).sort(compareByTemperature)
    addEvent(sortedCitiesSunny, cityData)
  })
}
/**
 *
 * @param cityData
 * @param hover
 * @param clickIndex
 */
function clickRainy (cityData, hover, clickIndex) {
  hover.addEventListener('click', function () {
    hoverDiv[0].style.setProperty('--initial-size', '0%')
    hoverDiv[1].style.setProperty('--initial-size', '0%')
    hoverDiv[2].style.setProperty('--initial-size', '100%')
    cityCards.style.transform = 'translateX(0px)'
    document.querySelector('.arrow-move-right').style.visibility = 'visible'
    document.querySelector('.arrow-move-left').style.visibility = 'visible'
    removeCitycards()
    selectedCitiesRainy = Object.keys(cityData).filter((cityKey) => {
      temperature = parseInt(cityData[cityKey].temperature)

      humidity = parseInt(cityData[cityKey].humidity)

      precipitation = parseInt(cityData[cityKey].precipitation)

      return (
        !isNaN(temperature) &&
        !isNaN(humidity) &&
        !isNaN(precipitation) &&
        temperature < 20 &&
        humidity >= 50
      )
    })
    compareByHumidity = (a, b) =>
      parseInt(cityData[b].humidity) - parseInt(cityData[a].humidity)

    sortedCitiesRainy = selectedCitiesRainy.sort(compareByHumidity)
    climate = sortedCitiesRainy
    addEvent(sortedCitiesRainy, cityData, clickIndex)
    console.log(sortedCitiesRainy)
    indexChange(sortedCitiesRainy, cityData, clickIndex)
  })
}
