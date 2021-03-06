import './style.css';
import {Map, Overlay, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorTile from 'ol/source/VectorTile';
import MVT from 'ol/format/MVT';
import VectorTileLayer from 'ol/layer/VectorTile';
import LayerGroup from 'ol/layer/Group';
import VectorImageLayer from 'ol/layer/VectorImage';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import KML from 'ol/format/KML';
import HeatMap from 'ol/layer/Heatmap';

const map = new Map({
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});


//BaseMap
const osmRasterMapLayer = new TileLayer({
  source:new OSM()
})


//https://cloud.maptiler.com/maps/
//Vector Tile Layer open street map
const osmVetorTileLayer = new VectorTileLayer({
  source:new VectorTile({
    url:'https://api.maptiler.com/tiles/v3-openmaptiles/{z}/{x}/{y}.pbf?key=PijrhfjxWPDYfgX6QNPH',
    format:new MVT(),
    attributions:'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
  }),
  visible:true,
})

//GeoJson vector data Kerala districts
const keralaStatesVectroLayer = new VectorLayer({
  source:new VectorSource({
    url:'./data/vector/kerala_districts.geojson',
    format:new GeoJSON()
  })
});

//Vector image layer - alternative to vector layer.seems to be faster than normal vector layer
const keralaStatesVectroImageLayer = new VectorImageLayer({
  source:new VectorSource({
    url:'./data/vector/kerala_districts.kml',
    format:new KML()
  })
});


//Heatmap - subclass of Vector Layers-used to illustrate weight or intensity at a particular point for a feature
const heatmapFbUsersLayer = new HeatMap({
  source:new VectorSource({
    url:'./data/vector/fbusers.geojson',
    format:new GeoJSON()
  }),
  radius:15,
  blur:10,
  gradient:['#00f','#dc143c','#000','#000','#000']
})

//Central european countries vector layer
const centralEuVectorLayer = new VectorImageLayer({
  source:new VectorSource({
    url:'./data/vector/Central_EU_countries_GEOJSON.geojson',
    format:new GeoJSON()
  }),
  title:'central-eu-countries'
})

//Interaction with vector features european countries vector layer
//obtain pixels at a click point on the map click event
//use method forEachFeatureAtPixel to identify the features.

//Overlay for eu country informations
const overlayForEUCountriesLayer = new Overlay({
  element:document.getElementById('country-info')
})

//Country Info update logic
map.on('click',(e)=>{
  map.removeOverlay(overlayForEUCountriesLayer);
  map.forEachFeatureAtPixel(e.pixel, (feature,layer)=>{
    map.addOverlay(overlayForEUCountriesLayer);
    document.getElementById('name').innerHTML=feature.get('name');
    document.getElementById('additional-info').innerHTML=feature.get('additionalinfo');
    overlayForEUCountriesLayer.setPosition(e.coordinate);
  },{
    layerFilter:layers=>{
      return layers.get('title')=='central-eu-countries';
    }
  })
})

//Base Rastor Layers
const baseRasterLayer = new LayerGroup({layers:[
  osmRasterMapLayer
]});

//Base Vector layers
const baseVectorLayer = new LayerGroup({layers:[
    //osmVetorTileLayer,
    //keralaStatesVectroLayer,
    //keralaStatesVectroImageLayer,
    //heatmapFbUsersLayer,
    centralEuVectorLayer
]})

map.addLayer(baseRasterLayer);
map.addLayer(baseVectorLayer);