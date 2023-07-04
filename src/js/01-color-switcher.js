function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

let timerId = null;

startBtn.addEventListener('click', startColor);
stopBtn.addEventListener('click', stopColor);

function startColor() {
    timerId = setInterval(getBgColor, 1000);

    startBtn.toggleAttribute('disabled');
}

function stopColor() {
    clearInterval(timerId);

    startBtn.removeAttribute('disabled');
}

function getBgColor() {
    bodyEl.style.backgroundColor = getRandomHexColor();
}


