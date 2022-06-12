let weather = {
    "apiKey": "QAJDERH6PU6WFWB5RQ7TJYT4J"
}
const input = document.querySelector('.search__input');
const tempProp = document.querySelector('.temp')
const description = document.querySelector('.description')
const rainChance = document.querySelector('.rain')

window.addEventListener('load', ()=>{
    // let time = new Date("June 13, 20222 12:00:00");
    let long;
    let lat;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            api  = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${long}?key=${weather.apiKey}` 

            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data => displayWeather(data))

            const displayWeather = (weather) =>{
                console.log(weather);
                input.value = "Your place"; 
                description.textContent = weather.days[0].description;
                rainChance.textContent += weather.days[0].precipprob + "%";
                convertTemp(weather);

            }
            const convertTemp = (weather) =>{
                const temperature = Math.floor((weather.days[0].temp -32) *5/9);
                tempProp.textContent = temperature + "°C";
            }
        });
    }
});

const btn = document.querySelector('.search__btn');


const searchPlace = () =>{
    const place = input.value;
    findGeolocation(place);
}

btn.addEventListener('click', searchPlace)

let findPlaceApi = {
    "apiKey": "a905017116454dc79e68189bd7d43d90"
}
const findGeolocation = (place) =>{
    fetch(`https://api.geoapify.com/v1/geocode/search?text=${place}&lang=en&limit=10&type=city&apiKey=${findPlaceApi.apiKey}`)
    .then(response =>{
        return response.json();
    })
    .then(data => choseCity(data))

    const choseCity = (city) =>{
        console.log(city);
        chosenCityLat = city.features[0].properties.lat;
        chosenCitylon = city.features[0].properties.lon;

        displayWeatherForNewPlace(chosenCityLat, chosenCitylon)
    }
    const displayWeatherForNewPlace = (lat, lon) =>{
        lat = lat;
        long = lon;
        api  = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${long}?key=${weather.apiKey}` 

        fetch(api)
        .then(response =>{
            return response.json();
        })
        .then(data => displayWeather(data))

    const displayWeather = (weather) =>{
        console.log(weather);
        input.value = "Your place"; 
        description.textContent = weather.days[0].description;
        rainChance.textContent += weather.days[0].precipprob + "%";
        convertTemp(weather);

    }
    const convertTemp = (weather) =>{
        const temperature = Math.floor((weather.days[0].temp -32) *5/9);
        tempProp.textContent = temperature + "°C";
    }
    }
}


