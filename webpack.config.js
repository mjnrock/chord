const path = require("path");

module.exports = {
	entry: "./main.js",  // Replace with the correct entry point for your project
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			}
		]
	},
	resolve: {
		extensions: [ "*", ".js", ".jsx" ]
	},
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
		libraryTarget: "umd"
	},
};