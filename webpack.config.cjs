const path = require("path");

module.exports = {
	entry: "./src/main.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "main.js",
		library: "@lespantsfancy/chord",
		libraryTarget: "module",
		globalObject: "this",
		umdNamedDefine: true,
	},
	experiments: {
		outputModule: true,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [ "@babel/preset-env", "@babel/preset-react" ]
					}
				}
			}
		]
	},
	resolve: {
		extensions: [ ".jsx", ".js" ],
	},
};