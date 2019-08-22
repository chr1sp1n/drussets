'use strict';

const basePath = process.cwd();
const gulp = require('gulp');
const path = require('path');
const babel = require('gulp-babel');
const notifier = require('./notifier');

module.exports = {
	dev: function(done){
		const config = require( path.join( basePath, '/drussets.config.json' ) );

		var src = [ path.join( basePath, config.path.js ) + '/**/*.js' ];
		config.js.babel.exclude.forEach( element => {
			src.push( '!' + path.join( basePath, config.path.js, element ) );
		});
		var task = gulp.src( src )
			.pipe( babel(config.js.babel.config).on('error', function(error){
				notifier.error('[ERRO] JavaSctript processor fail.' + "\n" + error);
				done();
			}))
			.pipe( gulp.dest( path.join( basePath, config.path.dev ) ) )
			.on('end', function(){
				notifier.log('[INFO] JavaScript compiled.');		
			});

		return task;
	}
}
