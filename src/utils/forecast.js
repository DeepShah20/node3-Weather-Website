const request = require("request");

const forecast = (lat , long , callback) => {
    const url = `https://api.darksky.net/forecast/3664c4a4f31f6657a2e0e5f4d06695aa/${long},${lat}?units=si`

    request({ url , json : true }, (error , response) =>{
        if(error){
            callback("Unable to connect to weather service.!",undefined);
        } else {
            if(response.body.currently === undefined){
                callback("Unable to find location",undefined)
            } else {
                const currentData = response.body.currently;
                callback(undefined , `${response.body.daily.data[0].summary} It is currently ${currentData.temperature} degree out. There is a ${currentData.precipProbability}% chance of rain.`)
            }
        }
    })
}

module.exports = forecast;