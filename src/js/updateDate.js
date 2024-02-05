/**
 *
 * @param {string} currentTime - Current time of the selected city
 * @description -  Holds the time and date value for the city
 */
export function updateDate (currentTime) {
  const hrsMin = document.querySelector('.hrs-mins');
  const second = document.querySelector('.seconds');
  const dateClass = document.querySelector('.date');
  const amImage = document.querySelector('.am-image');
  const firstTime = document.querySelectorAll('.first-time');
  const [date, time] = currentTime.split(', ');
  const [datesplit, month, year] = date.split('/');
  const [hrs, mins, secs] = time.split(':');
  let [sec, am] = secs.split(' ');
  hrsMin.innerText = `${hrs}:${mins}`;
  second.innerText = `:${sec}`;
  dateClass.innerText = `${datesplit}/${month}/${year}`;
  if (am === 'am') {
    amImage.src = '../../../Assets/General Images & Icons/amState.svg';
  } else {
    amImage.src = '../../../Assets/General Images & Icons/pmState.svg';
  }
  const nextFiveHours = Array.from(firstTime).map((element) => element.textContent);

  for (let index = 0, currentTime = hrs; index < nextFiveHours.length; index++) {
    if (am === 'am') {
      if (currentTime < 11) {
        currentTime++;
        nextFiveHours[index] = currentTime + 'AM';
        firstTime[index].textContent = nextFiveHours[index];
      } else if (currentTime === 11) {
        currentTime++;
        nextFiveHours[index] = currentTime + 'PM';
        am = 'PM';
        firstTime[index].textContent = nextFiveHours[index];
      } else if (currentTime === 12) {
        nextFiveHours[index] = 1 + 'AM';
        currentTime = 1;
        am = 'AM';
        firstTime[index].textContent = nextFiveHours[index];
      }
    } else {
      if (currentTime < 11) {
        currentTime++;
        nextFiveHours[index] = currentTime + 'PM';
        firstTime[index].textContent = nextFiveHours[index];
      } else if (currentTime === 11) {
        currentTime++;
        nextFiveHours[index] = currentTime + 'AM';
        am = 'AM';
        firstTime[index].textContent = nextFiveHours[index];
      } else if (currentTime === 12) {
        nextFiveHours[index] = 1 + 'PM';
        currentTime = 1;
        am = 'PM';
        firstTime[index].textContent = nextFiveHours[index];
      }
    }
  }
}
