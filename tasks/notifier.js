module.exports = {
	log: function(message, done){
		console.log(message);
		if(done) done();	
	},
	error: function(message, done){
		console.error(message);
		if(done) done();
	},
	warning: function(message, done){
		console.error(message);
		if(done) done();
	}
}