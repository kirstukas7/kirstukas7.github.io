// pane and thickness
map.createPane('skir');
map.getPane('skir').style.zIndex = 450;
let mult = 2.5;

// import data, add data styling and binding
function importKeliai(mult) {
    let layer = L.geoJson(null, {
        style: feature => stiliai(feature.properties, 'keliai', mult),
        onEachFeature: (feature, layer) => onEachFeature(feature.properties, layer)
    });
    $.getJSON("/geojson/vrkr_keliai.geojson", jsonObject => {layer.addData(jsonObject)});
    return layer;
};

function importSkiriamosios(mult) {
    let layer = L.geoJson(null, {
        style: feature => stiliai(feature.properties, 'skiriamosios', mult),
        pane: "skir"
    });
    $.getJSON("/geojson/vrkr_skiriamosios.geojson", jsonObject => {layer.addData(jsonObject)});
    return layer;
};

function importRibos(mult) {
    let layer = L.geoJson(null, {
        pointToLayer: (feature, latlng) => L.marker(latlng, stiliai(feature.properties, 'ribos', mult))
    });
    $.getJSON("/geojson/vrkr_ribos.geojson", jsonObject => {layer.addData(jsonObject)});
    return layer;
};

function importSankryzos(mult) {
    let layer = L.geoJson(null, {
        pointToLayer: (feature, latlng) => L.marker(latlng, stiliai(feature.properties, 'sankryzos', mult)),
        onEachFeature: (feature, layer) => onEachFeature(feature.properties, layer)
    });
    $.getJSON("/geojson/vrkr_sankryzos.geojson", jsonObject => {layer.addData(jsonObject)});
    return layer;
};

var layerRegular = L.layerGroup([importKeliai(2.5), importSkiriamosios(2.5), importRibos(2.5), importSankryzos(2.5)]);
var layerMinimal = L.layerGroup([importKeliai(1.8), importSkiriamosios(1.8), importRibos(1.8)]).addTo(map);

// remove layer based on zoom level
map.on("zoom", () => {
    var zoomlevel = map.getZoom();
    console.log(zoomlevel);
    switch(true) {
        case zoomlevel <= 10:
            map.removeLayer(layerRegular);
            map.addLayer(layerMinimal);
            break;
        case zoomlevel > 10:
            map.removeLayer(layerMinimal);
            map.addLayer(layerRegular);
            break;
    };
});
