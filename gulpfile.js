const gulp = require('gulp');
const pathExists = require('path-exists');
const path = require('path');
const requireDir = require('require-dir');
const tasks = requireDir('./tasks');

gulp.task("public:init", tasks.init.config);


gulp.task("js:dev", tasks.js.dev);
gulp.task("public:dev", 
	gulp.series(
		'js:dev'		
	)
);

var checkConfig = function(){
	var basePath = process.cwd();
	var assetsConfigPath = path.join( basePath, 'drussets.config.json');
	if( pathExists.sync( assetsConfigPath ) ){
		console.log('Using config file: ' + assetsConfigPath);
		return true;		
	}else{		
		console.log('Config file not found (' + assetsConfigPath + '). Use init task to create it.');	
	}	
	return false;
}

module.exports = function(){
	var args = process.argv.slice(2);
	if(args.length == 1){
		if(args[0] !== 'init') {
			if(!checkConfig()) return;
		}
		if( gulp.task('public:' + args[0]) ){
			gulp.series('public:' + args[0])( err => {
				if(err) console.error(err);
			});
		}else{
			console.error('Error: Task ' + args[0] + ' not found.');
		}
	}else{
		checkConfig();
		console.log('Drussets - Assets Utility v1.0.0');
	}
}
