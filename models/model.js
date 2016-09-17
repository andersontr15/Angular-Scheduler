var mongoose = require('mongoose');

var Schema = mongoose.Schema();

var model = new mongoose.Schema({
	name: { type: String, required: true },
	dynos: { type: Number, required: true },
	frequency: { type: String, required: true },
	lastRun: { type: Date, required: true },
	scheduled: {type: Date, required: true }
});


module.exports = mongoose.model('Jobs', model);