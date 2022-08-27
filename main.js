function onClick (event) {
    //anula el evento por defecto que tiene un boton dentro de un formulario
    //cuando se presiona un boton dentro de un formulario lo que hace el evento es buscar
    //dentro del formulario el sript asociado e intenta enviar informacion
    //por eso se anula la accion normal del boton antes de enviar hay que procesar 
    event.preventDefault();
    
    const mensaje = {
      comercio: document.getElementById('comercio').value,
      titular: document.getElementById('titular').value,
      celular: document.getElementById('celular').value,
      message: document.getElementById('message').value
    }
    console.log(mensaje);
  
  
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(mensaje),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => { 
          console.log(json);
          Swal.fire(
              'Enviado',
              'Gracias por tu comentario', 
              'success'
          );
          cleanForm();
          /* redirectUrl(); */
      })
      .catch((err) => console.log(err));
  
  }

  function cleanForm() {
    let formulario = document.getElementById('formulario');    
    formulario.reset();    
}
function redirectUrl(){
    window.location.href = "https://google.com";    
}




let boton = document.getElementById("enviar");
//cuando se capture el click dek usuario, se ejecuta la funcion onclick
boton.addEventListener("click", onClick);

/* ------------------SECCION CLIMA---------------------------------------- */


const api_key = 'eff45045e3d6f5585d9d08134ec413de';
const fetchData = position => {
  const { latitude, longitude } = position.coords;
  fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${-24.18324151358602}&lon=${-65.33130863237089}&units=metric&appid=${api_key}`)
  .then(response => response.json())
  .then(data => setWeatherData(data));   
  }
   
const setWeatherData = data => {
    const weatherData = {
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: Math.floor(data.main.temp),
        date: getDate(),
    }

    Object.keys(weatherData).forEach( key => {
        setTextContent(key, weatherData[key]);
    });

    cleanUp();
}

const cleanUp = () => {
    let container = document.getElementById('container2');
    let loader = document.getElementById('loader');

    loader.style.display = 'none'; 
    container.style.display = 'flex'; 
}

const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${ ('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
}

const setTextContent = (element, text) => {
    document.getElementById(element).textContent = text;
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData)
}