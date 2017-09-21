var express  = require('express'),
	request	 = require('request'),
	log4js	 = require('log4js');

var router   = express.Router();
var logger	 = log4js.getLogger('index.js');
var server   = null;

var options  = function(param) {
	return {
		url: 'https://openapi.naver.com/v1/map/reversegeocode.xml?encoding=utf-8&coordType=latlng&query=' + param.lat + ',' + param.lng,
		method: 'GET',
		headers : {
			'X-Naver-Client-Id': param.key,
			'X-Naver-Client-Secret': param.secret
		}
	}
};

router.use(function preProcess(req, res, next) {
	logger.debug('요청 URL : ', req.originalUrl);
	logger.debug('요청 METHOD : ', req.method);
	
	if(req.method == 'GET') {
		logger.debug('파라미터  query : ', req.query);
	}
	else {
		logger.debug('파라미터 params: ', req.params);
	}
	
    next();
});

router.get('/myip', function(req, res) {

	// Print the result
	res.render('myip', {address: server.address().address});
});

module.exports = function(_server) {
	console.log(_server)
	server = _server;
	return router;
}