import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import objects from './data/objects.json';
import roads from './data/roads.json';
import { MAP_COORDS, MAP_TILE, MAP_ZOOM } from './scripts/const';
import pinSvg from 'bundle-text:./images/pin.svg';
import { createElement, Landmark, Church, Shrub, HeartPulse, Droplets, Drama, ShieldPlus, BriefcaseMedical } from 'lucide';


// Create map
const map = L.map('map').setView(MAP_COORDS, MAP_ZOOM);

function renderMap() {
  L.tileLayer(MAP_TILE).addTo(map);
  renderPoints(map)
}

function renderRoute() {
  L.geoJSON(roads, {
    style: {
      color: '#0565d8',
      weight: 3,
      opacity: 0.8,
      lineCap: 'round',
      lineJoin: 'round',
      smoothFactor: 3,
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

  objects.forEach((point) => {
    const { lat, lon } = point.coords;

    const icon = createPin(point);

    L.marker([lat, lon], { icon })
      .addTo(map)
      .bindPopup(`${point.id}. ${point.name}`)
  })
}

function createPin(object) {

  const pinWrapper = document.createElement('div');
  pinWrapper.classList.add('pin__wrapper');

  const pinIcon = createPinIcon(object);

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

function createPinIcon(object) {
  const type = object.type;
  let icon;

  switch (type) {
    case 'temple':
      icon = Church;
      break;
    case 'park':
      icon = Shrub;
      break;
    case 'hospital':
      icon = BriefcaseMedical;
      break
    case 'fountain':
      icon = Droplets;
      break
    case 'theatre':
      icon = Drama;
      break
    default:
      icon = Landmark;
  }

  return createElement(icon, {
    class: 'pin__icon',
    stroke: '#fff',
  })
}

renderMap();
renderRoute();
