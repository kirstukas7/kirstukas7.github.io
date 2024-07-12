var mult = 2.75;

function stiliai_keliai(stage, lanes) {
    var color = '#bcbec0', width = 4*mult;
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

function stiliai_skiriamosios(lanes) {
    var color = '#ffffff', width = 2*mult;
    switch (lanes) {
        case "21": width = 1*mult; break;
        case "22G": case "33G": color = '#ffff96'; break;
        case "22H": case "33H": color = '#ffff00'; break;
    };
    return {"color": color, "weight": width};
};

function stiliai_sankryzos(stage, type, lanes) {
    var width = 7;
    switch(lanes) {
        case "11": width = 4; break;
        case "21": width = 5; break;
        case "22": case "22G": case "22H": width = 7; break;
        case "33": case "33G": case "33H": width = 9; break;
    };
    var icon = L.icon({
        iconUrl: "https://cdn.jsdelivr.net/gh/kirstukas7/Zemelapis-Assets@main/icons/"+type+"/"+stage+"_"+type+"_"+lanes+".svg",
        iconSize: [width*mult, width*mult]
    });
    return {icon: icon, keyboard: false};
};

export { stiliai_keliai, stiliai_skiriamosios, stiliai_sankryzos };