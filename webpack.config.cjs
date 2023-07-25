const path = require("path");

module.exports = {
	entry: "./src/main.js",
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