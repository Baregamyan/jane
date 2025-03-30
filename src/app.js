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
      color: '#0565d8',
      weight: 3,
      opacity: 1
    }
  }).addTo(map);

  // const { startCoords, endCoords } = road;
  // console.log(startCoords)
  // console.log(endCoords)
  // const line = new HighlightablePolyline(
  //   [startCoords, endCoords],
  //   { color: '#0565d8', weight: 4, opacity: 1, raised: false }
  // ).addTo(map);
  // console.log('working?')
  // console.log(road.object)
  // new L.Layer.Highlight({ email: 'baregamyan@gmail.com' }).do({
  //   q: 'Улица Никольская, Москва'
  // }).addTo(map);

  // const { startCoords, endCoords } = road;

  // const leafletElements = L.Routing.control({
  //   router: L.Routing.osrmv1({
  //     serviceUrl: ROUTING_SERIVCE_URL
  //   }),
  //   waypoints: [
  //     L.latLng(startCoords),
  //     L.latLng(endCoords)
  //   ],
  //   lineOptions: {
  //     styles: [{
  //       color: '#0565d8',
  //       opacity: .6,
  //       weight: 3
  //     }]
  //   },
  //   addWaypoints: false,
  //   draggableWaypoints: false,
  //   fitSelectedRoutes: false,
  //   showAlternatives: false,
  //   altLineOptions: { styles: [{ opacity: 0 }] },
  //   createMarker: () => { return null; },
  // }).addTo(map);

  // // Hide Routes ui panel
  // leafletElements._altContainer = document.createElement('div')
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

  // const createMark = document.createElement('div');
  // createElement.classList.add('pin-wrapper');

  // const picture = createElement(Landmark, {
  //   class: ['pin-svg__picture'],
  //   stroke: '#fff'
  // })
}

function createPin() {

  const pinWrapper = document.createElement('div');
  pinWrapper.classList.add('pin__wrapper');

  const pinIcon = createPinIcon();

  pinWrapper.innerHTML = pinSvg;
  pinWrapper.appendChild(pinIcon)


  // const tempContainer = document.createElement('div');

  // tempContainer.innerHTML = pinSvg;

  // const htmlPin = tempContainer.querySelector('svg');
  // console.log(htmlPin)

  // const iconWrapper = htmlPin.querySelector('.pin-svg__icon');

  // htmlPin.appendChild(picture);

  // console.log(icon)

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
renderRoute()