const formEl = document.getElementById("form");
const ipInputEl = document.getElementById("address");
const ipEl = document.getElementById("ip-address");
const locationEl = document.getElementById("location");
const timezoneEl = document.getElementById("timezone");
const ispEl = document.getElementById("isp");

const map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  id: "mapbox/streets-v11",
  // zoomOffset: -1,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var blackIcon = L.icon({
  iconUrl: "images/icon-location.svg",

  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

const marker = L.marker([51.5, -0.09], { icon: blackIcon }).addTo(map);

const popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
}

map.on("click", onMapClick);

// fetch location of the IP address on submit
formEl.onsubmit = function (e) {
  e.preventDefault();

  // fetch data
  fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_H7HMR6cQx2puqVH4R66DhyBnSrNZ2&ipAddress=${ipInputEl.value}`
  )
    .then((Response) => Response.json())
    .then((data) => {
      console.log(data);
      return renderResult(data);
    })
    .catch((error) => console.log(error));

  e.target.reset();
};
// fetch users location on initial load
fetch(
  "https://geo.ipify.org/api/v2/country,city?apiKey=at_H7HMR6cQx2puqVH4R66DhyBnSrNZ2&ipAddress="
)
  .then((Response) => Response.json())
  .then((data) => {
    console.log(data);
    return renderResult(data);
  });

function renderResult(data) {
  if (data.error) {
    throw `${data.message}`;
  }
  ipEl.textContent = data.ip;
  locationEl.textContent = `${data.location.region}, ${data.location.country}, ${data.location.postalCode}`;

  ispEl.textContent = data.isp;
  timezoneEl.textContent = `UTC ${data.location.timezone}`;
  map.setView([data.location.lat, data.location.lng], 13);
  marker.setLatLng([data.location.lat, data.location.lng]);
  marker.bindPopup(`<b>${data.location.city}</b>`).openPopup();
}
