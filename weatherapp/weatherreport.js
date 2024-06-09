const container = document.querySelector('.container');
const search = document.querySelector('.search button');
const weather_box = document.querySelector('.weather_box');
const weatherDetails = document.querySelector('.weather_details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');


search.addEventListener('click', () => {
    const APIKey = '47a7b0b96a89126c15f8d8554af2bf13';
    const city = document.querySelector('.search input').value;

    if(city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if(json.cod == '404') {
                cityHide.textContent = city;
                container.style.height = '450px';
                weather_box.classList.remove('active')
                weatherDetails.classList.remove('active')
                error404.classList.add('active')
                return
            }

            
            

            const image = document.querySelector('.weather_box img')
            const temperature = document.querySelector('.weather_box .temperature')
            const description = document.querySelector('.weather_box .description')
            const humidity = document.querySelector('.weather_details .humidity span')
            const wind = document.querySelector('.weather_details .wind span')

            if(cityHide.textContent == city) {
                return;
            }
            else {
                cityHide.textContent = city;

                container.style.height = '555px';
                weather_box.classList.add('active')
                weatherDetails.classList.add('active')
                error404.classList.remove('active')

                

                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'icons/sunny.png'
                        break;
    
                    case 'Rain':
                        image.src = 'icons/raining.png'
                        break;
    
                    case 'Snow':
                        image.src = 'icons/snowy.png'
                        break;
    
                    case 'Clouds':
                        image.src = 'icons/cloudy.png'
                        break;
    
                    case 'Mist':
                    case 'Haze':
                        image.src = 'icons/misty.png'
                        break;
    
                    default:
                        image.src = 'icons/misty.png'
                }
    
                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                description.innerHTML = `${json.weather[0].description}`;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            }
            
           
        });

});


