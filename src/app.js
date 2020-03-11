const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define path for express config
const publicDirectoryPath = path.join(__dirname , "../public");
const viewsPath = path.join(__dirname , "../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

// Setup handlebar engine and views location
app.set("view engine","hbs");
app.set("views",viewsPath);
hbs.registerPartials(partialsPath);

// Static directory to serve
app.use(express.static(publicDirectoryPath));

// Routes
app.get("/",(req , res) => {
    res.render("index",{
        title : "Home Page.!",
        name : "Deep Shah"
    });
});

app.get("/about",(req , res) =>{
    res.render("about",{
        title : "About Page",
        name : "Deep Shah"
    })
});

app.get("/help",(req , res) => {
    res.render("help",{
        title : "Help Page",
        name : "Deep Shah",
        helpText : "This is some helpful text."
    })
})

app.get("/weather",(req,res) => {
    const address = req.query.address;
    if(!address){
        return res.send({
            error : "You have to provide query string address"
        })
    }

    geocode(address, (error , {longitude , latitude , location} = {})=>{
        if (error){
            return res.send({
                error
            });
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error){
                return res.send({
                    error
                });
            }
            res.send({
                location ,
                forecastData ,
                address
            })
        })
    })
})

app.get("/products",(req,res) => {
    console.log(req.query.search);
    if(!req.query.search){
        return res.send({
            error : "You have to provide query string search"
        })
    }
    res.send({
        products : []
    })
})

app.get("/help/*",(req,res) => {
    res.render("page404Error",{
        errorMessage: "Help article not found",
        name : "Deep Shah",
        title : "404"
    })
})

app.get("*",(req,res) => {
    res.render("page404Error",{
        errorMessage: "Page not found.",
        name : "Deep Shah",
        title : "404"
    })
});


app.listen(port,() => {
    console.log("Your application started..!!" + port);
});