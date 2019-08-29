'use strict';

const basePath = process.cwd();
const path = require('path');
const notifier = require('./notifier');
const { src, dest } = require('gulp');

module.exports = function(done){
	const config = require( path.join( basePath, '/drussets.config.json' ) );

	var files = [
		path.join( basePath, config.assets.path ) + '/**/*',
		//'!' + path.join( basePath, config.assets.path, config.assets.libraries ) + '/**/*',
		'!' + path.join( basePath, config.assets.path ) + '/**/js/*',
		'!' + path.join( basePath, config.assets.path ) + '/**/css/*',
		'!' + path.join( basePath, config.assets.path ) + '/**/js/*.js',
		'!' + path.join( basePath, config.assets.path ) + '/**/css/*.scss',
	];

	var task = src( files )
		.pipe(
			dest( path.join( basePath, config.path.temp ) )
				.on('error', function(){
					notifier.error('Assets error.');
					fail = 'ASSETS';
					done();
				})
		)
		.on('error', function(){
			notifier.error('Assets error.');
			fail = 'ASSETS';
			done();
		})
		.on('end', function(){
			notifier.log('Assets cloned.');
		});

	return task;
}
