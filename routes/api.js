var users = require('../controllers/users');
var categories = require('../controllers/categories');
var faqs = require('../controllers/faqs');
var helpers = require('../helpers/helperFunctions');

var routesAPI = function(app){
	//user routes
	app.post('/user/auth', users.auth);
	app.get('/user/logout', helpers.isAuthenticated, users.logout);

	//category routes
	app.get('/categories', categories.get);
	app.get('/category', helpers.isAuthenticated, categories.getOne);
	app.post('/category/ratings', helpers.isAuthenticated, categories.rate);
	app.post('/faq', helpers.isAuthenticated, faqs.post);
	app.get('/faqs', helpers.isAuthenticated, faqs.get);
}


module.exports = routesAPI;