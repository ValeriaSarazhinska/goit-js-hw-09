import {Notify} from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('form');

form.addEventListener("submit", handleSubmit)


function handleSubmit(event) {
  event.preventDefault();
  const delay = Number(event.currentTarget.elements.delay.value);
  const step = Number(event.currentTarget.elements.step.value);
  const amount = Number(event.currentTarget.elements.amount.value);

  for (let i = 0; i < amount; i++) {

    createPromise(i + 1, delay + step * i)
      .then(({position, delay}) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({position, delay}) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({position, delay})
      } else {
        // Reject
        reject({position, delay})
      }
    }, delay)
  })

}

