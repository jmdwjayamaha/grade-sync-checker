var express = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var SyncRecord = require('./app/models/syncRecord.js');

// mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o');
mongoose.connect('mongodb://localhost:27017/sync-data');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

var router = express.Router();

router.route('/syncrecord')
    .get(function(req, res) {

        SyncRecord.find(function(err, syncRecords) {

            if (err)
                res.json(500, {"error": "Cannot retrieve records"});

            res.json(syncRecords);
        });
    })

    .post(function(req, res) {

        var syncRecord = new SyncRecord();
        syncRecord.comment = req.body.comment;
        syncRecord.createdAt = new Date();

        syncRecord.save(function(err) {

            if (err)
                res.json(500, {"error": "Cannot save the record"});

            res.json(201, syncRecord);
        });
    });

router.route('/syncrecord/:id')
    .get(function(req, res) {

        SyncRecord.findById(req.params.id, function(err, syncRecord) {

            if (err)
                res.json(404, {"error": "Cannot find the record"});

            res.json(syncRecord);
        });
    })

    .put(function(req, res) {

    })

    .delete(function(req, res) {

        SyncRecord.remove({_id: req.params.id}, function(err, syncRecord) {

            if (err)
                res.json(404, {"error": "Cannot delete the record"});

            res.send(204);
        });
    });

app.use('/api', router);
app.listen(port);