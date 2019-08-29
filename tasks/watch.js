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
	]

	if( config.browser.sync ){
    	config.browser.config.files = [ config.path.dev ];
    	config.browser.config.logLevel = "silent";
		browserSync.init( config.browser.config );
	}

	gulp.task('watching', function(done){
		notifier.log('Watching folder: ' + basePath);
		done();
	});

	gulp.task('browser:sync', function(done){
		if( config.browser.sync ) {
			browserSync.reload();
		}
		notifier.log('Reload request sent to browsers.');
		done();
	});

	const task = watch(
		folders,
		{ cwd: __dirname },
		gulp.series(
			'public:dev',
			'browser:sync',
			'watching'
		)
	)
	.on('ready', function() {
		var wf = path.join(basePath, config.assets.path);
		notifier.log('Watching folder: ' + wf );
		done();
	})
	.on('change', function( path, stats ) {
    	//console.clear();
		if( config.browser.sync ) {
			browserSync.notify("Compiling, please wait!");
		}
		notifier.log('Changed file:  ' + path);
		done();
	})
	.on('error', function(error){
		if( config.browser.sync ) {
			browserSync.notify("Drussets error!");
		}
		notifier.error('Watch error:  ' + error);
		done();
	});

	return task;

}
