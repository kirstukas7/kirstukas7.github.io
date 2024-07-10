var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 10,
    maxZoom: 15,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

map.setView([54.8750, 23.9093], 10);

var layerKeliai = new L.GeoJSON.AJAX("../assets/geojson/vrkr_keliai.geojson").addTo(map);
layerKeliai.useSimpleStyle();
var layerSkiriamosios = L.GeoJSON.AJAX("../assets/geojson/vrkr_skiriamosios.geojson").addTo(map);
layerSkiriamosios.useSimpleStyle();
var layerSankryzos = L.GeoJSON.AJAX("../assets/geojson/vrkr_sankryzos.geojson").addTo(map);
layerSankryzos.useSimpleStyle();