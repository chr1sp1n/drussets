const gulp = require('gulp');
const pathExists = require('path-exists');
const path = require('path');
const requireDir = require('require-dir');
const tasks = requireDir('./tasks');

// init
gulp.task("public:init", tasks.init.config);


// common tasks
gulp.task( "temp:clean", tasks.clean.clean );
gulp.task( "js:excluded", tasks.js.excluded );
gulp.task( "deploy:dev", tasks.deploy.dev );
gulp.task( "deploy:dist", tasks.deploy.dist );
gulp.task( "success", tasks.success );
gulp.task( "assets", tasks.assets );

// dev
gulp.task("js:dev", tasks.js.dev);
gulp.task("sass:dev", tasks.sass.dev);

gulp.task("public:dev", 
	gulp.series(
		'temp:clean',
		gulp.parallel(			
			'js:dev',
			'js:excluded',			
			'sass:dev',
			'assets'
		),
		'deploy:dev',
		'success'
	)
);

// dist
gulp.task("js:dist", tasks.js.dist);
gulp.task("sass:dist", tasks.sass.dist);
gulp.task("public:dist", 
	gulp.series(
		'temp:clean',
		gulp.parallel(			
			'js:dev',
			'js:excluded',			
			'sass:dist',
			'assets'
		),
		'deploy:dist',
		'success'
	)
);


// watch
gulp.task("public:watch", tasks.watch);



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
