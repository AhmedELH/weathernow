window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');
    const cloudsVisible = document.querySelector('.clouds');
    const humidityLevel = document.querySelector('.humidity');
    const pressureLevel = document.querySelector('.pressure');
    let locationSpecific = document.querySelector('.location-specific');


    const myKey = "9fd7e84f84626f28199be3bc384da8f9"

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&units=metric&appid=${myKey}`;
            const apix = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&exclude=hourly,minutely&units=metric&appid=${myKey}`;


            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {

                   
                    
                    const { temp, clouds, humidity, pressure } = data.current;
                    const { description, icon } = data.current.weather[0];

                    //Set DOM elements
                    temperatureDegree.textContent = temp;
                    temperatureDescription.textContent = description;
                    locationTimezone.textContent = data.timezone;
                    cloudsVisible.textContent = clouds + "%";
                    humidityLevel.textContent = humidity;
                    pressureLevel.textContent = pressure;

                    //Set icon
                    setIcons(icon, document.querySelector('.icon'));
                    setIcons("03d", document.querySelector('.icon__cloud'));
                    setIcons("50d", document.querySelector('.icon__pressure'));
                    setIcons("09d", document.querySelector('.icon__humidity'));


                    

                    //Celsius to Farenheit

                    let Farenheit = (temp * 9 / 5) + 32;

                    //Switch between Celsius/Farenheit
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "°C") {
                            temperatureSpan.textContent = "°F";
                            temperatureDegree.textContent = Math.floor(Farenheit);
                        } else {
                            temperatureSpan.textContent = "°C";
                            temperatureDegree.textContent = temp;

                        }

                    });


                });

                fetch(apix)
                .then(response => {
                    return response.json();
                })
                .then(datax => {
                   
                    locationSpecific.textContent = datax.name;
                })
        });

    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        let checkIcon = icon;
        let currentIcon;
        
        if ((checkIcon == "01d") || (checkIcon == "01n")) {
            currentIcon = "CLEAR_DAY";
        } else if ((checkIcon == "02d") || (checkIcon == "02n")) {
            currentIcon = "PARTLY_CLOUDY_DAY";
        } else if ((checkIcon == "03d") || (checkIcon == "03n")) {
            currentIcon = "CLOUDY";
        } else if ((checkIcon == "04d") || (checkIcon == "04n")) {
            currentIcon = "CLOUDY";
        } else if (checkIcon == "09d") {
            currentIcon = "RAIN";
        } else if (checkIcon == "10d") {
            currentIcon = "RAIN";
        } else if (checkIcon == "11d") {
            currentIcon = "SLEET";
        } else if (checkIcon == "13d") {
            currentIcon = "SNOW";
        } else if (checkIcon == "50d") {
            currentIcon = "FOG";
        }
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);


    }


});