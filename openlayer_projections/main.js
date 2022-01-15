import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import proj4 from 'proj4';
import {register} from 'ol/proj/proj4';
import {fromLonLat,toLonLat} from 'ol/proj';

//Open layers supports 2 types of projections
//4326-wgs-84
//spherical mercator -epsg 3857
//EPSG - European petroleum survey group
//Third party library for coordinate conversions

//EPSG:24378 for india

//kochi google maps:9.9826809,76.1608459,
proj4.defs("EPSG:24378","+proj=lcc +lat_1=32.5 +lat_0=32.5 +lon_0=68 +k_0=0.99878641 +x_0=2743195.5 +y_0=914398.5 +a=6377299.151 +b=6356098.145120132 +towgs84=295,736,257,0,0,0,0 +units=m +no_defs");
register(proj4);

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: fromLonLat([76.1608459,9.9826809],"EPSG:24378"),//coordinate transformations
    zoom: 10,
    //Adjusts distortion
    projection:"EPSG:24378"
  })
});

map.on('click',(e)=>console.log(e.coordinate ,toLonLat(e.coordinate,'EPSG:3857')));
