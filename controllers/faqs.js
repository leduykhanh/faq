var faqModel = require('../models/faqs');

var faqs = {};

// controller that handles faq listings fetch request.
faqs.post = function (req, res) {
	
	var data = req.body;

	var faqsData = faqModel.post(data);
	faqsData.then(function(data){
		var response = {};
		response.status='success';
		response.data=data;
		res.send(response);
	}, function(err){
		res.send(err);
	});

};
module.exports = faqs;