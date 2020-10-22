console.log('Client side JS file is loaded!');
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.querySelector('#one');
const msgTwo = document.querySelector('#two');
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  fetch('http://localhost:3000/weather?address=' + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          // console.log(data.error);
          msgOne.textContent = data.error;
          msgTwo.textContent = '';
        } else {
          // console.log(data.location);
          // console.log(data.forecast);
          msgOne.textContent = data.location;
          msgTwo.textContent =
            'Humidity is ' +
            data.forecast.humidity +
            ' % ' +
            ' and Temperature is ' +
            data.forecast.temperature +
            ' degrees ';
        }
      });
    }
  );
});
