var mongoose = require('mongoose');

var Schema = mongoose.Schema();

var model = new mongoose.Schema({
	name: String,
	dynos: Number,
	frequency: String,
	lastRun: Date,
	scheduled: Date
});


module.exports = mongoose.model('Jobs', model);