//
console.log('client side js file loaded');

const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
messageOne = document.querySelector('#message-1');
messageTwo = document.querySelector('#message-2');
myForecast = document.querySelector('#myWeather');

fetch("https://ipapi.co/json/").then((response) => {
    response.json().then((data) => {
        const city = data.city;
        const region = data.region;
        console.log(region);
        fetch('/weather?address=' + city + " " + region).then((resp) => {
            resp.json().then((forecast) => {
                if (forecast.error)
                {
                    messageOne.textContent = forecast.error;
                    return;
                }
                myForecast.textContent = "it is currently " + forecast.hourly[0].temp;
                console.log(forecast.hourly);
            });
        });
    });
});



weatherForm.addEventListener('submit', (event) => {
    event.preventDefault(); //prevent page from reloading after submitting form

    messageOne.textContent = 'Getting location...';
    messageTwo.textContent = '';

    const location = searchElement.value;
    
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error)
            {
                messageOne.textContent = data.error;
                return;
            }
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;

            //console.log(data.hourly);
        });
    });
});