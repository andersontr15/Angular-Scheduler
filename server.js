var Model = require('./models/model.js');

var express = require('express');

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var db = 'localhost:mongodb/angular_scheduler';

mongoose.connect(db);

var morgan = require('morgan');

var app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true}));

var router = express.Router();

app.use(router);

router.get('/api/jobs', function(request, response){

	Model.find({}, function(err, jobs){
		if(err){
			response.status(404).send(err)
		}
		else {
			response.json(jobs)
		}
	})

});

router.post('/api/jobs', function(request, response){

	var jobs = new Model(request.body);


	

	jobs.save(function(err, job){
		if(err){
			response.status(500).send(err)
		}
		else {
			response.status(201).send(job)
		}
	})
});

router.delete('/api/jobs/:id', function(request, response){
	Model.remove({_id: request.params.id}, function(err){
		if(err){
			response.send(err)
		}
		else {
			response.send({message: 'Successfully deleted ' + request.params._id})
		}
	})
})



router.put('/api/jobs', function(request, response){
	console.log('in put');
	console.log(request.body._id);
	
	Model.findById(request.body._id, function(err, job){
		if(err){
			response.status(404).send(err)
		}
		else {
			job.update(request.body, function(err, success){
				if(err){
					response.send(err)
				}
				else {
					response.send({message: 'success'})
				}
			})
		}
	})

});

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

app.listen(3000, function() {
	console.log('Listening on port 3000');
})


