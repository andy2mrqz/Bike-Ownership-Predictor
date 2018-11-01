var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Our CS260 Creative Project!' });
});

/* GET bike buyers prediction. */
router.get('/predict', function(req, res, next) {
    var apiKey = process.env.BIKE_API_KEY
    var options = require('./prediction-options.json');
    var maritalStatusNumeric = 0;
    var genderNumeric = 0;
    var income = 70000;
    var commuteDistanceNumeric = 1;
    var cars = 2;
    var age = 30;
    var purchaseBikeNumeric = 0;
    options["headers"]["Authorization"] = "Bearer " + apiKey;
    options["body"]["Inputs"]["input1"]["Values"] = [
        [
            maritalStatusNumeric.toString(),
            genderNumeric.toString(),
            income.toString(),
            commuteDistanceNumeric.toString(),
            cars.toString(),
            age.toString(),
            purchaseBikeNumeric.toString()
        ]
    ]
    
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(JSON.stringify(body));
    });
});

module.exports = router;
