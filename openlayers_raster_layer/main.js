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

const layerGroup = new LayerGroup({
  //Open street maps
  layers:[
    new TileLayer({
      source:new OSM({
        url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      }),
      zIndex:0,
      visible:true,
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
      }),
      visible:false
    }),

    //ArcGig Image tile
    //Esri arc gis
    new TileLayer({
      source:new TileArcGis({
        url:'http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/MapServer'
      }),
      visible:false
    }),

    //TileWMSLayer
    //Open geospatial consortium - web map services
    new TileLayer({
      source: new TileWms({
        //https://nowcoast.noaa.gov/
        url:'https://nowcoast.noaa.gov/arcgis/services/nowcoast/analysis_meteohydro_sfc_qpe_time/MapServer/WMSServer',
        params:{
          //Imagery name identifier
          LAYERS:1,
          FORMAT:'image/png',
          TRANSPARENT:true
        }
      })
    })


  ]
})

map.addLayer(layerGroup);
map.on('click',(e)=>{
  console.log(e.coordinate);
})