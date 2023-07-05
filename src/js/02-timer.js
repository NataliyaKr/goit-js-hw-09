import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';


const timer = {
    btnTimerStart: document.querySelector('[data-start]'),
    timerFieldDays: document.querySelector('[data-days]'),
    timerFieldHours: document.querySelector('[data-hours]'),
    timerFieldMinutes: document.querySelector('[data-minutes]'),
    timerFieldSeconds: document.querySelector('[data-seconds]'),
};

timer.btnTimerStart.disabled = true;
let timerId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
        const currentDate = new Date();
        if (selectedDates[0] - currentDate > 0) {
            timer.btnTimerStart.disabled = false;
        } else {
            timer.btnTimerStart.disabled = true;
            Notify.failure('Please choose a date in the future', {
                timeout: 1500,
                width: '400px',
            });
        }
    },
}

function convertMs(ms) {
    const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, 0);
}

function onTimerStart() {
    const selectedDates = fp.selectedDates;

    if (selectedDates && selectedDates.length > 0) {
        const selectedDate = selectedDates[0];
        
    timerId = setInterval(() => {
        const startTime = new Date();
        const countdown = selectedDate - startTime;
        timer.btnTimerStart.disabled = true;

        if (countdown < 0) {
        clearInterval(timerId);
        return;
        }

        updateTimerFace(convertMs(countdown));
    }, 1000);
    }
}

function updateTimerFace({days, hours, minutes, seconds}) {
    timer.timerFieldDays.textContent = addLeadingZero(days);
    timer.timerFieldHours.textContent = addLeadingZero(hours);
    timer.timerFieldMinutes.textContent = addLeadingZero(minutes);
    timer.timerFieldSeconds.textContent = addLeadingZero(seconds);
}

const fp = flatpickr('#datetime-picker', options);

timer.btnTimerStart.addEventListener('click', onTimerStart);




