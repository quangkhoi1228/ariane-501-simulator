const startButton = document.getElementById('startButton');
const body = document.getElementsByTagName('body')[0]

const speed = document.getElementsByClassName('speed')[0]
const momentum = document.getElementsByClassName('acceleration')[0]
const statusElem = document.getElementsByClassName('status')[0]

const momentumValue = 6000;
let speedValue = 0;
const intervalTime = 30;
const max16BitRange = 32767;
// const max16BitRange = 3000;

startButton.onclick = () => {
  body.classList.remove('error');
  body.classList.remove('stop');
  body.classList.remove('done');
  speedValue = 0;
  momentum.innerHTML = momentumValue.toLocaleString();
  statusElem.innerHTML = 'Bình thường';
  const interval = setInterval(() => {
    const split = 1000 / intervalTime;
    speedValue += momentumValue / split;
    speed.innerHTML = speedValue.toLocaleString();

    if (speedValue > max16BitRange) {
      statusElem.innerHTML = 'Có lỗi'
      body.classList.remove('done');
      body.classList.remove('stop');
      body.classList.add('error');
      clearInterval(interval);

      setTimeout(() => {
        body.classList.remove('error');
        body.classList.remove('stop');
        body.classList.add('done');

      }, 2000)
    }
  }, intervalTime);
}


