import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

export default {
	input: 'src/main.js',
	output: [
		{
			file: pkg.main,
			format: 'cjs',
			exports: 'named',
			sourcemap: true,
		},
		{
			file: pkg.module,
			format: 'es',
			exports: 'named',
			sourcemap: true,
		},
	],
	plugins: [
		babel({
			exclude: 'node_modules/**',
			presets: [
				'@babel/preset-env',
				[ '@babel/preset-react', { runtime: 'automatic' } ],
			],
		}),
		resolve(),
		commonjs(),
	],
	external: [ 'react', 'react-dom' ],
};