var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 10,
    maxZoom: 15,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

map.setView([54.8750, 23.9093], 10);

loadJSON("/assets/geojson/vrkr_keliai.geojson");
loadJSON("/assets/geojson/vrkr_skiriamosios.geojson");
loadJSON("/assets/geojson/vrkr_sankryzos.geojson");

function loadJSON(file) {
    $.getJSON(file, function (jsonObject) {
        L.geoJson.css(jsonObject, {
            onEachFeature: function (feature, layer) {
                layer.bindPopup(feature.properties.title);
            }
        }).addTo(map); 
    });
};