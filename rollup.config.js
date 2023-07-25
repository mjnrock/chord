import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
	input: "src/main.js",
	output: {
		file: "dist/main.js",
		format: "cjs", // Use "esm" if you want ES6 (ESM) format
	},
	plugins: [
		babel({
			exclude: "node_modules/**",
			presets: [ "@babel/preset-env", "@babel/preset-react" ]
		}),
		resolve(),
		commonjs(),
	],
};