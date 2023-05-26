const path = require('path');
		
	module.exports = {
			mode:"development",
			devtool:'eval-source-map',
			entry:'./src/index.js',
			output:{
			filename:'main.js',
			path:path.resolve(__dirname,'dist'),
			assetModuleFilename: 'main.js[query]',
			scriptType: 'text/javascript',
			publicPath: '/',
			},
			//for css loader (check docs for command)
			module:{
			rules:[
				{
					test:/\.css$/i,
					use:['style-loader','css-loader'],
				},
			],
		},
	};
	  