'use strict';

const basePath = process.cwd();
const { src, dest } = require('gulp');
const colors = require('colors');
const notifier = require('./notifier');
const path = require('path');

module.exports = function(done){

	const config = require( path.join( basePath, '/drussets.config.json' ) );

	var libraries = config.js.libraries;
	Object.keys(libraries).forEach(function(library, index) {

	var files = [];
	libraries[library].forEach( function( file ){
		files.push( path.join( basePath, file ) );
	});

	var destFolder = path.join( basePath, config.path.temp, config.assets.libraries, library, 'js' );

	var task = src( files )
		.pipe(
		dest( destFolder )
			.on('error', function(){
				notifier.error('JavaScript library ' + colors.green(library) + ' error.');
				done();
			})
		)
		.on('error', function(){
			notifier.error('JavaScript library ' + colors.green(library) + ' error.');
			done();
		})
		.on('end', function(){
			notifier.log('JavaScript library ' + colors.green(library) + ' imported.');
			if(index == Object.keys(libraries).length - 1){
				done();
			}
		});
	});

}

