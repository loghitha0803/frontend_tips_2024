class Sprinkler {
  constructor () {
    this.isOn = false;
    this.userSelect = [];
    this.timeArray = [0];
    this.elapsedtime = 0;
  }

  SelectOption = function (e) {
    this.userSelect.push(e.target.id);
    time.disabled = false;
    run.disabled = false;
  };

  timeChange = function (timeValue) {
    this.timeArray.push(+timeValue);
    this.elapsedtime += +timeValue;
    time.value = '';
  };

  powerOn = function () {
    this.isOn = !this.isOn;
    if (this.isOn === true) { switchOn.textContent = 'ON'; } else { switchOn.textContent = 'OFF'; }
  };

  runSystem = function () {
    this.RunTimeChange();
    for (const index in this.timeArray) {
      const selectedUse = document.querySelector(`.${this.userSelect[index]}-indicator`);
      const previousWork = document.querySelector(`.${this.userSelect[index - 1]}-indicator`);
      this.changeSystem(selectedUse, previousWork, this.timeArray[index]);
    }
  };

  changeSystem = function (selectedUse, previousWork, timeElapse) {
    setTimeout(changeColor, 1000 * timeElapse);
    /**
     *@description - change the button color every on runtime
     */
    function changeColor () {
      if (previousWork) { previousWork.style.backgroundColor = 'lightgreen'; }
      if (selectedUse) {
        selectedUse.style.backgroundColor = 'pink';
      }
      const zoneOrder = document.querySelector('.zone-order');
      zoneOrder.value += 33;
    }
  };

  RunTimeChange = function () {
    const initialValue = 0;
    let sumWithInitial = this.timeArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      initialValue
    );
    let timeChance = 0;
    while (sumWithInitial) {
      setInterval(changeTime(timeChance), 1000);
      timeChance++;
      sumWithInitial--;
    }
    /**
     *
     * @param {number}timeChance - Holds the time
     * @description -To change the time every second
     */
    function changeTime (timeChance) {
      const elapsedTime = document.querySelector('.time-elapsed');
      const PaddedTime = `${timeChance}`.padStart(2, 0);
      elapsedTime.textContent = `00:${PaddedTime}`;
    }
  };

  resetChange = function () {
    this.SelectOption = [];
    this.userSelect = [];
  };
}
const userSprinkler = new Sprinkler();
const switchOn = document.querySelector('.power-on');
const time = document.querySelector('.zone-time-change');
time.addEventListener('change', () => {
  userSprinkler.timeChange(time.value);
});
switchOn.addEventListener('click', () => userSprinkler.powerOn());
const selectDirection = document.querySelectorAll('.select-direction');
selectDirection.forEach((select) => {
  select.addEventListener('click', (e) => {
    userSprinkler.SelectOption(e);
  });
});
const run = document.querySelector('.run-mode');
run.addEventListener('click', () => {
  userSprinkler.runSystem();
});
const reset = document.querySelector('.reset');
reset.addEventListener('click', () => {
  userSprinkler.resetChange();
});
