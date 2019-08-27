'use strict';

const basePath = process.cwd();
const path = require('path');
const notifier = require('./notifier');
const { src, dest } = require('gulp');

module.exports = function(done){
	const config = require( path.join( basePath, '/drussets.config.json' ) );

	var files = [
		path.join( basePath, config.assets.path ) + '/**/*',
		path.join( basePath, config.css.src ) + '/**/*',
		path.join( basePath, config.js.src ) + '/**/*',
		'!' + path.join( basePath, config.css.src ) + '/**/*.scss',
		'!' + path.join( basePath, config.css.src ) + '/**/*.js'
	];

	var task = src( files )
		.pipe( dest( path.join( basePath, config.path.temp ) ) )
		.on('error', function(){
			notifier.log('CSS assets error.');
		})			
		.on('end', function(){
			notifier.log('CSS assets cloned.');		
		});

	return task;
}