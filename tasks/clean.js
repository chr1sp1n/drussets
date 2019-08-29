'use strict';

const basePath = process.cwd();
const { src, dest } = require('gulp');
const path = require('path');
var clean = require('gulp-clean');
var notifier = require('./notifier');
const pathExists = require('path-exists');


module.exports = {
	clean: function(done){
		const config = require( path.join( basePath, '/drussets.config.json' ) );
		const tempPath = path.join( basePath, config.path.temp );

		if( !pathExists.sync( tempPath ) ){
			done();
			return;
		}

		var task = src( tempPath, { read: false } )
			.pipe(
				clean({force: true})
					.on('error',function(error){
						notifier.error('Clean error.' + "\n" + error);
						fail = 'CLEAN';
						done();
					})
			)
			.on('error', function(){
				notifier.error('Clean error.');
				fail = 'CLEAN';
				done();
			})
			.on('end', function(){
				notifier.log('Temp folder cleaned.');
				done();
			});

		return task;
	}
}