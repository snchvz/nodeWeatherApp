const request = require('request');

const forecast = (lat, long, callback) =>
{
    const url = 'https://api.darksky.net/forecast/619016b9270faff470e1e45eca770189/' + long + ',' + lat;
    request({url, json: true}, (error, {body}) => {
        if(error) 
        {
            callback('unable to connect to forecast services', undefined); //the string is the error param in forecast anonymous function, data is undefined
        }
        else if(body.error)
        {
            callback('no locations found'); //providing no param for data is the same as explicitly stating undefined
        }
        else
        {
            hourlyData = [];

            for(i = 0; i <= 10; i++)
            {            
                hourlyData.push({temp: body.hourly.data[i].temperature, prec: body.hourly.data[i].precipProbability})
                i += 1;
            }

            callback(undefined, body.timezone + '\n' + body.daily.data[0].summary +"\nIt is currently " + body.currently.temperature +
            ", and there is a " + body.currently.precipProbability + "% chance of rain", hourlyData);
        }
    })
}

module.exports = forecast;