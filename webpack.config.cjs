const path = require("path");

module.exports = {
	entry: "./src/main.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "main.js",
		library: "@lespantsfancy/chord",
		libraryTarget: "umd",
		globalObject: "this",
		umdNamedDefine: true,
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