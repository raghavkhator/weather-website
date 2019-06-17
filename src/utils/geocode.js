const request=require('request')
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicmFnaGF2a2hhdG9yIiwiYSI6ImNqd3g0Y2VkYzExMzY0OW1vdmZ5OXB4d2oifQ.Q1tFXwWotkO8BztCIYvffw'
    request({url,json:true},(error,{body})=>{ //can directly use url instead of url:url
        if(error){
            callback('Unable to connect to location services!',undefined)
        }else if(body.features.length===0){
            callback('Unable to find location, try different names',undefined)
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports=geocode