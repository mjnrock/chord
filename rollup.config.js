import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

export default {
	input: "./src/main.js",
	output: {
		file: "dist/main.js",
		format: "esm"
	},
	external: [ "react" ], // <-- Still treat React as an external dependency
	plugins: [
		resolve(),
		commonjs(),
		babel({
			babelHelpers: "bundled",
			extensions: [ ".js", ".jsx" ] // <-- This tells Babel to process JSX files
		}),
		terser()
	],
};