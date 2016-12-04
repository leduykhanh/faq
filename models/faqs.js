var mongoose = require('mongoose');
var q = require('q');

//defining schema for videos table
var faqSchema = new mongoose.Schema({
	  name: { type: String }, 
	  description: { type: String }, 
	  category: { type: Number, ref: 'Category' }
});
var Faq = mongoose.model('faqs', faqSchema);