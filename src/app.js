const path=require('path')
const express=require('express')
const hbs = require('hbs')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views') //if want to change views folder name
const partialPath=path.join(__dirname,'../templates/partials')

app.set('views',viewPath)
app.set('view engine','hbs') //set handlebars engine
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath)) //Setup stati directory to serve

app.get('',(req,res)=>{
    res.render('index',{
        title:'Home Page',
        name:'Raghav'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'raghav'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'raghav'
    })
})

app.get('/weather',(req,res)=>{
        if(!req.query.address){
            return res.send({
                error:'Address not provided!'
            })
        }
        else{
            geocode(req.query.address,(error,data)=>{
                if(error){
                    return res.send({
                        error
                    })
                }else{
                    forecast(data,(error,forecastData)=>{
                        if(error){
                            return res.send({
                                error
                            })
                        }else{
                            res.send({
                                forecastData,
                                location:data.location,
                                address:req.query.address
                            })
                        }
                    })
                }
            })
            
        }
})

app.get('/product',(req,res)=>{
    console.log(req.query)
    res.send({
        products:[] 
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        error:'Help article not found!',
        name:'Raghav'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        error:'Page Not Found!',
        name:'Raghav'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})