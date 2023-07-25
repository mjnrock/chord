import { v4 as uuid, validate } from "uuid";
import Identity from "./Identity";

/*
 * @Schema = {
* 	[ <UUID> ]: <RegistryEntry>({
* 		type: EnumEntryType.VALUE,
* 		value: <any>
* 	}),
* 	[ Alias<string> ]: <RegistryEntry>({
* 		type: EnumEntryType.ALIAS,
* 		value: <UUID>
* 	}),
* 	[ Pool<string> ]: <RegistryEntry>({
* 		type: EnumEntryType.POOL,
* 		value: <UUID[]>
* 	}),
*	...
* };
*/

export const EnumEntryType = {
	ENTRY: 0,
	ALIAS: 1,
	POOL: 2,
};

export const RegistryEntry ={
	Next({ type, value, ...registry } = {}) {
		return {
			...registry,
			type,
			value,
		};
	},
	New({ type, value, ...rest } = {}) {
		return RegistryEntry.Next({
			type,
			value,
			...rest,
		});
	},
};

export const Registry = {
	Next(registry, entries = {}) {
		if(Array.isArray(entries)) {
			for(const entry of entries) {
				Registry.register(registry, entry);
			}
		} else if(typeof entries === "object") {
			for(const [ key, value ] of Object.entries(entries)) {
				let id = Registry.register(registry, value);
				Registry.addAlias(registry, id, key);
			}
		}

		return registry;
	},
	New(entries = {}) {
		return Registry.Next(Identity.New(), entries);
	},
	register(registry, entry, isIdentity = false) {
		let id = isIdentity || (typeof entry === "object" && entry.$id) ? entry.$id : uuid();

		if(!id) {
			return false;
		}

		registry[ id ] = RegistryEntry.New({
			type: EnumEntryType.ENTRY,
			value: entry,
		});

		return id;
	},
	unregister(registry, entryOrId) {
		let id = validate(entryOrId) ? entryOrId : entryOrId.$id;

		/* iterate over all keys: if id matches key, delete; if id matches value, delete; if value is an array and id is in array, removeFromPool (if pool is now empty, delete) */
		for(const [ key, value ] of Object.entries(registry)) {
			if(key === id) {
				delete registry[ key ];
			} else if(value.value === id) {
				delete registry[ key ];
			} else if(Array.isArray(value.value) && value.value.includes(id)) {
				Registry.removeFromPool(registry, key, id);
			}

			if(Array.isArray(value.value) && value.value.length === 0) {
				Registry.removePool(registry, key);
			}
		}

		return true;
	},

	addAlias(registry, id, ...aliases) {
		if(!(id in registry)) {
			return false;
		}


		for(const alias of aliases) {
			registry[ alias ] = RegistryEntry.New({
				type: EnumEntryType.ALIAS,
				value: id,
			});
		}

		return true;
	},
	removeAlias(registry, id, ...aliases) {
		if(!(id in registry)) {
			return false;
		}

		for(const alias of aliases) {
			delete registry[ alias ];
		}

		return true;
	},

	addPool(registry, name, ...ids) {
		registry[ name ] = RegistryEntry.New({
			type: EnumEntryType.POOL,
			value: ids,
		});
	},
	removePool(registry, name) {
		delete registry[ name ];
	},
	clearPool(registry, name) {
		registry[ name ].value = [];
	},

	addToPool(registry, name, ...ids) {
		if(!(name in registry)) {
			return false;
		}

		registry[ name ].value.push(...ids);

		return true;
	},
	removeFromPool(registry, name, ...ids) {
		if(!(name in registry)) {
			return false;
		}

		registry[ name ].value = registry[ name ].value.filter(id => !ids.includes(id));

		return true;
	},
};

export const Reader = {
	getByKey(registry, id) {
		if(!(id in registry)) {
			return;
		}

		return registry[ id ].value;
	},
	getByAlias(registry, alias, resolve = true) {
		if(!(alias in registry)) {
			return;
		}

		if(!resolve) {
			return registry[ alias ].value;
		}

		return registry[ registry[ alias ].value ].value;
	},
	getByPool(registry, name, resolve = true) {
		if(!(name in registry)) {
			return;
		}
		
		if(resolve) {
			return registry[ name ].value.map(id => registry[ id ].value);
		} else {
			return registry[ name ].value;
		}
	},
};

export const Writer = {
	setById(registry, id, value) {
		if(!(id in registry)) {
			return false;
		}

		registry[ id ].value = value;

		return true;
	},
	setByAlias(registry, alias, value) {
		if(!(alias in registry)) {
			return false;
		}

		registry[ registry[ alias ].value ].value = value;

		return true;
	},
};

export default {
	Registry,
	Reader,
	Writer,
};