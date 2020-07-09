
const request = require('request');
const geoCode = (address,callback)=>{
    const url_map = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoicmFvYW5qYW5hMDE5IiwiYSI6ImNrYnRreWh3MDBiMDIyeXF6NWlkbnhmN2gifQ.Hk3MITFsIeE95PZ-jiVVww';
    request({url:url_map,JSON:true},(error,response)=>{
        const res = JSON.parse(response.body);
        if(error){
            callback('Network Error',undefined);
        }
        else if(res.features.length === 0){
            callback('Wrong Location',undefined);
        }else{
            callback(undefined,{
                Latitude: res.features[0].center[0],
                Longitude: res.features[0].center[1],
                x: true
            })
         }
    }
    )  
}

module.exports = geoCode;