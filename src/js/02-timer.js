import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const date = new Date();
    if (date > selectedDates[0]) {
      return Notify.failure("Please choose a date in the future")
    }
    button.disabled = false
  },
};

const input = document.querySelector('#datetime-picker')
const dataDays = document.querySelector('[data-days]')
const dataHours = document.querySelector('[data-hours]')
const dataMinutes = document.querySelector('[data-minutes]')
const dataSeconds = document.querySelector('[data-seconds]')
const button = document.querySelector('button')

const fp = flatpickr(input, options)

button.disabled = true

button.addEventListener('click', () => {
  timer.start()
})

const timer = {
  start() {
    const startTime = fp.selectedDates[0]

    setInterval(() => {
      const currentTime = Date.now()
      const deltaTime = startTime - currentTime
      const {days, hours, minutes, seconds} = convertMs(deltaTime)

      dataDays.textContent = days
      dataHours.textContent = hours
      dataMinutes.textContent = minutes
      dataSeconds.textContent = seconds
    }, 1000)
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0')
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return {days, hours, minutes, seconds};
}


