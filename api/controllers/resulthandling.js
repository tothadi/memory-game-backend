var mongoose = require('mongoose');
var Result = mongoose.model('Result');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.retrieveOwn = function (req, res) {

    var user = req.body.username;
    
    console.log('Username: ', user);

    Result.find({username: user}).sort({ level: 1, time: 1 }).exec(function (err, result) {
        if (err) {
            console.log(err);
        } else {
            let results = JSON.stringify(result);
            res.status(200).json(results);
        }
    });
}

module.exports.retrieveTop = function (req, res) {

    Result.find({}).sort({ points: -1 }).limit(10).exec(function (err, result) {
        if (err) {
            console.log(err);
        } else {
            let results = JSON.stringify(result);
            res.status(200);
            res.json(results);
        }
    });
}

module.exports.result = function (req, res) {

    const newResult = new Result();
    newResult.time = req.body.time;
    newResult.username = req.body.username;
    newResult.date = req.body.date;
    newResult.level = req.body.level;
    newResult.points = req.body.points;
    newResult.save(function (err) {
        res.status(200);
        if (err) {
            res.json({
                'Save status': err
            });
        } else {
            res.json({
                'Save status': 'ok!'
            });
        }
    });

};