(function() {
    "use strict";

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let timeOfDay;

            if (h < 12) {
                timeOfDay = "EL";
            } else {
                timeOfDay = "PL";
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            if (h > 12) {
                h = h - 12;
            }

            if (h === 0) {
                h = 12;
            }

            c.innerHTML = h + ":" + m + ":" + s + " " + timeOfDay;
            
        };
        
    });
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let linn = document.getElementById("linn");
        let klr = document.getElementById("klr").checked;
        let atmt = document.getElementById("atmt").checked;

        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();

            return;
            
            
        } if (klr === false && atmt === false) {

            alert("Palun valige tarneviis nimekirjast");

            return;


        } else {

            let price;

            if (linn.value === "tln") {
                price = 0;
            } else if (linn.value === "trt") {
                price = 2.5;
            } else if (linn.value === "nrv") {
                price = 2.5;
            } else if (linn.value === "prn") {
                price = 3;
            }

            if (klr) {
                price = price + 5;
            } else if (atmt) {
                price = price + 1;
            }

            e.innerHTML = price + "&euro;";
            
        }        
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;

function GetMap() {
    
    "use strict";

    let centerPoint = new Microsoft.Maps.Location(
        58.8814812,
        25.5490265
        );

    let ulikool = new Microsoft.Maps.Location(
        58.38104,
        26.71992
    );
    let tln = new Microsoft.Maps.Location(
        59.442688,
        24.7531967
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 7,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
    let ulikoolPin = new Microsoft.Maps.Pushpin(ulikool, {
            title: 'Tartu Ülikool',
        });

    let tlnPin = new Microsoft.Maps.Pushpin(tln, {
        title: 'Tallinn',
    });

    ulikoolPin.metadata = {
        title: 'Tartu Ülikool',
        description: 'Tasemel ülikool'
    };

    map.entities.push(ulikoolPin);
    map.entities.push(tlnPin);

    Microsoft.Maps.Events.addHandler(ulikoolPin, 'click', ulikoolClicked);
    function ulikoolClicked(e) {
        if (e.target.metadata) {
            infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            });
        }
    }

}