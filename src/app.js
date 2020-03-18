const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const port = process.env.PORT || 3000;

//  Define paths to express config
const publicDirectoryPath = path.join(__dirname, "../public/");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Artur"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Artur"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Me",
    name: "Artur",
    message: "Just some small text message"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an correct location"
    });
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({error});
    }

    forecast(latitude, longitude, (error, forecast) => {
      if (error) {
        return res.send({error});
      }
      res.send({forecast: forecast, location, adress: req.query.address});
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide search term"
    });
  }

  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "Help Article",
    name: "Artur",
    title: "Help 404"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Page",
    name: "Artur"
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
