var mult = 1.75;

function stiliai_keliai(stage, lanes) {
    var color, width;
    switch (stage) {
        case "priesprojektinis": color = '#ff00c5'; break;
        case "projektuojamas": color = '#00c5ff'; break;
        case "konkursas": color = '#ffaa00'; break;
        case "darbai": color = '#ff0000'; break;
        case "veikiantis": color = '#38a800'; break;
    };
    switch (lanes) {
        case "11": width = 2*mult; break;
        case "21": width = 4*mult; break;
        case "22": width = 6*mult; break;
        case "33": width = 8*mult; break;
    };
    return {"color": color, "weight": width};
};

function stiliai_skiriamosios(lanes, type) {
    var color, width;
    switch (lanes) {
        case "21": width = 1*mult; break;
        case "22":
        case "33": width = 2*mult; break;
    };
    switch (type) {
        case "": color = '#ffffff'; break;
        case "G": color = '#ffff96'; break;
        case "H": color = '#ffff00'; break;
    };
    return {"color": color, "weight": width};
};

function stiliai_sankryzos(type, stage, lanes) {

};

export { stiliai_keliai, stiliai_skiriamosios, stiliai_sankryzos };