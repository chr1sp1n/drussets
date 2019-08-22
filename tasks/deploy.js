'use strict';

const basePath = process.cwd();
const path = require('path');
const notifier = require('./notifier');
const fileSync = require('gulp-file-sync');


const sync = function(src, dest){
	fileSync( src , dest, { 
		recursive: true,
		addFileCallback: function(fullPathSrc, fullPathDest){
			notifier.log('Added file: ' + fullPathDest);
		},
		deleteFileCallback: function(fullPathSrc, fullPathDest){
			notifier.log('Deleted file: ' + fullPathDest);
		},
		updateFileCallback: function(fullPathSrc, fullPathDest){
			notifier.log('Updated file: ' + fullPathDest);
		}
	});
}

module.exports = {
	dev: function(done) {
		const config = require( path.join( basePath, '/drussets.config.json' ) );
		const src = path.join( basePath, config.path.temp );
		const dest = path.join( basePath, config.path.dev );
		sync( src , dest );
		done();
	},
	dist: function(done) {
		const config = require( path.join( basePath, '/drussets.config.json' ) );
		const src = path.join( basePath, config.path.temp );
		const dest = path.join( basePath, config.path.dist );
		sync( src , dest );
		done();
	}
}