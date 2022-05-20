
const addressInput = document.querySelector("#address");
const addressButton = document.querySelector("#addresButon");
const selectAddress = document.querySelector("#selectAddress");

let arrayPlaces = [];

const map = L.map('map', {
   center: [40.15, -77.25],
   zoom: 10,               
});

const osm = L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&#169; <a href="//www.openstreetmap.org/">OpenStreetMap</a> contributors, CC BY-SA license'
}).addTo(map);

const getCoordinates = () => {
   const query = addressInput.value;
    fetch('https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=' + query)
        .then(result => result.json())
        .then(parsedResult => {
           arrayPlaces = parsedResult;
           setAddressSelect(parsedResult);
        });
};

const setAddressSelect = (arrayPlaces) => {
   selectAddress.innerHTML = "";

   arrayPlaces.map( place => { 
      option = document.createElement("option");
      option.innerHTML = `${place.display_name}`;
      selectAddress.appendChild(option);
   });
};

// selected array

const changeSelect = (selected) => {
   const lat = arrayPlaces[selected].lat;
   const lon = arrayPlaces[selected].lon;

   map.flyTo([parseFloat(lat),parseFloat(lon)]);
};

