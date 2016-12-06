var mongoose = require('mongoose');
var q = require('q');
var Schema = mongoose.Schema;
//defining schema for categories table
var categorySchema = new mongoose.Schema({
	  name: { type: String }, 
	  description: { type: String }, 
	  user: {type: Schema.Types.ObjectId, ref: 'User'},
	  faqs: [{ type: Schema.Types.ObjectId, ref: 'Faq' }]
});
var Category = mongoose.model('categories', categorySchema);
//Initlizing interface object of this model.
var categoriesModel = {};

//Function to seed categories data.
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

//function to get single Category by its id.
categoriesModel.getOne = function(id){
	var results = q.defer();

	if(!id){
		results.reject({status:'error', error:'Category Id not supplied.'});
	}
	Category.findOne({_id:id},function(err, dbCategory) {
		if (err){
			results.reject(err);
		} 

		if(dbCategory){
			results.resolve(dbCategory);	
		} else{
			results.reject({status:'error', error:'Invalid Category Id supplied.'});	
		}
		
	});

	return results.promise;
	
}
categoriesModel.post = function(id, faq_id){
	var results = q.defer();

	if(!id){
		results.reject({status:'error', error:'Category Id not supplied.'});
	}
	Category.findOne({_id:id},function(err, dbCategory) {
		if (err){
			results.reject(err);
		}

		if(dbCategory){
			results.resolve(dbCategory);
			dbCategory.faqs.push(faq_id);
			dbCategory.markModified('array');
			dbCategory.save();
		} else{
			results.reject({status:'error', error:'Invalid Category Id supplied.'});
		}

	});

	return results.promise;

}
module.exports = categoriesModel;