import Node from "../@node/Node";
import DataTable from "./DataTable";

/**
 * The Pipeline is effectively an domain-specific context
 * for which there is a network of Nodes, whose interaction
 * can be intermediated by the Pipeline.  Using this architecture,
 * you can create data flow pipelines, event pipelines, and
 * even a combination of the two.
 * 
 * By leveraging the /sources (which are data source helpers),
 * you can use the Pipeline to create ETL processes.
 * 
 * The size of a pipeline can be as small as a single node,
 * or as large as a network of nodes.  As a small example,
 * you could have a pipeline that is a single node that
 * mutates or transforms an input node's data via its
 * .next method.  As a larger example, you could have
 * a SQL Server data source and an in-memory version
 * to create a synchronization "active record" system.
 * By further introducing a web sockets or http node,
 * as well, you could create a real-time data synchronization
 * system.
 * 
 * The Pipeline is a Node, so it has all of the same
 * features as a Node, including the event system,
 * the effect system, and the ability to dispatch
 * actions, or update the state directly while still
 * invoking the event system for tracking.
 */
export class Pipeline extends Node {
	constructor ({ ...rest } = {}) {
		super({
			...rest,
		});
	}
}

export default Pipeline;