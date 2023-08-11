export function isAsync(fn) {
	return Object.prototype.toString.call(fn) === "[object AsyncFunction]" ||
		fn.constructor.name === "AsyncFunction" ||
		/^async\s+function/.test(fn.toString());
};

export default isAsync;