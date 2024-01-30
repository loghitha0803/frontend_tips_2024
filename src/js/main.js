/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
let cityData
let givenInput
let data
let inputElement
let datalistOptions
let imageValue
let imageVal

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
let cityname

(async () => {
  data = await fetch('../../../Assets/files/data.json')
  cityData = await data.json()
  midcontainer(cityData)
  topcontainer(cityData)
})()
//   if (
//     [...datalistOptions.options].some(
//       (option) => option.value === inputElement.value
//     )
//   ) topcontainer(cityData[givenInput])
//   else {
//     alert('Please Enter the Correct City Name')
//     imageValue = document.querySelector('.first-image')
//     imageVal = document.querySelectorAll('.img-top-inside')
//     imageValue.style.visibility = 'hidden'
//     imageVal.forEach(function (image) {
//       image.style.visibility = 'hidden'
//     })
//     temperature = document.querySelector('.temp-value-celsius')
//     humidityValue = document.querySelector('.humidity-value')
//     precipitationValue = document.querySelector('.precipitation-value')
//     temperature.innerText = '-'
//     humidityValue.innerText = '-'
//     precipitationValue.innerText = '-'
//     farenheitValue = document.querySelector('.temp-value-farenheit')
//     farenheitValue.innerText = '-'
//     document.querySelector('.hrs-mins').style.visibility = 'hidden'
//     document.querySelector('.seconds').style.visibility = 'hidden'
//     document.querySelector('.date').style.visibility = 'hidden'
//     document.querySelector('.am-image').style.visibility = 'hidden'
//     document.querySelectorAll('.hourly-image').innerText = 'NIL'
//     tempHourly = document.querySelectorAll(
//       '.temperature-hourly-update'
//     )
//     tempHourlyUpdate = Array.from(tempHourly).map(
//       (element) => element.textContent
//     )
//     for (let i = 0; i < tempHourlyUpdate.length; i++) {
//       tempHourly[i].textContent = 'NIL'
//     }
//     document.querySelectorAll('.first-class').textContent = '-'
//   }
// })()
