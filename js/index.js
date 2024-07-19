// variables globales para el mapa y marcador
let map;
let marker;

// funcion para inicializar el mapa y la geolocalizacion
function initMap() {
    //  verificar si el navegador soporta la geolocalizacion
    if (navigator.geolocation) {
        // obtener la posicion actualdel usuario y mostrar mapa
        navigator.geolocation.getCurrentPosition(verMapa, error);
    }
    else {
        alert("tu navegador no soporta la geolocalizacion");
    }
    setInterval(() => {
        if (navigator.geolocation) {
            // obtenemos nuevamente la posicion
            navigator.geolocation.getCurrentPosition(actualizarMapa, error);
        }
        else {
            alert("tu navegador no soporta la geolocalizacion");
        }

    }, 60000) // cierre setInterval -> 10000 = 10s
} // llave de la funcion

function verMapa(pos) {
    // la api de google.mpas  requiere la latitud y longitud para mostra la ubicacion
    let latitud = pos.coords.latitude;
    let longitud = pos.coords.longitude;
    let mostrarLonLat = document.querySelector("#localizacion-info");
    mostrarLonLat.innerHTML = `Latitud = ${latitud} | Longitud = ${longitud}`;
    let latlon = new google.maps.LatLng(latitud, longitud);

    // opciones de visualizacion en el google mps -< tipo objeto
    let myOptions = {
        zoom: 15,
        center: latlon,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // crear el mapa y el marcador
    map = new google.maps.Map(document.querySelector("#map-canvas"),myOptions);
    marker=new google.maps.Marker({
        position:latlon,
        map:map,
        title:'Te encuentras aqui!'
    });


}

function actualizarMapa(pos) {
    let latitud = pos.coords.latitude;
    let longitud = pos.coords.longitude;
    let mostrarLonLat = document.querySelector("#localizacion-info");
    mostrarLonLat.innerHTML = `Latitud = ${latitud} | Longitud = ${longitud}`;
    let latlon = new google.maps.LatLng(latitud, longitud);

    // mover el marcador a una nueva posicion
    marker.setPosition(latlon);
    // centar el mapa el nueva posicion
    map.setCenter(latlon);
    

}

function error(pos) {
    alert('Eror al obtener la geolocalizacion')

}

window.onload = () => {
    initMap();
}