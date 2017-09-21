var express  = require('express'),
	request	 = require('request'),
	log4js	 = require('log4js');

var router   = express.Router();
var logger		= log4js.getLogger('index.js')

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

router.get('/api/naverform', function(req, res) {
	res.render('naverform', {title:'네이버 전송폼'});
});

router.get('/api/naver', function(req, res) {
	var key = req.query.key,
		secret = req.query.secret
		lat	= req.query.lat,
		lng = req.query.lng;
	
	logger.debug('naver request');
	request(options({key:key, secret:secret, lat:lat, lng:lng}), function(error, response, body) {
		
		if(!error && response.statusCode == 200) {
			var info = res.send(body);
			res.send(info);
		}
		else {
			res.send(error);
		}
		
		logger.debug('naver response');
	});	
		
});

router.get('/api/myip', function(req, res) {

	// Print the result
	res.render('myip', {address: '106.253.61.59'});
});

module.exports = router;