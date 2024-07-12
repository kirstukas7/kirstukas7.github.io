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
import { stiliai_keliai, stiliai_skiriamosios, stiliai_sankryzos } from './vrkr_stiliai.js';

setTimeout(function(){
    $.getJSON("https://cdn.jsdelivr.net/gh/kirstukas7/Zemelapis-Assets@main/geojson/vrkr_keliai.geojson", function (jsonObject) {
        L.geoJson(jsonObject, {
            style: function(feature) {
                return stiliai_keliai(feature.properties.stage, feature.properties.lanes);
            },
            onEachFeature: function(feature, layer) {
                layer.bindPopup("<h3>"+feature.properties.title+"</h3>"+feature.properties.description);
            }
        }).addTo(map);
    });
}, 100);

setTimeout(function(){
    $.getJSON("https://cdn.jsdelivr.net/gh/kirstukas7/Zemelapis-Assets@main/geojson/vrkr_skiriamosios.geojson", function (jsonObject) {
        L.geoJson(jsonObject, {
            style: function(feature) {
                return stiliai_skiriamosios(feature.properties.lanes);
            },
            onEachFeature: function(feature, layer) {
                layer.bindPopup("<h3>"+feature.properties.title+"</h3>"+feature.properties.description);
            }
        }).addTo(map);
    });
}, 200);

setTimeout(function(){
    $.getJSON("https://cdn.jsdelivr.net/gh/kirstukas7/Zemelapis-Assets@main/geojson/vrkr_sankryzos.geojson", function (jsonObject) {
        L.geoJson(jsonObject, {
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, stiliai_sankryzos(feature.properties.stage, feature.properties.type, feature.properties.lanes))
            },
            onEachFeature: function(feature, layer) {
                layer.bindPopup("<h3>"+feature.properties.title+"</h3>"+feature.properties.description);
            }
        }).addTo(map);
    });
}, 300);