var express = require('express');
var Influx = require('influx');
var config = require('./public/config');
var rpiDhtSensor = require('rpi-dht-sensor');
var fs = require('fs');
var ejs = require("ejs");

//Configuration de la base de donnes
var db = new Influx.InfluxDB({
  host: config.host,
  database: config.database,
  tags: config.tags
});

//Fonction de rendu de l'index (route /)



var Index = function(req, res) {
    queryData();
    res.render('index', {});
};

var dht = new rpiDhtSensor.DHT11(4);
var nbTry;

function readAddTemp() {
  var readout = dht.read();
  var temp = readout.temperature.toFixed(2);
  var hum = readout.humidity.toFixed(2);
  console.log(hum);

  if (hum != 0) {

    db.writePoints([{
      "measurement": "dht",

      "fields": {
        "temperature": temp,
        "humidity": hum,

      }
    }]);
  } else {
    nbTry = nbTry++;
    if (nbTry == 3) {
      read();
    } else {
      console.log('Erreur de lecture du sensor DHT');
    }
  }
}

var queryData = function() { //Base de données vers object javascript
  var query = db.query('select * from dht order by time desc limit 24').then(results => {

  var data = JSON.stringify({ results });

  fs.writeFile('./views/message.json', data, (err) => {
                if (err) throw err;
                console.log('DB ---> message.json');
            });

})};

exports.Index = Index;
exports.readAddTemp = readAddTemp;
exports.queryData = queryData;
