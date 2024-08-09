// create base layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(map);

// set view by query (if present)
let searchParams = new URLSearchParams(document.location.search)
let param = searchParams.get("location");
if (param !== null) {
    var zoomlatlng = param.split('/');
    setTimeout(() => {
        sidebar.disablePanel('dalintis');
        map.flyTo([zoomlatlng[1], zoomlatlng[2]], zoomlatlng[0], {
            animate: true,
            duration: 2
        });
        setTimeout(() => {
            map.setZoom(zoomlatlng[0]);
            sidebar.enablePanel('dalintis');
        }, 2000);
    }, 300);
}

// link data
var linkKeliai = "/geojson/vrkr_keliai.geojson";
var linkSkiriamosios = "/geojson/vrkr_skiriamosios.geojson";
var linkRibos = "/geojson/vrkr_ribos.geojson";
var linkSankryzos = "/geojson/vrkr_sankryzos.geojson";

// create layers
var layerKeliai = L.geoJson(null, {
    style: feature => stiliai_keliai(feature.properties),
    onEachFeature: (feature, layer) => onEachFeature(feature.properties, layer)
});

map.createPane('skir');
map.getPane('skir').style.zIndex = 450;
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
layerSankryzos.addTo(map);

// remove layer based on zoom level
map.on("zoom", () => {
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
