var config = module.exports = {};

config.log = {
	appenders: {naver: {
		type:'dateFile',
		filename: '/home/khnam/apis/naver/naver.log',
		pattern: '-yyyy-MM-dd',
		alwaysIncludePattern: true
	}},
	categories: {default: {appenders: ['naver'], level: 'debug'}}
};