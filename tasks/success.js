const notifier = require('./notifier');

module.exports = function(done){
	notifier.success('All operations done.');
	done();
}