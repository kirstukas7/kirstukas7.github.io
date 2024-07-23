// leaflet map setup
var map = L.map('map');
map.setView([54.8750, 23.9093], 9);
map.createPane('skir');
map.getPane('skir').style.zIndex = 450;

// create base layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 9,
    maxZoom: 15,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(map);

// create sidebar
var sidebar = L.control.sidebar({
    container: 'sidebar',
    autopan: true
}).addTo(map);

// data styling reference
import { stiliai_keliai, stiliai_skiriamosios, stiliai_ribos, stiliai_sankryzos } from './vrkr_stiliai.js';

// link data
var linkKeliai = "https://raw.githubusercontent.com/kirstukas7/Zemelapis-Assets/main/geojson/vrkr_keliai.geojson";
var linkSkiriamosios = "https://raw.githubusercontent.com/kirstukas7/Zemelapis-Assets/main/geojson/vrkr_skiriamosios.geojson";
var linkRibos = "https://raw.githubusercontent.com/kirstukas7/Zemelapis-Assets/main/geojson/vrkr_ribos.geojson";
var linkSankryzos = "https://raw.githubusercontent.com/kirstukas7/Zemelapis-Assets/main/geojson/vrkr_sankryzos.geojson";

// create layers
var layerKeliai = L.geoJson(null, {
    style: feature => stiliai_keliai(feature.properties),
    onEachFeature: (feature, layer) => onEachFeature(feature.properties, layer)
});

var layerSkiriamosios = L.geoJson(null, {
    style: feature => stiliai_skiriamosios(feature.properties),
    pane: "skir"
});

var layerRibos = L.geoJson(null, {
    pointToLayer: (feature, latlng) => L.marker(latlng, stiliai_ribos(feature.properties))
});

var layerSankryzos = L.geoJson(null, {
    pointToLayer: (feature, latlng) => L.marker(latlng, stiliai_sankryzos(feature.properties)),
    onEachFeature: (feature, layer) => onEachFeature(feature.properties, layer)
});

// import data
$.getJSON(linkKeliai, jsonObject => {layerKeliai.addData(jsonObject)});
$.getJSON(linkSkiriamosios, jsonObject => {layerSkiriamosios.addData(jsonObject)});
$.getJSON(linkRibos, jsonObject => {layerRibos.addData(jsonObject)});
$.getJSON(linkSankryzos, jsonObject => {layerSankryzos.addData(jsonObject)});

// add layers to map
layerKeliai.addTo(map);
layerSkiriamosios.addTo(map);
layerRibos.addTo(map);
//layerSankryzos.addTo(map);

// remove layer based on zoom level
map.on("zoomend", function() {
    var zoomlevel = map.getZoom();
    if (zoomlevel <= 9)
        if (map.hasLayer(layerSankryzos))
            map.removeLayer(layerSankryzos);
    
    if (zoomlevel <= 8)
        if (map.hasLayer(layerRibos))
            map.removeLayer(layerRibos);
    
    if (zoomlevel >= 10)
        if (!map.hasLayer(layerSankryzos))
            map.addLayer(layerSankryzos);
    
    if (zoomlevel >= 9)
        if (!map.hasLayer(layerRibos))
            map.addLayer(layerRibos);
});
