

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 10,
    maxZoom: 15,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

map.setView([54.8750, 23.9093], 10);

$.getJSON("/assets/geojson/vrkr_keliai.geojson", function (vrkr_keliai) {
    displayJSON(vrkr_keliai);
});

$.getJSON("/assets/geojson/vrkr_skiriamosios.geojson", function (vrkr_skiriamosios) {
    displayJSON(vrkr_skiriamosios);
});

$.getJSON("/assets/geojson/vrkr_sankryzos.geojson", function (vrkr_sankryzos) {
    displayJSON(vrkr_sankryzos);
});

function displayJSON(jsonObject) {
    L.geoJSON(jsonObject, {
        useSimpleStyle: true,
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.title);
        }
    }).addTo(map);
};