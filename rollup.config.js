import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
	input: "src/main.js",
	output: {
		file: "dist/main.js",
		format: "esm", // Use "esm" to output ES modules that are compatible with browser and latest Node.js versions
	},
    external: [ "react", "react-dom" ], // add this line
	plugins: [
		babel({
			exclude: "node_modules/**",
			presets: [ "@babel/preset-env", "@babel/preset-react" ]
		}),
		resolve(),
		commonjs(),
	],
};