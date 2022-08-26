window.addEventListener('load', ()=> {

    let lon;
    let lat;

let temperaturaValor = document.getElementById('temperatura-valor');
let temperaturaDescripcion = document.getElementById('temperatura-descripcion');

let ubicacion = document.getElementById('ubicacion');
let iconoAnimado = document.getElementById('icono-animado');

let vientoVelocidad = document.getElementById('viento-velocidad');


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(posicion => {
            //console.log(posicion.coords.latitude)
            lon = posicion.coords.longitude;
            lat = posicion.coords.latitude;

            // Capturando la ubicacion actual  
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=7e6fa103b201047e0873faf953ba25b6`

            //console.log(url)
            fetch(url)
                .then(response => { return response.json() })
                .then ( data => {
                    let temp = Math.round(data.main.temp);
                    temperaturaValor.textContent = `${temp} ºC`;

                    let desc = data.weather[0].description;
                    temperaturaDescripcion.textContent = desc.toUpperCase();
                    
                    ubicacion.textContent = data.name;

                    
                    vientoVelocidad.textContent = `${data.wind.speed} m/s`;

                    

                    //Para iconos estaticos
                    // let iconCode = data.weather[0].icon
                    // const urlIcon = `http://openweathermap.org/img/wn/${iconCode}.png`     
                    // console.log(urlIcon)

                    //iconos animados
                    console.log(data.weather[0].main);
                    
                    switch (data.weather[0].main) {
                        case 'Thunderstorm':
                          iconoAnimado.src='/assets/iconosAnimadosClima/thunder.svg'
                          console.log('TORMENTA');
                          break;
                        case 'Drizzle':
                          iconoAnimado.src='/assets/iconosAnimadosClima/rainy-2.svg'
                          console.log('LLOVIZNA');
                          break;
                        case 'Rain':
                          iconoAnimado.src='/assets/iconosAnimadosClima/rainy-7.svg'
                          console.log('LLUVIA');
                          break;
                        case 'Snow':
                          iconoAnimado.src='/assets/iconosAnimadosClima/snowy-6.svg'
                            console.log('NIEVE');
                          break;                        
                        case 'Clear':
                            iconoAnimado.src='/assets/iconosAnimadosClima/day.svg'
                            console.log('LIMPIO');
                          break;
                        case 'Atmosphere':
                          iconoAnimado.src='/assets/iconosAnimadosClima/weather.svg'
                            console.log('ATMOSFERA');
                            break;  
                        case 'Clouds':
                            iconoAnimado.src='/assets/iconosAnimadosClima/cloudy-day-1.svg'
                            console.log('NUBES');
                            break;  
                        default:
                          iconoAnimado.src='/assets/iconosAnimadosClima/cloudy-day-1.svg'
                          console.log('por defecto');
                      }








                     






                })
                .catch(error => {
                    console.log(error)
                })

        })
    }

})