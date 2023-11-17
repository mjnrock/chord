import { v4 as uuid } from "uuid";
import Node from "../@node/Node";

/**
 * Consistent with Node-parlance, any property key
 * in the state that is prefixed with a $ is considered
 * a meta property, and is not considered part of the
 * data, which instead can be accessed via the .data
 * property of the state.
 */
export const State = ({ data = [], ...meta } = {}) => {
	const headers = Object.keys(data?.[ 0 ]) ?? [];

	return {
		data,
		headers,
		$created: Date.now(),
		$updated: [ Date.now() ],
		...meta,
	};
};

export const Reducers = ({ ...args } = {}) => ({
	insert: (state, { data, meta = {} }) => {
		let next = [
			...state.data,
			data,
		];

		return {
			...state,
			data: next,
			$updated: [
				...state.$updated,
				Date.now(),
			],
			...meta,
		};
	},
});


/**
 * Within the ETL framework, a DataTable is a 
 * place to store data. It is a Node, thus giving
 * a Flux-like architecture to the data management
 * and a rich event system for both effects and
 * event systems.
 * 
 * For example, a Cat data-table might could be automatically
 * updated when an Animal data-table is updated, and the
 * Cat data-table could have an effect that meows when
 * the Cat data-table is updated.
 * 
 * By combining the power of the Node architecture
 * with the power of the DataTable, you can create
 * a powerful data management system, in an extremely
 * decoupled and modular way.
 * 
 * Additionally, since the methods are defined using
 * the flux system, you can easily extend/listen to
 * the DataTable using the effect broadcasting.
 */
export class DataTable extends Node {
	constructor ({ state = {}, reducers = {}, ...args } = {}) {
		super({
			state: {
				...State(),
				...state,
			},
			reducers: {
				...Reducers(),
				...reducers,
			},
			...args,
		});
	}

	get data() {
		return this.state.data;
	}
	get headers() {
		return this.state.headers;
	}

	insert(row, meta = {}) {
		return this.dispatch("insert", { data, meta });
	}

	asArrays() {
		const { data, headers } = this.state;
		const rows = [ headers ];

		let row = [];
		for(const header of headers) {
			row.push(data[ header ]);
		}

		rows.push(row);

		return rows;
	};
	asObjects() {
		const { data, headers } = this.state;
		const rows = [];

		for(const header of headers) {
			rows.push({
				[ header ]: data[ header ],
			});
		}

		return rows;
	};
};

export default DataTable;