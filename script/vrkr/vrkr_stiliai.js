function stiliai(data, type, mult) {
    var color, width, lineCap = 'butt', icon, zIndexOffset, interactive = false;

    switch (type) {
        // keliai styling
        case 'keliai':
            color = '#bcbec0', width = 6;
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
            return {"color": color, "weight": width*mult, lineCap: lineCap};

        // skiriamosios styling
        case 'skiriamosios':
            color = '#ffffff', width = 2;
            switch (data.lanes) {
                case "21": width = 1; break;
                case "22G": case "33G": color = '#ffff96'; break;
                case "22H": case "33H": color = '#ffff00'; break;
            };
            return {"color": color, "weight": width*mult, lineCap: lineCap, interactive: false};

        // ribos styling
        case 'ribos':
            width = 6; 
            switch(data.lanes) {
                case "11": data.lanes = "21";
                case "21": width = 4; break;
                case "22": width = 6; break;
                case "33": width = 8; break;
            };
            var icon = L.icon({
                iconUrl: "/icons/ribos/riba_"+data.lanes+".svg",
                iconSize: [width*mult, width*mult]
            });
            return {icon: icon, keyboard: false, rotationAngle: data.angle, rotationOrigin: "center center", interactive: interactive};

        // sankryzos styling
        case 'sankryzos':
            width = 7;
            if (data.title !== undefined)
                interactive = true;
            switch(data.lanes) {
                case "11": width = 4; break;
                case "21": width = 5; break;
                case "22": width = 7; break;
                case "33": width = 9; break;
            };
            switch(data.type) {
                case "nuov": zIndexOffset = 20; break;
                case "xsan": zIndexOffset = 40; break;
                case "sankr": zIndexOffset = 60; break;
            };
            if (data.state === undefined)
                data.state = "";
            var icon = L.icon({
                iconUrl: "/icons/"+data.type+"/"+data.stage+"_"+data.type+"_"+data.lanes+data.state+".svg",
                iconSize: [width*mult, width*mult]
            });
            return {icon: icon, keyboard: false, zIndexOffset: zIndexOffset, interactive: interactive};
    }
};
