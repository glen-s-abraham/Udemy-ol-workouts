import './style.css';
import {Map, Tile, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import LayerGroup from 'ol/layer/Group';
import BingMaps from 'ol/source/BingMaps';
import XYZ from 'ol/source/XYZ';
import TileDebug from 'ol/source/TileDebug';
import TileArcGis from 'ol/source/TileArcGISRest';
import TileWms from 'ol/source/TileWMS';


const map = new Map({
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2,
    //extent:[7635755.91449602,900802.0793604623,10976074.022725366, 4241120.187589807]
  })
});

const openStreetMapLayer =  new TileLayer({
        source:new OSM({
          url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
        }),
        zIndex:0,
        visible:true,
        title:'osm'
      });

// const bingMapLayer = new TileLayer({
//         source:new BingMaps({
//           key:'',
//           imagerySet:'Road', 
//           visible:false,
//           title:'bing'
//         })
//       });
const cartoDbLayer =  new TileLayer({
        //Renders any url
        source:new XYZ({
          url:'https://{1-4}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{scale}.png'
        }),
        visible:false,
        title:'cartodb'
      });

const stamenLayer = new TileLayer({
        source:new XYZ({
          url:'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg'
        }),
        visible:false,
        title:'stamen'
      });

const tileDebugLayer = new Tile({
      source:new TileDebug(),
      visible:false
    });

const arcGisLayer = new TileLayer({
        source:new TileArcGis({
          url:'http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/MapServer'
        }),
        visible:true,
        title:'arcgis'
      });   

const wmsLayer =  new TileLayer({
        source: new TileWms({
          //https://nowcoast.noaa.gov/
          url:'https://nowcoast.noaa.gov/arcgis/services/nowcoast/analysis_meteohydro_sfc_qpe_time/MapServer/WMSServer',
  
          params:{
            //Imagery name identifier
            LAYERS:1,
            FORMAT:'image/png',
            TRANSPARENT:true
          },
        }),
        title:'wms',
        visible:true
      });


const baseMapLayers = new LayerGroup({layers:[
  openStreetMapLayer,
  //bingMapLayer,
  cartoDbLayer,
  stamenLayer
]});

const dataLayers = new LayerGroup({
  layers:[
    arcGisLayer,
    wmsLayer
  ]
})


//Layer Switcher logic
document.querySelector('#baseLayers').addEventListener('change',(e)=>{
  const selectedLayer = e.target.value;
  baseMapLayers.getLayers().forEach(el=>{
      el.setVisible(el.get('title')===selectedLayer);   
  })
});

document.querySelector('#layers').addEventListener('change',(e)=>{
  const selectedLayer = e.target.value;
  const isSelected = e.target.checked;
  dataLayers.getLayers().forEach(el=>{
    if(el.get('title')==selectedLayer){
      console.log(el.get('title'));
      el.setVisible(isSelected);
    }
  })
});




map.addLayer(baseMapLayers);
map.addLayer(dataLayers);

map.on('click',(e)=>{
  console.log(e.coordinate);
})

