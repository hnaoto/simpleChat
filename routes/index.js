var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.cookies.user == null){
		res.redirect('/signin');
	}else{
		res.render('index', {title : "Simple Chat"});
	}
});



router.get('/signin', function(req, res, next){
	res.render('signin');

});




router.post('/signin', function(req, res, next){

	var users = req.app.get('users_accounts');

	if (users[req.body.name] || req.body.name == null) {
		res.render('signin');
	}else {
		res.cookie("user", req.body.name, {maxAge: 1000*60*60*24*30});
		res.redirect('/');
	
	}
});

module.exports = router;
