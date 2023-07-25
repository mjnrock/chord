import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
	input: './src/main.js',
	output: {
		file: 'dist/main.js',
		format: 'esm'
	},
	external: [ 'react' ], // <-- Here is where you define 'react' as an external dependency
	plugins: [
		resolve(),
		commonjs(),
		babel({ babelHelpers: 'bundled' }),
		terser()
	],
};