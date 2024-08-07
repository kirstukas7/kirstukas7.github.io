var mult = 2.75;

function stiliai_keliai(data) {
    var color = '#bcbec0', width = 6;
    switch (data.stage) {
        case "priesprojektinis": color = '#ff00c5'; break;
        case "projektuojamas": color = '#00c5ff'; break;
        case "konkursas": color = '#ffaa00'; break;
        case "darbai": color = '#ff0000'; break;
        case "veikiantis": color = '#38a800'; break;
    };
    switch (data.lanes) {
        case "11": width = 2; break;
        case "03": width = 3; break;
        case "21": case "04": width = 4; break;
        case "22": width = 6; break;
        case "33": width = 8; break;
    };
    return {"color": color, "weight": width*mult, lineCap: "butt"};
};

function stiliai_skiriamosios(data) {
    var color = '#ffffff', width = 2;
    switch (data.lanes) {
        case "21": width = 1; break;
        case "22G": case "33G": color = '#ffff96'; break;
        case "22H": case "33H": color = '#ffff00'; break;
    };
    return {"color": color, "weight": width*mult, lineCap: "butt", interactive: false};
};

function stiliai_ribos(data) {
    var width = 6; 
    switch(data.lanes) {
        case "11": width = 3; break;
        case "21": width = 4; break;
        case "22": width = 6; break;
        case "33": width = 8; break;
    };
    var icon = L.icon({
        iconUrl: "https://raw.githubusercontent.com/kirstukas7/Zemelapis-Assets/main/icons/ribos/riba_"+data.lanes+".svg",
        iconSize: [width*mult, width*mult]
    });
    return {icon: icon, keyboard: false, rotationAngle: data.angle, rotationOrigin: "center center", interactive: false};
};

function stiliai_sankryzos(data) {
    var width = 7, zIndexOffset, interactive = false;
    if (data.title !== undefined)
        interactive = true;
    switch(data.lanes) {
        case "11": width = 4; break;
        case "21": width = 5; break;
        case "22": case "22G": case "22H": width = 7; break;
        case "33": case "33G": case "33H": width = 9; break;
    };
    switch(data.type) {
        case "nuov": zIndexOffset = 20; break;
        case "xsan": zIndexOffset = 40; break;
        case "sankr": zIndexOffset = 60; break;
    }
    var icon = L.icon({
        iconUrl: "https://raw.githubusercontent.com/kirstukas7/Zemelapis-Assets/main/icons/"+data.type+"/"+data.stage+"_"+data.type+"_"+data.lanes+".svg",
        iconSize: [width*mult, width*mult]
    });
    return {icon: icon, keyboard: false, zIndexOffset: zIndexOffset, interactive: interactive};
};
