import { Tags, Evaluator, Expression } from "../../src/@node/util/Tags.js";

let tags = new Tags(
	[ "cat", true ],
	[ "age", 26 ],
	[ "weight", 70 ],
	[ "names", [ "Alice", "Bob", "Charlie" ] ],
	[ "greeting", "Hello, world!" ],
	[ "fn", x => x % 2 === 0 ]
);

let evaluator = new Evaluator(tags, [
	"AND", [
		[ "EQ", "cat", true ],
		[ "OR", [
			[ "LTE", "age", 26 ],
			[ "GT", "weight", 50 ]
		] ],
		[ "IN", "names", "Alice" ],
		[ "REGEX", "greeting", "world" ],
		[ "FN", "fn", 4 ],
		[ "T", "cat" ],
		[ "F", "dog" ],
		[ "IsBoolean", "cat" ],
		[ "IsNumber", "age" ],
		[ "IsArray", "names" ],
	]
]);
// console.log(evaluator);
console.log(evaluator.evaluate());