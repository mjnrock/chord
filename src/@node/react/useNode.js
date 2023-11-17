import { useState, useEffect } from "react";
import Node from "../Node";

export function useNode(node) {
	const [ state, setState ] = useState(node.state);
	const dispatch = (...args) => {
		const [ msg ] = args;

		if(typeof msg === "object") {
			node.dispatch(msg.type, msg.data);
		} else {
			node.dispatch(...args);
		}
	};
	const dispatchAsync = async (msg) => {
		const [ msg ] = args;

		if(typeof msg === "object") {
			await node.dispatchAsync(msg.type, msg.data);
		} else {
			await node.dispatchAsync(...args);
		}
	};

	useEffect(() => {
		const updateListener = (next) => {
			setState(next);
		};

		node.addEventListeners(Node.EventTypes.UPDATE, updateListener);
		return () => {
			node.removeEventListeners(Node.EventTypes.UPDATE, updateListener);
		};
	}, []);

	return {
		state,
		dispatch,
		dispatchAsync,
	};
};

export function useNodeEvent(node, event, callback) {
	useEffect(() => {
		node.addEventListeners(event, callback);
		return () => {
			node.removeEventListeners(event, callback);
		};
	}, []);

	return {
		emit: node.emit.bind(node, event),
		emitAsync: node.emitAsync.bind(node, event),
	};
};

export default {
	useNode,
	useNodeEvent,
};