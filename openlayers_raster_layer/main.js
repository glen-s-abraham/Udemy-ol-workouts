import './style.css';
import {Map, Tile, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import LayerGroup from 'ol/layer/Group';
import BingMaps from 'ol/source/BingMaps';
import XYZ from 'ol/source/XYZ';
import TileDebug from 'ol/source/TileDebug';

const map = new Map({
  target: 'map',

  view: new View({
    center: [0, 0],
    zoom: 2,
    //extent:[7635755.91449602,900802.0793604623,10976074.022725366, 4241120.187589807]
  })
});

const layerGroup = new LayerGroup({
  //Open street maps
  layers:[
    new TileLayer({
      source:new OSM({
        url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      }),
      zIndex:0,
      visible:false,
      //extent:[7635755.91449602,900802.0793604623,10976074.022725366, 4241120.187589807]
    }),

    //Bing map layer
    new TileLayer({
      source:new BingMaps({
        key:'',
        imagerySet:'Road', //Other options - Road,CanvasDark,CanvaseGrey,OrdinanceSurvey,AerialWithLabels
        visible:false
      })
    }),
    //CartoDb layer
    //https://github.com/CartoDB/basemap-styles
    new TileLayer({
      //Renders any url
      source:new XYZ({
        url:'https://{1-4}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{scale}.png'
      }),
      visible:false
    }),
    //Tile debug layer for grids
    new TileLayer({
      source:new TileDebug(),
      visible:false
    }),
    //Stamen Maps
    new TileLayer({
      source:new XYZ({
        url:'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg'
      })
    })

  ]
})

map.addLayer(layerGroup);
map.on('click',(e)=>{
  console.log(e.coordinate);
})