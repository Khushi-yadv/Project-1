const mapDiv=document.getElementById('map');
const coords=JSON.parse(mapDiv.dataset.coordinates);
console.log(coords);//[lon,lat]
let reverseCoords=coords.reverse();
console.log(reverseCoords);
let listingTitle=document.querySelector(".listing-title");
console.log(listingTitle);


var map = L.map('map').setView(reverseCoords, 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
  
var marker = L.marker(reverseCoords).addTo(map);

var circle = L.circle(reverseCoords, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);


marker.bindPopup(listingTitle.innerText).openPopup();

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);

(() => {
  'use strict'

  
  const forms = document.querySelectorAll('.needs-validation')

  
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()