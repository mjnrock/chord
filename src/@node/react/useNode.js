import { useState, useEffect } from "react";
import Node from "../Node";

export function useNode(node) {
	const [ state, setState ] = useState(node.state);
	const dispatch = (...args) => {
		const [ msg ] = args;

		/* Assume its an object-message, rather than an action-message */
		if(typeof msg === "object") {
			node.dispatch(msg.type, msg.data);
		} else {
			/* As an action name, assume it's a string */
			node.dispatch(...args);
		}
	};
	const dispatchAsync = async (...args) => {
		const [ msg ] = args;

		/* Assume its an object-message, rather than an action-message */
		if(typeof msg === "object") {
			await node.dispatchAsync(msg.type, msg.data);
		} else {
			/* As an action name, assume it's a string */
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