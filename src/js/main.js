/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
let cityData;
(async () => {
  cityData = await (await fetch('../../../Assets/files/data.json')).json();
  topcontainer(cityData);
})();
