'use strict';
const notifier = require('./notifier');
const colors = require('colors');

module.exports = function(done){
	if(fail){
		notifier.error( colors.red(fail) + ' operations fail.');
	}else{
		notifier.success('All operations done.');
	}
	done();
}