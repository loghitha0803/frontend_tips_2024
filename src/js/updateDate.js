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
    if (am === 'am' || am === 'AM') {
      am = Number(currentTime) === 11 ? 'PM' : 'AM';
    } else {
      am = Number(currentTime) === 11 ? 'AM' : 'PM';
    }
    currentTime = (currentTime % 12) + 1;
    nextFiveHours[index] = currentTime + am;
    firstTime[index].textContent = nextFiveHours[index];
  }
}
