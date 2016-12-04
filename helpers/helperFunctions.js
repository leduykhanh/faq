var Users = require('../models/users');
var Faqs = require('../models/faqs');
var Categories = require('../models/categories');

var helpers = {};

//Function that checks if the request is authenticated or not.
helpers.isAuthenticated = function(req, res, next){

	if(!req.query.sessionId){
		res.status(401);
		res.send({status:'error',error:'Not Authorized.'});
	}
	else{
		var user = Users.getBySessionId(req.query.sessionId);	
		user.then(function(dbuser){
			if(dbuser){
				next();
			}else{
				res.status(401);
				res.send({status:'error',error:'Not Authorized.'});		
			}	
		});
		
	}
}

//Function to populate data in DB if DB is empty.
helpers.populateDb = function(){
	var promise = Users.get();
	promise.then(function(data){
		if(data.length){
			console.log('Users table already populated.');
		}
		else{
			console.log('Populating users table.');
			Users.seed();	
		}
	});

	var promise2 = Categories.get();
	promise2.then(function(data){
		
		if(data.length){
			console.log('categories table already populated.');
		}
		else{
			console.log('Populating categories table.');
			Categories.seed();	
		}
	});
}

module.exports = helpers;
