import Node from "../Node";

import Registry from "../Registry";

/**
 * The basic idea here is that the MasterNode's `state` is a Registry.  The Registry
 * is first used as a lookup table for Nodes, but it can also be used to store other
 * data.  To help use cases pertaining to Nodes, use the `MasterNode.NodePoolName` to
 * get a list of registered Nodes, without needing to parse through the state.
 */
export class MasterNode extends Node {
	static NodePoolName = "nodes";

	constructor ({ state = {}, events = {}, reducers = {}, effects = {}, registry, id, tags = [], ...rest } = {}) {
		super({ events, effects, registry, id, tags, ...rest });

		this.state = Registry.Registry.New(state);
		Registry.Registry.addPool(this.state, MasterNode.NodePoolName);

		this.addReducers({
			...reducers,
		});
	}

	register(node) {
		if(node instanceof Node) {
			let next = { ...this.state };

			Registry.Registry.register(next, node);
			Registry.Registry.addToPool(next, MasterNode.NodePoolName, node.id);

			this.state = next;

			return true;
		} else {
			let regNodeEntry = this.lookup(node?.id);

			if(!regNodeEntry) {
				return false;
			}

			let regNode = regNodeEntry?.value;
			if(regNode instanceof Node) {
				let next = { ...this.state };

				Registry.Registry.register(next, regNode);
				Registry.Registry.addToPool(next, MasterNode.NodePoolName, regNode.id);

				this.state = next;

				return true;
			}
		}

		return false;
	}
	unregister(nodeId) {
		if(this.state[ nodeId ]) {
			let next = { ...this.state };

			Registry.Registry.unregister(next, nodeId);
			Registry.Registry.removeFromPool(next, MasterNode.NodePoolName, nodeId);

			return true;
		}

		return false;
	}

	send(nodeId, event, ...args) {
		if(!this.state[ nodeId ]) {
			return false;
		}

		const node = this.state[ nodeId ]?.value;
		if(node instanceof Node) {
			node.emit(event, ...args);

			return true;
		} else {
			let regNodeEntry = this.lookup(nodeId);

			if(!regNodeEntry) {
				return false;
			}

			let regNode = regNodeEntry.value;
			regNode.emit(event, ...args);

			return true;
		}

		return false;
	}
	async sendAsync(node, event, ...args) {
		return this.send(node, event, ...args);
	}
	broadcast(event, ...args) {
		const pool = Registry.Reader.getByPool(this.state, MasterNode.NodePoolName, false);

		let results = {};
		for(const nodeId of pool) {
			try {
				results[ nodeId ] = this.send(nodeId, event, ...args);
			} catch(e) {
				results[ nodeId ] = false;
			}
		}

		return results;
	}
	async broadcastAsync(event, ...args) {
		return this.broadcast(event, ...args);
	}
};

export default MasterNode;