/* eslint-disable jsdoc/require-param-description */
/* eslint-disable jsdoc/require-param-type */
/* eslint-disable eqeqeq */
let cityData;
(async () => {
  const data = await fetch('../../../Assets/files/data.json')
  cityData = await data.json()
})()
document.querySelector('.image-city').addEventListener('change', (city) => {
  const inputElement = document.querySelector('.image-city')
  const datalistOptions = document.getElementById('listsdata')
  if (
    [...datalistOptions.options].some(
      (option) => option.value === inputElement.value
    )
  ) {
    const givenInput = city.target.value.toLowerCase()
    const imageValue = document.querySelector('.first-image')
    const imageVal = document.querySelectorAll('.img-top-inside')
    imageValue.src = `../../../Assets/Icons for cities/${givenInput}.svg`
    imageVal.forEach(function (image) {
      image.src = `../../../Assets/Icons for cities/${givenInput}.svg`
    })
    const temperature = document.querySelector('.temp-value-celsius')
    const humidityValue = document.querySelector('.humidity-value')
    const precipitationValue = document.querySelector('.precipitation-value')
    temperature.innerText = `${cityData[givenInput].temperature}`
    humidityValue.innerText = `${cityData[givenInput].humidity}`
    precipitationValue.innerText = `${cityData[givenInput].precipitation}`
    const [tempvalue] = cityData[givenInput].temperature.split('\u00B0C')
    const farenheitValue = document.querySelector('.temp-value-farenheit')
    const farenheit = Math.round(Number(tempvalue) * 1.8 + 32, 0)
    farenheitValue.innerText = `${farenheit}F`

    /**
     *
     * @param datetime
     */
    function formatDateTime (datetime) {
      const [date, time] = datetime.split(', ')
      const [month, datesplit, year] = date.split('/')
      const [hrs, mins, secs] = time.split(':')
      let [sec, am] = secs.split(' ')
      document.querySelector('.hrs-mins').innerText = `${hrs}:${mins}`
      document.querySelector('.seconds').innerText = `:${sec}`
      document.querySelector(
        '.date'
      ).innerText = `${datesplit}/${month}/${year}`
      const amImage = document.querySelector('.am-image')
      if (am === 'AM') {
        amImage.src = '../../../Assets/General Images & Icons/amState.svg'
      } else {
        amImage.src = '../../../Assets/General Images & Icons/pmState.svg'
      }
      const firstTime = document.querySelectorAll('.first-time')
      const nextFiveHours = Array.from(firstTime).map(
        (element) => element.textContent
      )
      for (let i = 0, currentTime = hrs; i < nextFiveHours.length; i++) {
        if (am == 'AM') {
          if (currentTime < 11) {
            currentTime++
            nextFiveHours[i] = currentTime + 'AM'
            firstTime[i].textContent = nextFiveHours[i]
          } else if (currentTime == 11) {
            currentTime++
            nextFiveHours[i] = currentTime + 'PM'
            am = 'PM'
            firstTime[i].textContent = nextFiveHours[i]
          } else if (currentTime == 12) {
            nextFiveHours[i] = 1 + 'AM'
            currentTime = 1
            am = 'AM'
            firstTime[i].textContent = nextFiveHours[i]
          }
        } else {
          if (currentTime < 11) {
            currentTime++
            nextFiveHours[i] = currentTime + 'PM'
            firstTime[i].textContent = nextFiveHours[i]
          } else if (currentTime == 11) {
            currentTime++
            nextFiveHours[i] = currentTime + 'AM'
            am = 'AM'
            firstTime[i].textContent = nextFiveHours[i]
          } else if (currentTime == 12) {
            nextFiveHours[i] = 1 + 'PM'
            currentTime = 1
            am = 'PM'
            firstTime[i].textContent = nextFiveHours[i]
          }
        }
      }
      const hourly = document.querySelectorAll('.hourly-image')
      const hourlyImage = Array.from(hourly).map((element) => element.src)
      const updatedTimings = cityData[givenInput].nextFiveHrs
      updatedTimings.unshift(cityData[givenInput].temperature)
      for (let i = 0; i < updatedTimings.length; i++) {
        if (
          updatedTimings[i] >= '23\u00B0C' &&
          updatedTimings[i] <= '29\u00B0C'
        ) {
          hourlyImage[i] = '../../../Assets/Weather Icons/cloudyIcon.svg'
        } else if (
          updatedTimings[i] >= '18\u00B0C' &&
          updatedTimings[i] <= '22\u00B0C'
        ) {
          hourlyImage[i] = '../../../Assets/Weather Icons/windyIcon.svg'
        } else if (updatedTimings[i] < '18\u00B0C') {
          hourlyImage[i] = '../../../Assets/Weather Icons/rainyIcon.svg'
        } else if (updatedTimings[i] > '18\u00B0C') {
          hourlyImage[i] = '../../../Assets/Weather Icons/sunnyIcon.svg'
        }
      }
      const tempHourly = document.querySelectorAll(
        '.temperature-hourly-update'
      )
      const tempHourlyUpdate = Array.from(tempHourly).map(
        (element) => element.textContent
      )
      for (let i = 0; i < tempHourlyUpdate.length; i++) {
        tempHourly[i].textContent = updatedTimings[i]
      }
      updatedTimings.shift()
      document.querySelector('.now-image').src = hourlyImage[0]
      document.querySelector('.first-hour-image').src = hourlyImage[1]
      document.querySelector('.second-image').src = hourlyImage[2]
      document.querySelector('.third-image').src = hourlyImage[3]
      document.querySelector('.forth-image').src = hourlyImage[4]
    }
    formatDateTime(cityData[givenInput].dateAndTime)
  }
})
