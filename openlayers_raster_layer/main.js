import './style.css';
import {Map, Tile, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import LayerGroup from 'ol/layer/Group';

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM(),
      zIndex:1,
      visible:false,
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2,
    extent:[7635755.91449602,900802.0793604623,10976074.022725366, 4241120.187589807]
  })
});

const layerGroup = new LayerGroup({
  layers:[
    new TileLayer({
      source:new OSM({
        url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      }),
      zIndex:0,
      visible:true,
      extent:[7635755.91449602,900802.0793604623,10976074.022725366, 4241120.187589807]
    })
  ]
})

map.addLayer(layerGroup);
map.on('click',(e)=>{
  console.log(e.coordinate);
})