// set layer type names
const layerTypeArr = ['keliai', 'skiriamosios', 'ribos', 'sankryzos'];

// pane for 'skiriamosios'
map.createPane(layerTypeArr[1]);
map.getPane(layerTypeArr[1]).style.zIndex = 450;

// import data and add parameters
function importData(layerType, layerVisual, mult) {
    let layer = L.geoJson(null, setParam(layerType, layerVisual, mult));
    $.getJSON("/geojson/vrkr_"+layerType+".geojson", jsonObject => {layer.addData(jsonObject)});
    return layer;
};

// set parameters for layers
function setParam(layerType, layerVisual, mult) {
    switch (layerType) {
        case layerTypeArr[0]:
            return {
                style: feature => stiliai(feature.properties, layerType, layerVisual, mult),
                onEachFeature: (feature, layer) => onEachFeature(feature.properties, layer)
            };
        case layerTypeArr[1]:
            return {
                style: feature => stiliai(feature.properties, layerType, layerVisual, mult),
                pane: layerTypeArr[1]
            };
        case layerTypeArr[2]:
            return {
                pointToLayer: (feature, latlng) => L.marker(latlng, stiliai(feature.properties, layerType, layerVisual, mult))
            };
        case layerTypeArr[3]:
            return {
                pointToLayer: (feature, latlng) => L.marker(latlng, stiliai(feature.properties, layerType, layerVisual, mult)),
                onEachFeature: (feature, layer) => onEachFeature(feature.properties, layer)
            };
    };
};

// import layers for each in the list layerTypeArr
function importLayers(layerVisual, size) {
    let n = 3, layerArr = [];

    // map values for size
    const sizeMap = new Map();
    sizeMap.set('normal', 2.5)
           .set('small', 1.8);

    // import data based on size
    if (size == 'normal') n = 4;
    for (let i=0; i < n; i++)
        layerArr.push(importData(layerTypeArr[i], layerVisual, sizeMap.get(size)));

    return layerArr;
}

// create array for all needed layers
var layers = Array.from(Array(2), () => Array(4));

layers[1][1] = L.layerGroup(importLayers('full', 'normal'));
layers[1][0] = L.layerGroup(importLayers('full', 'small')).addTo(map);

layers[0][1] = L.layerGroup(importLayers('minimal', 'normal'));
layers[0][0] = L.layerGroup(importLayers('minimal', 'small'));

// remove layer based on zoom level
map.on("zoom", () => {
    var zoomlevel = map.getZoom();
    if (zoomlevel <= 10) {
        if (map.hasLayer(layers[1][1])) switchLayer(layers[1],1,0);
        if (map.hasLayer(layers[0][1])) switchLayer(layers[0],1,0);
    };
    if (zoomlevel > 10) {
        if (map.hasLayer(layers[1][0])) switchLayer(layers[1],0,1);
        if (map.hasLayer(layers[0][0])) switchLayer(layers[0],0,1);
    };
});
