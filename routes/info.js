var express  = require('express'),
	request	 = require('request'),
	nslookup = require('nslookup'),
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
	nslookup('hotplace.ddns.net')
	.server('8.8.8.8')
	.type('a')
	.timeout(10 * 1000)
	.end(function(err, addrs) {
		var address = null;
		if(err) {
			address = '106.253.61.59';
		}
		else {
			console.log(addrs)
			address = addrs[0];
		}
		
		res.render('myip', {address: address});
	});
	
});

module.exports = router;