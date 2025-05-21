var inputvalue = document.querySelector('#cityinput')
var btn = document.querySelector('#add')
var city = document.querySelector('#cityoutput')
var descrip = document.querySelector('#description')
var temp = document.querySelector('#temp')
var wind = document.querySelector('#wind')
var apikey = '6019a2e0b3eca9340e84508da64dafc1'

function conversion(val){
    return (val - 273).toFixed(2)
}
window.onload = function() {
    city.innerHTML = "Find weather details";
}
btn.addEventListener('click', function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputvalue.value + '&appid=' + apikey)
    .then(res => res.json())
    .then(data => {
        var nameval = data['name']
        var descriptionVal = data['weather'][0]['description']
        var temperature = data['main']['temp']
        var windspeed = data['wind']['speed']

        city.innerHTML = `Weather of <span>${nameval}</span>`
        city.classList.remove("error-message");
        temp.innerHTML = `Temperature: <span>${conversion(temperature)}°C</span>`
        descrip.innerHTML = `Sky condition: <span>${descriptionVal}</span>`
        wind.innerHTML = `Wind Speed: <span>${windspeed} m/s</span>`

        inputvalue.value = ''

    })
    .catch(err => {
    city.innerHTML = "City not found. Please try again!";
    descrip.innerHTML = "";
    temp.innerHTML = "";
    wind.innerHTML = "";

    // Reset input
    inputvalue.value = '';
})
btn.addEventListener('click', getWeather);

// Enter key event inside input field
inputvalue.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});
});