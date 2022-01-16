import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Geolocation from 'ol/Geolocation';
import {toLonLat} from 'ol/proj';
const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

const geoLocation = new Geolocation({
  tracking:true,
  trackingOptions:{
    enableHighAccuracy:true
  },
  projection:map.getView().getProjection()
})
geoLocation.on('change:position',(e)=>{
  map.getView().setCenter(e.target.get('position'));
  map.getView().setZoom(15);
})