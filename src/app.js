const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');

const geoCode = require('./utils/geoCode');
const forCast = require('./utils/forecast');

const publicDirectory = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

hbs.registerPartials(partialsPath);

app.set('view engine','hbs');
app.set('views',viewsPath);

app.use(express.static(publicDirectory));


app.get('',(req,res)=>{
    res.render('index',{
        title:'Home Page',
        name:'Anjana'
    });
})

app.get('/help',(req,res)=>{
    //app.use(express.static(path.join(publicDirectory,'/help.html')))
    //res.send('Help page')
    res.render('help',{
        title:'Help Page',
        helptext:'Please contact us help@handlebars.com',
        name:'Vinay'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Page',
        name:'Anjana'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.send({
            'error':'Please provide address'
        })
        return;
    }
    geoCode(req.query.address,(err,locationDetails)=>{
        if(err){
            res.send({
                error:err
            })
            return;
        }
        console.log(locationDetails.Latitude)
        forCast(locationDetails.Latitude,locationDetails.Longitude,(err,forecasteMessage)=>{
           if(err){
                res.send({
                    error:err
                })
                return;
            }
            res.send({
                title:'Weather Page',
                location:req.query.address,
                Temperature:forecasteMessage
            })
            console.log(forecasteMessage);
        })
        
    })

})

app.get('/help/*',(req,res)=>{
    res.render('pageNotFound',{
        text:'Help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('pageNotFound',{
        text:' 404 page'
    })
})
app.listen(3000,()=>{
    console.log('Server is up and running');
});