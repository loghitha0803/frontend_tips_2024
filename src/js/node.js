/* eslint-disable eqeqeq */

let cityData
let givenInput
let data
let inputElement
let datalistOptions
let imageValue
let imageVal
let temperature
let tempHourly
let tempHourlyUpdate
let humidityValue
let precipitationValue
let farenheit
let farenheitValue
let currentTime
let amImage
let nextFiveHours
let firstTime
let hourly
let hourlyImage
let updatedTimings
(async () => {
  data = await fetch('../../../Assets/files/data.json')
  cityData = await data.json()
  document.querySelector('.image-city').addEventListener('change', (city) => {
    inputElement = document.querySelector('.image-city')
    datalistOptions = document.getElementById('listsdata')
    if (
      [...datalistOptions.options].some(
        (option) => option.value === inputElement.value
      )
    ) {
      givenInput = city.target.value.toLowerCase()
      imageValue = document.querySelector('.first-image')
      imageVal = document.querySelectorAll('.img-top-inside')
      imageValue.style.visibility = 'visible'
      imageValue.src = `../../../Assets/Icons for cities/${givenInput}.svg`
      imageVal.forEach(function (image) {
        image.style.visibility = 'visible'
        image.src = `../../../Assets/Icons for cities/${givenInput}.svg`
      })
      temperature = document.querySelector('.temp-value-celsius')
      humidityValue = document.querySelector('.humidity-value')
      precipitationValue = document.querySelector('.precipitation-value')
      temperature.innerText = `${cityData[givenInput].temperature}`
      humidityValue.innerText = `${cityData[givenInput].humidity}`
      precipitationValue.innerText = `${cityData[givenInput].precipitation}`
      const [tempvalue] = cityData[givenInput].temperature.split('\u00B0C')
      farenheitValue = document.querySelector('.temp-value-farenheit')
      farenheit = Math.round(Number(tempvalue) * 1.8 + 32, 0)
      farenheitValue.innerText = `${farenheit}F`
      /**
       *
       */
      document.querySelector('.hrs-mins').style.visibility = 'visible'
      document.querySelector('.seconds').style.visibility = 'visible'
      document.querySelector('.date').style.visibility = 'visible'
      document.querySelector('.am-image').style.visibility = 'visible'
      /**
       *
       */
      function updateDynamicTime () {
        currentTime = new Date().toLocaleString('en-US', { timeZone: cityData[givenInput].timeZone })
        const [date, time] = currentTime.split(', ')
        const [datesplit, month, year] = date.split('/')
        const [hrs, mins, secs] = time.split(':')
        let [sec, am] = secs.split(' ')
        document.querySelector('.hrs-mins').innerText = `${hrs}:${mins}`
        document.querySelector('.seconds').innerText = `:${sec}`
        document.querySelector(
          '.date'
        ).innerText = `${datesplit}/${month}/${year}`
        amImage = document.querySelector('.am-image')
        if (am === 'AM') {
          amImage.src = '../../../Assets/General Images & Icons/amState.svg'
        } else {
          amImage.src = '../../../Assets/General Images & Icons/pmState.svg'
        }
        firstTime = document.querySelectorAll('.first-time')
        nextFiveHours = Array.from(firstTime).map(
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
        setTimeout(updateDynamicTime, 1000)
      }
      updateDynamicTime()
      hourly = document.querySelectorAll('.hourly-image')
      hourlyImage = Array.from(hourly).map((element) => element.src)
      updatedTimings = cityData[givenInput].nextFiveHrs
      updatedTimings.unshift(cityData[givenInput].temperature)

      for (let i = 0; i < updatedTimings.length; i++) {
        updatedTimings[i] = updatedTimings[i].slice(0, -2)
        if (
          Number(updatedTimings[i]) >= 23 &&
          Number(updatedTimings[i]) <= 29
        ) {
          hourlyImage[i] = '../../../Assets/Weather Icons/cloudyIcon.svg'
        } else if (
          Number(updatedTimings[i]) >= 18 &&
          Number(updatedTimings[i]) <= 22
        ) {
          hourlyImage[i] = '../../../Assets/Weather Icons/windyIcon.svg'
        } else if (Number(updatedTimings[i]) < 18) {
          hourlyImage[i] = '../../../Assets/Weather Icons/rainyIcon.svg'
        } else if (Number(updatedTimings[i])) {
          hourlyImage[i] = '../../../Assets/Weather Icons/sunnyIcon.svg'
        }
      }
      tempHourly = document.querySelectorAll(
        '.temperature-hourly-update'
      )
      tempHourlyUpdate = Array.from(tempHourly).map(
        (element) => element.textContent
      )
      for (let i = 0; i < tempHourlyUpdate.length; i++) {
        tempHourly[i].textContent = updatedTimings[i] + '\u00B0C'
      }
      updatedTimings.shift()
      document.querySelector('.now-image').src = hourlyImage[0]
      document.querySelector('.first-hour-image').src = hourlyImage[1]
      document.querySelector('.second-image').src = hourlyImage[2]
      document.querySelector('.third-image').src = hourlyImage[3]
      document.querySelector('.forth-image').src = hourlyImage[4]
    } else {
      alert('Please Enter the Correct City Name')
      imageValue = document.querySelector('.first-image')
      imageVal = document.querySelectorAll('.img-top-inside')
      imageValue.style.visibility = 'hidden'
      imageVal.forEach(function (image) {
        image.style.visibility = 'hidden'
      })
      temperature = document.querySelector('.temp-value-celsius')
      humidityValue = document.querySelector('.humidity-value')
      precipitationValue = document.querySelector('.precipitation-value')
      temperature.innerText = '-'
      humidityValue.innerText = '-'
      precipitationValue.innerText = '-'
      farenheitValue = document.querySelector('.temp-value-farenheit')
      farenheitValue.innerText = '-'
      document.querySelector('.hrs-mins').style.visibility = 'hidden'
      document.querySelector('.seconds').style.visibility = 'hidden'
      document.querySelector('.date').style.visibility = 'hidden'
      document.querySelector('.am-image').style.visibility = 'hidden'
      document.querySelectorAll('.hourly-image').innerText = 'NIL'
      tempHourly = document.querySelectorAll(
        '.temperature-hourly-update'
      )
      tempHourlyUpdate = Array.from(tempHourly).map(
        (element) => element.textContent
      )
      for (let i = 0; i < tempHourlyUpdate.length; i++) {
        tempHourly[i].textContent = 'NIL'
      }
      document.querySelectorAll('.first-class').textContent = '-'
    }
  })
})()
