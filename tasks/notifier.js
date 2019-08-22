const colors = require('colors');

module.exports = {
	success: function(message, done){
		console.log( '[' + colors.green('.OK.') + '] ' + message);
		if(done) done();	
	},
	log: function(message, done){
		console.log( '[' + colors.cyan('INFO') + '] ' + message);
		if(done) done();	
	},
	error: function(message, done){
		console.log( '[' + colors.red('ERRO') + '] ' + message);
		if(done) done();
	},
	warning: function(message, done){
		console.log( '[' + colors.yellow('WARN') + '] ' + message);
		if(done) done();
	}
}