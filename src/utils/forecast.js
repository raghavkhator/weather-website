const request=require('request')

const forecast=({latitude,longitude},callback)=>{
    const url='https://api.darksky.net/forecast/843fd9d556b3458fa2415b77bc12fb31/'+latitude+','+longitude+'?units=si'
    request({url,json:true},(err,{body})=>{ //destructured res to get body
        if(err){
            callback('Unable to connect to the server!',undefined)
        }else if(body.error){
            callback('Error finding Location!',undefined)
        }else{
           // console.log(body)
            callback(undefined,{rep: body.hourly.summary+' Its currently '+body.currently.temperature+' out there & there\'s '
             +body.currently.precipProbability+'% chance of rain.',
                high:body.daily.data[0].temperatureHigh,
                low:body.daily.data[0].temperatureLow
            })// \n Today\'s highest: '+body.daily.data[0].temperatureHigh+'\n Today\'s Lowest: '+body.daily.data[0].temperatureLow)
        }
    })
}

module.exports=forecast