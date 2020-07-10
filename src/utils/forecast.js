const request = require('request');

const forecast = (longitude,latitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=a3cb981444f12430eb4ceb1258945920&query='+latitude + ',' + longitude
    request({url:url},(error,response)=>{
        if(error){
            callback('Network Error',undefined);
        }else{
           const body = JSON.parse(response.body);
           callback(undefined,`Current temperature is ${body.current.temperature} but it feels like ${body.current.feelslike}.And humidity is ${body.current.humidity}`);
        }
        })

}

module.exports = forecast;