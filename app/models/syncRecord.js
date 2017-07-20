
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SyncRecordSchema = new Schema({
    comment: String,
    createdAt: Date,
    updatedAt: Date
});

module.exports = mongoose.model('SyncRecord', SyncRecordSchema);
