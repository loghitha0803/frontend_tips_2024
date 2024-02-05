/**
 *
 * @param {Array} hourlyImage - The Temperature of the next five hours
 * @description - Holds the weather-icon for the next five hours
 */
export function updateIcon (hourlyImage) {
  const nowImage = document.querySelector('.now-image');
  const firstHourImage = document.querySelector('.first-hour-image');
  const secondImage = document.querySelector('.second-image');
  const thirdImage = document.querySelector('.third-image');
  const forthImage = document.querySelector('.forth-image');
  nowImage.src = hourlyImage[0];
  firstHourImage.src = hourlyImage[1];
  secondImage.src = hourlyImage[2];
  thirdImage.src = hourlyImage[3];
  forthImage.src = hourlyImage[4];
}
