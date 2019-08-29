'use strict';

const basePath = process.cwd();
const path = require('path');
const notifier = require('./notifier');
const { src, dest } = require('gulp');

const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");


module.exports = {

	dev: function(done){
		const config = require( path.join( basePath, '/drussets.config.json' ) );

		var files = [
			path.join( basePath, config.css.src ) + '/**/*.css',
			path.join( basePath, config.css.src ) + '/**/*.sass',
			path.join( basePath, config.css.src ) + '/**/*.scss'
		];
		config.css.sass.exclude.forEach( element => {
			files.push( '!' + path.join( basePath, config.css.src, element ) );
		});

		var task = src( files, { sourcemaps: true, base: config.css.src } )
			.pipe(
				sass().on( 'error', function(error){
					notifier.error('SASS error: ' + error);
					fail = 'SASS';
					done();
				})
			)
			.pipe(
				postcss([
					autoprefixer(),
					//cssnano()
				])
			)
			.pipe(
				dest(  path.join( basePath, config.path.temp, config.assets.libraries ) , { sourcemaps: '.' } )
					.on('error', function(error){
						notifier.error('SASS error: ' + error);
						fail = 'SASS';
						done();
					})
			)
			.on('error', function(){
				notifier.error('SASS error.');
				fail = 'SASS';
				done();
			})
			.on('end', function(){
				notifier.log('SASS compiled.');
				done();
			});

		return task;

	},

	dist: function(done){
		const config = require( path.join( basePath, '/drussets.config.json' ) );

		var files = [
			path.join( basePath, config.css.src ) + '/**/*.css',
			path.join( basePath, config.css.src ) + '/**/*.sass',
			path.join( basePath, config.css.src ) + '/**/*.scss'
		];
		config.css.sass.exclude.forEach( element => {
			files.push( '!' + path.join( basePath, config.css.src, element ) );
		});

		var task = src( files, { sourcemaps: true, base: config.css.src } )
			.pipe(
				sass().on( 'error', function(error){
					notifier.error('SASS error: ' + error);
					fail = 'SASS';
          			done();
				})
			)
			.pipe(
				postcss([
					autoprefixer(),
					cssnano()
				])
			)
			.pipe(
				dest(  path.join( basePath, config.path.temp, config.assets.libraries ) , { sourcemaps: '.' } )
					.on('error', function(error){
						notifier.log('SASS error: ' + error);
						fail = 'SASS';
						done();
					})
			)
			.on('error', function(){
				notifier.log('SASS error.');
				fail = 'SASS';
				done();
			})
			.on('end', function(){
				notifier.log('SASS compiled.');
			});

		return task;

	}

}

