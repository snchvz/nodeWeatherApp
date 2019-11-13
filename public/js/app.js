//
console.log('client side js file loaded');

const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
messageOne = document.querySelector('#message-1');
messageTwo = document.querySelector('#message-2');


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
        });
    });
});