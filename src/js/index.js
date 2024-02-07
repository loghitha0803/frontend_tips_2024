import { topcontainer } from './topcontainer.js';

const extractJson = async () => {
  const cityData = await (await fetch('../../../Assets/files/data.json')).json();
  topcontainer(cityData);
};
extractJson();
