const gulp = require('gulp');

gulp.task("public:test", function(done){
  console.log("It works!");
  done();
});


module.exports = function(){
	var args = process.argv.slice(2);
	if(args.length == 1){
		if(gulp.task('public:' + args[0])){
			gulp.series('public:' + args[0])( err => {
				if(err) console.error(err);
			});
		}else{
			console.error('Error: Task ' + args[0] + ' not found.');
		}
	}else{
		console.log('Drussets - Assets Utility v1.0.0');
	}
}
