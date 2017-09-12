var config = module.exports = {};

config.log = {
	appenders: {naver: {type:'console'}},
	categories: {default: {appenders: ['naver'], level: 'debug'}}
};