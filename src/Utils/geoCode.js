const request = require('request');

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieWFtZXJvIiwiYSI6ImNrMmN2eGE2ZzA1dHYzaG83cHgzNmtjZzgifQ.BHildFXmqOuLkSciusPoFA'
    request({url, json: true}, (error, {body}) => {
        if(error) 
        {
            callback('unable to connect to location services', undefined); //the string is the error param in geoCode anonymous function, data is undefined
        }
        else if(body.features.length == 0)
        {
            callback('no locations found'); //providing no param for data is the same as explicitly stating undefined
        }
        else
        {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name,
            });
        }
    })
}

module.exports = geoCode;