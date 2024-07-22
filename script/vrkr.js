// leaflet map setup
var map = L.map('map');
map.setView([54.8750, 23.9093], 9);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 9,
    maxZoom: 15,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(map);

// sidebar creation
var sidebar = L.control.sidebar({
    container: 'sidebar',
    autopan: true
}).addTo(map);

// data styling
import { stiliai_keliai, stiliai_skiriamosios, stiliai_ribos, stiliai_sankryzos } from './vrkr_stiliai.js';

var linkKeliai = "https://raw.githubusercontent.com/kirstukas7/Zemelapis-Assets/main/geojson/vrkr_keliai.geojson";
var linkSkiriamosios = "https://raw.githubusercontent.com/kirstukas7/Zemelapis-Assets/main/geojson/vrkr_skiriamosios.geojson";
var linkRibos = "https://raw.githubusercontent.com/kirstukas7/Zemelapis-Assets/main/geojson/vrkr_ribos.geojson";
var linkSankryzos = "https://raw.githubusercontent.com/kirstukas7/Zemelapis-Assets/main/geojson/vrkr_sankryzos.geojson";

setTimeout(() => {
    $.getJSON(linkKeliai, jsonObject => {var layerKeliai = L.geoJson(jsonObject, {
            style: feature => stiliai_keliai(feature.properties),
            onEachFeature: (feature, layer) => onEachFeature(feature.properties, layer)
        }).addTo(map)}
    );
}, 0);

map.createPane('skir');
map.getPane('skir').style.zIndex = 450;
setTimeout(() => {
    $.getJSON(linkSkiriamosios, jsonObject => {var layerSkiriamosios = L.geoJson(jsonObject, {
            style: feature => stiliai_skiriamosios(feature.properties),
            pane: "skir"
        }).addTo(map)}
    );
}, 100);

setTimeout(() => {
    $.getJSON(linkRibos, jsonObject => {var layerRibos = L.geoJson(jsonObject, {
            pointToLayer: (feature, latlng) => L.marker(latlng, stiliai_ribos(feature.properties))
        }).addTo(map)}
    );
}, 200);

setTimeout(() => {
    $.getJSON(linkSankryzos, jsonObject => {var layerSankryzos = L.geoJson(jsonObject, {
            pointToLayer: (feature, latlng) => L.marker(latlng, stiliai_sankryzos(feature.properties)),
            onEachFeature: (feature, layer) => onEachFeature(feature.properties, layer)
        }).addTo(map)}
    );
}, 300);
