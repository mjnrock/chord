import { EnumEntryType, Reader, Registry, Resolver, Transformer } from "../../src/@node/Registry.js";

// Simple registry for testing
const registry = Registry.New({
	"rootEntry": "Hello World",
});

Registry.addPool(registry, "rootPool");
Registry.addToPool(registry, "rootPool", Resolver.getIdByPath(registry, "$.rootEntry"));

Registry.setNamespace(registry, "ns1", {
	"ns1Entry": "Hello from ns1",
});


// These should be equivalent:
Registry.addPool(Resolver.getValueByPath(registry, "$.ns1"), "ns1Pool");
Registry.addToPool(Resolver.getValueByPath(registry, "$.ns1"), "ns1Pool", Resolver.getIdByPath(registry, "$.ns1.ns1Entry"));
// Registry.addPool(registry, "$.ns1.ns1Pool");
// Registry.addToPool(registry, "$.ns1.ns1Pool", "$.ns1.ns1Entry");


Registry.setNamespace(registry, "$.ns1.ns2", {
	"ns2Entry": "Hello from ns2",
});

console.log(JSON.stringify(registry, null, 2));

// Testing Resolver
// console.log("0:", Resolver.getValueByPath(registry, "$"));
// console.log("1:", Resolver.getValueByPath(registry, "$.rootEntry"));
// console.log("1a:", Resolver.getIdByPath(registry, "$.rootEntry"));
// console.log("1b:", Resolver.getIdByPath(registry, "$.ns1.ns2"));

// console.log("2:", Resolver.getByPath(registry, "$.ns1"));
// console.log("3:", Resolver.getByPath(registry, "$.ns1.ns1Entry"));
// console.log("4:", Resolver.getByPath(registry, "$.ns1.ns2"));
// console.log("5:", Resolver.getByPath(registry, "$.ns1.ns2.ns2Entry"));

// console.log("------------------------");

// // Testing Transformer
const flattened = Transformer.flatten(registry);
console.table(flattened);