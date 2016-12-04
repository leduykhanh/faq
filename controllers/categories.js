var categoryModel = require('../models/categories');

var categories = {};

// controller that handles category listings fetch request.
categories.get = function (req, res) {
	
	var skip = req.query.skip;
	var limit = req.query.limit;

	var categoriesData = categoryModel.get(skip, limit);
	categoriesData.then(function(data){
		var response = {};
		response.status='success';
		response.data=data;
		res.send(response);
	}, function(err){
		res.send(err);
	});

};

// controller that handles single category fetch request.
categories.getOne = function (req, res) {
	
	var categoryid = req.query.categoryId;

	var categoriesData = categoryModel.getOne(categoryid);
	categoriesData.then(function(data){
		var response = {};
		response.status='success';
		response.data=data;
		res.send(response);
	}, function(err){
		res.status(400);
		res.send(err);
	});
};

// controller that handles category rate request
categories.rate = function (req, res) {
	
	var categoryId = req.body.categoryId;
	var rating = req.body.rating;

	var categoriesData = categoryModel.rate(categoryId, rating);
	categoriesData.then(function(data){
		var response = {};
		response.status='success';
		response.data=data;
		res.send(response);
	}, function(err){
		res.status(400);
		res.send(err);
	});
		
};


module.exports = categories;