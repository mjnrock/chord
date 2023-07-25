import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
	input: "src/main.js",
	output: {
		file: "dist/main.js",
		format: "esm",
	},
	plugins: [
		resolve(),
		commonjs(),  // Add this line
		babel({
			babelHelpers: "bundled",
			presets: [ "@babel/preset-env", "@babel/preset-react" ]
		}),
	],
};