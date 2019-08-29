'use strict';

const basePath = process.cwd();
const path = require('path');
const babel = require('gulp-babel');
const notifier = require('./notifier');
//const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const { src, dest } = require('gulp');


module.exports = {

	dev: function(done){
		const config = require( path.join( basePath, '/drussets.config.json' ) );

		var files = [ path.join( basePath, config.js.src ) + '/**/*.js' ];
		config.js.babel.exclude.forEach( element => {
			files.push( '!' + path.join( basePath, config.js.src, element ) );
		});

		var task = src( files, { sourcemaps: true, base: config.js.src } )
			//.pipe(sourcemaps.init())
			.pipe( babel(config.js.babel.config).on('error', function(error){
				notifier.error('JavaSctript processor fail.' + "\n" + error);
				fail = 'JS';
				done();
			}))
			//.pipe( sourcemaps.write('.') )
			.pipe(
				dest( path.join( basePath, config.path.temp, config.assets.libraries ), { sourcemaps: '.' } )
					.on('error', function(){
						notifier.error('JavaSctript processor fail.' + "\n" + error);
						fail = 'JS';
						done();
					})
			)
			.on('error', function(){
				notifier.log('JavaScript error.');
				fail = 'JS';
				done();
			})
			.on('end', function(){
				notifier.log('JavaScript compiled.');
			});

		return task;
	},

	dist: function(done){
		const config = require( path.join( basePath, '/drussets.config.json' ) );

		var files = [ path.join( basePath, config.js.src ) + '/**/*.js' ];
		config.js.babel.exclude.forEach( element => {
			files.push( '!' + path.join( basePath, config.js.src, element ) );
		});

		var task = src( files, { base: config.js.src } )
			.pipe( babel(config.js.babel.config).on('error', function(error){
				notifier.error('JavaSctript processor fail.' + "\n" + error);
				fail = 'JS';
				done();
			}))
			.pipe( uglify() )
			.pipe(
				dest( path.join( basePath, config.path.temp, config.assets.libraries ) )
					.on('error', function(){
						notifier.error('JavaSctript processor fail.' + "\n" + error);
						fail = 'JS';
						done();
					})
			)
			.on('error', function(){
				notifier.log('JavaScript error.');
				fail = 'JS';
				done();
			})
			.on('end', function(){
				notifier.log('JavaScript compiled.');
			});

		return task;
	},

	excluded: function(done){
		const config = require( path.join( basePath, '/drussets.config.json' ) );

		var files = [ '!' + path.join( basePath, config.js.src ) + '/**/*.js' ];
		config.js.babel.exclude.forEach( element => {
			files.push( path.join( basePath, config.js.src, element ) );
		});

    var task = src( files, { base: config.js.src, base: config.js.src } )
			.pipe(
				dest( path.join( basePath, config.path.temp, config.assets.libraries ) )
					.on('error', function(){
						notifier.log('JavaScript error.');
						fail = 'JS';
						done();
					})
			)
			.on('end', function(){
				notifier.log('JavaScript moved.');
			});

		return task;
  }

}
