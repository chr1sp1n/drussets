'use strict';

const basePath = process.cwd();
const path = require('path');
const notifier = require('./notifier');
const gulp = require('gulp');
const { watch } = require('gulp');
const browserSync = require('browser-sync').create();


module.exports = function(done){

	const config = require( path.join( basePath, '/drussets.config.json' ) );

	var folders = [
		path.join( basePath , config.assets.path, '/**/*' ),
		//path.join( basePath , config.css.src, '/**/*' ),
	]

	if( config.browser.sync ){
		config.browser.config.files = [ config.path.dev ];
		browserSync.init( config.browser.config );
	}

	gulp.task('watching', function(done){
		notifier.log('Watching folder: ' + basePath);
		done();
	});

	const task = watch(
		folders,
		{ cwd: __dirname },
		gulp.series(
			'public:dev',
			'watching'
		)
	)
	.on('ready', function() {
		notifier.log('Watching folder: ' + basePath);
		done();
	})
	.on('change', function( path, stats ) {
		console.clear();
		if( config.browser.sync ) browserSync.reload();
		notifier.log('Changed file:  ' + path);
		done();
	})
	.on('error', function(error){
		notifier.error('Watch error:  ' + error);
		done();
	});

	return task;

}