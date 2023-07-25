import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
	input: './src/main.js',
	output: {
		file: './dist/main.js',
		format: 'esm',
	},
	plugins: [
		resolve(),
		commonjs(),
		babel({
			exclude: 'node_modules/**',
			presets: [ '@babel/preset-env', [ '@babel/preset-react', { "runtime": "automatic" } ] ],
		}),
	],
	external: [ 'react', 'uuid' ],
};