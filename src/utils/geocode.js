const request = require("request");

const geocode = (address , callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGVlcHNoYWg2OTMwMiIsImEiOiJjazJ5Zmc1dWMwNmt4M2NzMTZ5MGN3MGJ0In0.lfewbXCfNREVv2fBgG3dug`;

    request({ url , json : true} , (error , response) => {
        if(response === undefined) {
            callback("Unable to connect to geocoding request.!",undefined);
        } else {
            if(response.body.features.length > 0) {
                callback(undefined , {
                    longitude : response.body.features[0].center[0],
                    latitude : response.body.features[0].center[1],
                    location : response.body.features[0].place_name
                })
            } else {
                callback("Location dosen't exits.",undefined);
            }
        }
    })
}

module.exports = geocode;