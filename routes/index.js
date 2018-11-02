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
    var maritalStatusNumeric = req.query['maritalStatusNumeric'];
    var genderNumeric = req.query['genderNumeric'];
    var income = req.query['income'];
    var commuteDistanceNumeric = req.query['commuteDistanceNumeric'];
    var cars = req.query['cars'];
    var age = req.query['age'];
    var purchaseBikeNumeric = 0;
    
    /*maritalStatusNumeric=1&genderNumeric=1&income=50000&commuteDistanceNumeric=5&cars=2&age=20&purchaseBikeNumeric=0 */
    
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
    }).pipe(res);
});

module.exports = router;
