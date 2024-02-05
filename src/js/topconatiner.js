const hrsMin = document.querySelector('.hrs-mins');
const second = document.querySelector('.seconds');
const dateClass = document.querySelector('.date');
const amImage = document.querySelector('.am-image');
const imageValue = document.querySelector('.first-image');
const imageVal = document.querySelectorAll('.img-top-inside');
const temperature = document.querySelector('.temp-value-celsius');
const humidityValue = document.querySelector('.humidity-value');
const precipitationValue = document.querySelector('.precipitation-value');
const inputElement = document.querySelector('.image-city');
const datalistOptions = document.querySelector('.listsdata');
const hourly = document.querySelectorAll('.hourly-image');
const farenheitValue = document.querySelector('.temp-value-farenheit');
const tempHourly = document.querySelectorAll('.temperature-hourly-update');
const nowImage = document.querySelector('.now-image');
const firstHourImage = document.querySelector('.first-hour-image');
const secondImage = document.querySelector('.second-image');
const thirdImage = document.querySelector('.third-image');
const forthImage = document.querySelector('.forth-image');
const firstTime = document.querySelectorAll('.first-time');
const hourlyImage = Array.from(hourly).map((element) => element.src);
/**
 *
 * @param cityData
 */
function topcontainer (cityData) {
  document.querySelector('.image-city').addEventListener('change', (city) => {
    console.log(datalistOptions)
    const optionFound = Array.from(datalistOptions.options).some(function (option) {
      return option.value === city;
    });
    if (optionFound
    ) correctCityName(city);
    else { wrongCityName(); }
  });
}
/**
 *
 * @param city
 */
function correctCityName (city) {
  const givenInput = city.target.value.toLowerCase();
  imageValue.style.visibility = 'visible';
  imageValue.src = `../../../Assets/Icons for cities/${givenInput}.svg`;
  temperature.innerText = `${cityData[givenInput].temperature}`;
  humidityValue.innerText = `${cityData[givenInput].humidity}`;
  precipitationValue.innerText = `${cityData[givenInput].precipitation}`;
  const [tempvalue] = cityData[givenInput].temperature.split('\u00B0C');
  farenheitValue.innerText = Math.round(Number(tempvalue) * 1.8 + 32, 0);
  hrsMin.style.visibility = 'visible';
  second.style.visibility = 'visible';
  dateClass.style.visibility = 'visible';
  amImage.style.visibility = 'visible';
  updateDynamicTime(givenInput);
  const updatedTimings = cityData[givenInput].nextFiveHrs;
  updatedTimings.unshift(cityData[givenInput].temperature);

  for (let i = 0; i < updatedTimings.length; i++) {
    updatedTimings[i] = updatedTimings[i].slice(0, -2);
    if (
      Number(updatedTimings[i]) >= 23 &&
      Number(updatedTimings[i]) <= 29
    ) {
      hourlyImage[i] = '../../../Assets/Weather Icons/cloudyIcon.svg';
    } else if (
      Number(updatedTimings[i]) >= 18 &&
      Number(updatedTimings[i]) <= 22
    ) {
      hourlyImage[i] = '../../../Assets/Weather Icons/windyIcon.svg';
    } else if (Number(updatedTimings[i]) < 18) {
      hourlyImage[i] = '../../../Assets/Weather Icons/rainyIcon.svg';
    } else if (Number(updatedTimings[i])) {
      hourlyImage[i] = '../../../Assets/Weather Icons/sunnyIcon.svg';
    }
  }
  const tempHourlyUpdate = Array.from(tempHourly).map(
    (element) => element.textContent
  );
  for (let i = 0; i < tempHourlyUpdate.length; i++) {
    tempHourly[i].textContent = updatedTimings[i] + '\u00B0C';
  }
  updatedTimings.shift();
  updateIcon(hourlyImage);
}
/**
 *
 * @param hourlyImage
 */
function updateIcon (hourlyImage) {
  nowImage.src = hourlyImage[0];
  firstHourImage.src = hourlyImage[1];
  secondImage.src = hourlyImage[2];
  thirdImage.src = hourlyImage[3];
  forthImage.src = hourlyImage[4];
}

/**
 *
 * @param givenInput
 */
function updateDynamicTime (givenInput) {
  const currentTime = new Date().toLocaleString(undefined, {
    timeZone: cityData[givenInput].timeZone
  });
  const [date, time] = currentTime.split(', ');
  const [datesplit, month, year] = date.split('/');
  const [hrs, mins, secs] = time.split(':');
  let [sec, am] = secs.split(' ');
  hrsMin.innerText = `${hrs}:${mins}`;
  second.innerText = `:${sec}`;
  dateClass.innerText = `${datesplit}/${month}/${year}`;
  if (am === 'AM') {
    amImage.src = '../../../Assets/General Images & Icons/amState.svg';
  } else {
    amImage.src = '../../../Assets/General Images & Icons/pmState.svg';
  }
  const nextFiveHours = Array.from(firstTime).map(
    (element) => element.textContent
  );

  for (let i = 0, currentTime = hrs; i < nextFiveHours.length; i++) {
    if (am == 'AM') {
      if (currentTime < 11) {
        currentTime++;
        nextFiveHours[i] = currentTime + 'AM';
        firstTime[i].textContent = nextFiveHours[i];
      } else if (currentTime === 11) {
        currentTime++;
        nextFiveHours[i] = currentTime + 'PM';
        am = 'PM';
        firstTime[i].textContent = nextFiveHours[i];
      } else if (currentTime === 12) {
        nextFiveHours[i] = 1 + 'AM';
        currentTime = 1;
        am = 'AM';
        firstTime[i].textContent = nextFiveHours[i];
      }
    } else {
      if (currentTime < 11) {
        currentTime++;
        nextFiveHours[i] = currentTime + 'PM';
        firstTime[i].textContent = nextFiveHours[i];
      } else if (currentTime === 11) {
        currentTime++;
        nextFiveHours[i] = currentTime + 'AM';
        am = 'AM';
        firstTime[i].textContent = nextFiveHours[i];
      } else if (currentTime === 12) {
        nextFiveHours[i] = 1 + 'PM';
        currentTime = 1;
        am = 'PM';
        firstTime[i].textContent = nextFiveHours[i];
      }
    }
  }
  setTimeout(updateDynamicTime(givenInput), 1000);
}
/**
 *
 */
function wrongCityName () {
  alert('Please Enter the Correct City Name');
  imageValue.style.visibility = 'hidden';
  imageVal.forEach(function (image) {
    image.style.visibility = 'hidden';
  });
  temperature.innerText = '-';
  humidityValue.innerText = '-';
  precipitationValue.innerText = '-';
  farenheitValue.innerText = '-';
  hrsMin.style.visibility = 'hidden';
  second.style.visibility = 'hidden';
  dateClass.style.visibility = 'hidden';
  amImage.style.visibility = 'hidden';
  hourlyImage.innerText = 'NIL';
  const tempHourlyUpdate = Array.from(tempHourly).map(
    (element) => element.textContent
  );
  for (let i = 0; i < tempHourlyUpdate.length; i++) {
    tempHourly[i].textContent = 'NIL';
  }
  document.querySelectorAll('.first-class').textContent = '-';
}
