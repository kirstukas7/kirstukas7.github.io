// pane and thickness
map.createPane('skir');
map.getPane('skir').style.zIndex = 450;
let mult = 2.5;

// data array and styling
var layerData = [
    {
        link: "/geojson/vrkr_keliai.geojson",
        layerObj: L.geoJson(null, {
            style: feature => stiliai(feature.properties, 'keliai'),
            onEachFeature: (feature, layer) => onEachFeature(feature.properties, layer)
        })
    },
    {
        link: "/geojson/vrkr_skiriamosios.geojson",
        layerObj: L.geoJson(null, {
            style: feature => stiliai(feature.properties, 'skiriamosios'),
            pane: "skir"
        })
    },
    {
        link: "/geojson/vrkr_ribos.geojson",
        layerObj: L.geoJson(null, {
            pointToLayer: (feature, latlng) => L.marker(latlng, stiliai(feature.properties, 'ribos'))
        })
    },
    {
        link: "/geojson/vrkr_sankryzos.geojson",
        layerObj: L.geoJson(null, {
            pointToLayer: (feature, latlng) => L.marker(latlng, stiliai(feature.properties, 'sankryzos')),
            onEachFeature: (feature, layer) => onEachFeature(feature.properties, layer)
        })
    }
];

// import data and add to map
layerData.forEach(layer => {
    $.getJSON(layer.link, jsonObject => {layer.layerObj.addData(jsonObject)});
    layer.layerObj.addTo(map);
});

// remove layer based on zoom level
map.on("zoom", () => {
    var zoomlevel = map.getZoom();
    switch(true) {
        case zoomlevel <= 9:
            if (map.hasLayer(layerData[3].layerObj))
                map.removeLayer(layerData[3].layerObj);
            break;
        case zoomlevel >= 10:
            if (!map.hasLayer(layerData[3].layerObj))
                map.addLayer(layerData[3].layerObj);
            break;
    };
});
