'use strict';

const basePath = process.cwd();
const gulp = require('gulp');
const path = require('path');
const babel = require('gulp-babel');
const notifier = require('./notifier');

const config = require( path.join( basePath, '/drussets.config.json' ) );

module.exports = {
	dev: function(done){
		console.log(config.path.dev);
		var task = gulp.src([
			'node_modules/babel-polyfill/dist/polyfill.js',
			path.join(basePath, config.path.js) + '/*.js'
		])
		.pipe( babel({presets: ['es2015']}) )
		// .pipe( gulp.dest( path.join(basePath, config.path.dev) ) )
		// .on('error', function(){
		// 	notifier.error('[ERRO] JavaSctript processor fail.');
		// 	done(error);
		// })
		// .on('end', function(){
		// 	notifier.log('[INFO]');			
		// });
		//return task;
	}
}
