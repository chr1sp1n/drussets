const path = require('path');
const pathExists = require('path-exists');
const rename = require('gulp-rename');
const notifier = require('./notifier');
const { src, dest } = require('gulp');

var basePath = process.cwd();
var configPath = path.join( basePath );
var defaultConfigPath = path.join( __dirname, '../', 'default.config.json');


module.exports = {

	config: function(done){
		if( pathExists.sync( path.join( configPath, 'drussets.config.json' ) ) ){
			notifier.warning('Configuration file aready exists: ' + path.join( configPath, 'drussets.config.json' ));
			done();
			return;
		}
		return src( defaultConfigPath )
			.pipe( rename( 'drussets.config.json' ) )
			.pipe( dest( configPath ).on('error', function(){
				notifier.log('Configuration file creation fail (' + path.join( configPath, 'drussets.config.json' ) + ')');
				done(error);
				return;
			}))
			.on('error', function(){
				notifier.log('Configuration file creation fail (' + path.join( configPath, 'drussets.config.json' ) + ')');
				done(error);
				return;
			})
			.on('end', function(){
				notifier.log('Configuration file created in: ' + path.join( configPath, 'drussets.config.json' ));
				done();
			})
	}
}