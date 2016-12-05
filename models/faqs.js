var mongoose = require('mongoose');
var q = require('q');
var Schema = mongoose.Schema;

//defining schema for videos table
var faqSchema = new mongoose.Schema({
	  question: { type: String },
	  answer: { type: String },
	  category: { type: Schema.Types.ObjectId, ref: 'Category' }
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
	console.log(data);
	return results.promise;
}
module.exports =faqsModel;