import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorImageLayer from 'ol/layer/VectorImage';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Select from 'ol/interaction/Select';
import Source from 'ol/source/Source';
import {singleClick} from  'ol/events/condition'
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

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

const centralEuVectorLayer = new VectorImageLayer({
  source:new VectorSource({
    url:'./data/vector/Central_EU_countries_GEOJSON.geojson',
    format:new GeoJSON()
  }),
  title:'central-eu-countries'
})

map.addLayer(centralEuVectorLayer);

const selectInteraction = new Select({
  condition: singleClick,
  layers:(layers)=>{
    return layers.get('title')==='central-eu-countries';
  },
  style:new Style({
    image:new Circle({
      fill:new Fill({
        color:[247,26,10,1]
      }),
      radius:12,
      stroke:new Stroke({
        color:[247,26,10,1],
        width:3
      })
    })
  }),
})
map.addInteraction(selectInteraction);