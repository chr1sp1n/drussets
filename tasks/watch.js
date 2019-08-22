'use strict';

const basePath = process.cwd();
const path = require('path');
const notifier = require('./notifier');
const gulp = require('gulp');
const { watch } = require('gulp');

module.exports = function(done){

	const config = require( path.join( basePath, '/drussets.config.json' ) );

	var folders = [ 
		path.join( basePath , config.js.src, '/**/*' ),
		path.join( basePath , config.css.src, '/**/*' ),
	]

	gulp.task('watching', function(done){
		notifier.log('Watching folder: ' + basePath);
		done();
	});

	const task = watch( 
		folders, 
		{}, 
		gulp.series(
			'public:dev',
			'watching'
		)
	)
	.on('ready', function() {		
		notifier.log('Watching folder: ' + basePath);
	})	
	.on('change', function( path, stats ) {
		console.clear();
		notifier.log('Changed file:  ' + path);		
	})
	.on('error', function(error){
		notifier.error('Watch error:  ' + error);		
		done();
	});

	return task;

}