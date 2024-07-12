// leaflet map setup
var map = L.map('map');
map.setView([54.8750, 23.9093], 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 10,
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

setTimeout(() => {
    $.getJSON("https://cdn.jsdelivr.net/gh/kirstukas7/Zemelapis-Assets@main/geojson/vrkr_keliai.geojson", jsonObject => L.geoJson(jsonObject, {
            style: feature => stiliai_keliai(feature.properties.stage, feature.properties.lanes),
            onEachFeature: (feature, layer) => onEachFeature(feature, layer)
        }).addTo(map)
    );
}, 0);

setTimeout(() => {
    $.getJSON("https://cdn.jsdelivr.net/gh/kirstukas7/Zemelapis-Assets@main//geojson/vrkr_skiriamosios.geojson", jsonObject => L.geoJson(jsonObject, {
            style: feature => stiliai_skiriamosios(feature.properties.lanes),
            onEachFeature: (feature, layer) => onEachFeature(feature, layer)
        }).addTo(map)
    );
}, 100);

setTimeout(() => {
    $.getJSON("https://cdn.jsdelivr.net/gh/kirstukas7/Zemelapis-Assets@main//geojson/vrkr_ribos.geojson", jsonObject => L.geoJson(jsonObject, {
        pointToLayer: (feature, latlng) => L.marker(latlng, stiliai_ribos(feature.properties.lanes, feature.properties.angle))
        }).addTo(map)
    );
}, 200);

setTimeout(() => {
    $.getJSON("https://cdn.jsdelivr.net/gh/kirstukas7/Zemelapis-Assets@main//geojson/vrkr_sankryzos.geojson", jsonObject => L.geoJson(jsonObject, {
            pointToLayer: (feature, latlng) => L.marker(latlng, stiliai_sankryzos(feature.properties.stage, feature.properties.type, feature.properties.lanes)),
            onEachFeature: (feature, layer) => onEachFeature(feature, layer)
        }).addTo(map)
    );
}, 300);

function onEachFeature (feature, layer) {
    layer.bindPopup("<h3>"+feature.properties.title+"</h3>"+feature.properties.description);
};