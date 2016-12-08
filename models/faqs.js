var mongoose = require('mongoose');
var q = require('q');
var Schema = mongoose.Schema;
var categoryModel = require('./categories');

//defining schema for videos table
var faqSchema = new mongoose.Schema({
	  question: { type: String },
	  answer: { type: String },
	  category: { type: Schema.Types.ObjectId, ref: 'categories' }
});
var Faq = mongoose.model('faqs', faqSchema);
//Initlizing interface object of this model.
var faqsModel = {};

//Function to seed faqs data.
faqsModel.seed = function(){
	var faqs=Array();
	faqs.push({question: 'dcmmm 1', answer:'Cat 1 answer', user:1});
	faqs.push({question: 'dcmmm 2', answer:'Cat 2 answer', user:1});
	faqs.push({question: 'dcmm j 3', answer:'Cat 3 answer', user:1});
	
	Faq.collection.insert(faqs, function(err, faq) {
		if(err){
			console.log('error occured in populating database');	
			console.log(err);	
		} 
		else{
			console.log('faqs table populated.');	
		}	
	});
	
}
//create new faq
faqsModel.post = function(data){
	var results = q.defer();
	var new_faq = new Faq({ data });
	new_faq.question = data.question;
	new_faq.answer = data.answer;
	new_faq.category = data.category;
	var categoryid = data.category;
	new_faq.save(function (err,db) {
	  if (err) results.reject(err);
	  var catData = categoryModel.post(categoryid, new_faq._id);
	  catData.then(function(data){
		results.resolve(data);
	}, function(err){
		results.reject(err);
	});


	  results.resolve(db);
	});
	return results.promise;
}

faqsModel.get = function(){
	var results = q.defer();
	Faq.find().populate("category").exec(function(err, dbCategory) {
		if (err){
			results.reject(err);
		}

		results.resolve(dbCategory);
	});
	return results.promise;
}
module.exports =faqsModel;