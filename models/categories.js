var mongoose = require('mongoose');
var q = require('q');

//defining schema for videos table
var categorySchema = new mongoose.Schema({
	  name: { type: String }, 
	  description: { type: String }, 
	  user: {type: Number, ref: 'User'},
	  faqs: [{ type: Number, ref: 'Faq' }]
});
var Category = mongoose.model('videos', categorySchema);
//Initlizing interface object of this model.
var categoriesModel = {};

//Function to seed videos data.
categoriesModel.seed = function(){
	var categories=Array();
	categories.push({name: 'Cat 1', description:'Cat 1 description', user:1});
	categories.push({name: 'Cat 2', description:'Cat 2 description', user:1});
	categories.push({name: 'Cat 3', description:'Cat 3 description', user:1});
	
	Category.collection.insert(categories, function(err, category) {
		if(err){
			console.log('error occured in populating database');	
			console.log(err);	
		} 
		else{
			console.log('Categories table populated.');	
		}	
	});
	
}

//function to get Category listings
categoriesModel.get = function(skip, limit){
	var results = q.defer();

	skip = parseInt(skip) || 0;
	limit = parseInt(limit) || 10;

	Category.find(function(err, dbCategory) {
		if (err){
			results.reject(err);
		} 
		
		results.resolve(dbCategory);
	}).skip(skip).limit(limit);

	return results.promise;
	
}
module.exports = categoriesModel;