import './style.css';
import {Map, Overlay, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import DragRotate from 'ol/interaction/DragRotate';
import Draw from 'ol/interaction/Draw';
import {altKeyOnly} from 'ol/events/condition';
import GeoJSON from 'ol/format/GeoJSON';
import FullScreen from 'ol/control/FullScreen';
import MousePosition from 'ol/control/MousePosition';
import OverviewMap from 'ol/control/OverviewMap';//inset map
import ScaleLine from 'ol/control/ScaleLine';
import ZoomSlider from 'ol/control/ZoomSlider';
import ZoomToExtent from 'ol/control/ZoomToExtent';

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
  keyboardEventTarget:document,
  controls:[
    new FullScreen(),
    new MousePosition(),
    new OverviewMap({
      layers:[
        new TileLayer({source:new OSM()})
      ],
      collapsed:false
    }),
    new ScaleLine(),
    new ZoomSlider(),
    new ZoomToExtent()
  ]
});

const popupContainer = document.getElementById('popup-container');
const popup = new Overlay({
  element:popupContainer,
  positioning:'center-left'
});

map.addOverlay(popup);

map.on('click',(e)=>{
  const clickedCoordinates = e.coordinate;
  popup.setPosition(undefined);
  popup.setPosition(clickedCoordinates);
  document.getElementById('popup-coordinates').innerHTML = clickedCoordinates;
});

map.addInteraction(new DragRotate({
  condition:altKeyOnly
}))

const drawInteraction = new Draw({
  type:'Polygon',
  freehand:true
});

map.addInteraction(drawInteraction);

drawInteraction.on('drawend',(e)=>{
  const parser = new GeoJSON();
  console.log(parser.writeFeatures([e.feature]));
})

