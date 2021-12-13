const path = require('path');
		
	module.exports = {
			mode:"development",
			entry:'./src/index.js',
			output:{
			filename:'main.js',
			path:path.resolve(__dirname,'dist'),
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
