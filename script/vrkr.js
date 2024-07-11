var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 10,
    maxZoom: 15,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

map.setView([54.8750, 23.9093], 10);

import { stiliai_keliai, stiliai_skiriamosios, stiliai_sankryzos } from './vrkr_stiliai.js';

loadJSON("keliai");
setTimeout(function(){
    loadJSON("skiriamosios"); 
}, 10);
setTimeout(function(){
    loadJSON("sankryzos");
}, 20);

function loadJSON(type) {
    var file = "https://raw.githubusercontent.com/kirstukas7/Zemelapis-Assets/main/geojson/vrkr_"+type+".geojson";
    $.getJSON(file, function (jsonObject) {
        L.geoJson(jsonObject, {
            style: function (feature) {
                switch (type) {
                    case "keliai": return stiliai_keliai(feature.properties.stage, feature.properties.lanes);
                    case "skiriamosios": return stiliai_skiriamosios(feature.properties.lanes, feature.properties.type);
                    case "sankryzos": return stiliai_sankryzos(feature.properties.type, feature.properties.stage, feature.properties.lanes);
                }
            },
            onEachFeature: function (feature, layer) {
                layer.bindPopup("<h3>"+feature.properties.title+"</h3>"+feature.properties.description);
            }
        }).addTo(map);
    });
};