import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import data from './data/objects.json';
import roads from './data/roads.json';
import { MAP_COORDS, MAP_TILE, MAP_ZOOM } from './scripts/const';
import pinSvg from 'bundle-text:./images/pin.svg';
import { createElement, Landmark } from 'lucide';

// Create map
const map = L.map('map').setView(MAP_COORDS, MAP_ZOOM);

function renderMap() {
  L.tileLayer(MAP_TILE).addTo(map);
  renderPoints(map)
}

function renderRoute() {
  L.geoJSON(roads, {
    style: {
      // color: "#6200ea",
      // weight: 4,
      // opacity: 1,
      // lineCap: "round",
      // lineJoin: "round",
      // dashArray: "0",
      // className: "glowing-line"  // Можно добавить CSS-анимаци
      color: '#0565d8',
      weight: 3,
      opacity: 0.8,
      lineCap: 'round',
      lineJoin: 'round',
      smoothFactor: 3,
      // dashArray: '8, 8',
    },
    onEachFeature: function (feature, layer) {
      if (feature.properties && feature.properties.name) {
        layer.bindPopup(`
        <div class="street-popup">
            <b>Улица:</b> ${feature.properties.name}<br>
        </div>
`);
      }
    }
  }).addTo(map);
}

function renderPoints(map) {
  const points = data.filter((object) => object.type !== 'roads');

  points.forEach((point) => {
    const [lat, lon] = point.coords;

    const icon = createPin();

    L.marker([lat, lon], { icon })
      .addTo(map)
      .bindPopup(point.object)
  })
}

function createPin() {

  const pinWrapper = document.createElement('div');
  pinWrapper.classList.add('pin__wrapper');

  const pinIcon = createPinIcon();

  pinWrapper.innerHTML = pinSvg;
  pinWrapper.appendChild(pinIcon)


  return L.divIcon({
    html: pinWrapper,
    className: 'pin',
    iconSize: [42, 60],
    iconAnchor: [16, 64],
    popupAnchor: [0, -64]
  })
}


function createPinIcon() {
  return createElement(Landmark, {
    class: 'pin__icon',
    stroke: '#fff',
  })
}

renderMap();
renderRoute();
