const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./Utils/geoCode');
const forecast = require('./Utils/forecast');

const app = express();

//define path for express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine','hbs');   //express looks for 'views' folder of main dir program folder by default
app.set('views', viewsPath);    //get express to look for 'templates' folder in provider path instead
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDir));

app.get('', (req,res) => {
    res.render('index', {
        title: 'weather ',
        name: "andrew",
    });
})

//app.com
//app.com/help
//app.com/about
//...

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About me',
        name: 'Andrew',
    });
});

app.get('/help', (req,res) => {
    res.render('help', {
        msg: 'this is a help message',
        title: 'Help',
        name: 'Andrew',
    });
});

app.get('/weather', (req,res) => {
    if (!req.query.address){
        return res.send({
            error: 'you must provide address',
        });
    }

    geoCode(req.query.address, (error,data) => {
        if (data)
        {
            forecast(data.latitude, data.longitude, (error, result) => {
                if (error)
                    return res.send({
                        error,
                    });

                res.send({
                    forecast: result,
                    location: data.location,
                    address: req.query.address,
                });
            });
        }
        else
            res.send({
                error   //same as error: error
            });
    });
});

//NOTE** cannont respond twice from server, only once (i.e. can NOT do res.send() twice in one function call that executes twice)
app.get('/products', (req,res) => {
    if (!req.query.search){
        return res.send({
            error: 'you must provide a search term',
        });
    }

    console.log(req.query);
    res.send({        
        products: []
    });
});

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: 'error 404',
        error: 'help article not found',
    });
});

app.get('*', (req,res) => {
    res.render('404', {
        title: 'error 404',
        error: 'page not found',
    });
});

app.listen(3000, () => {
    console.log('server is up on port 3000');
});

