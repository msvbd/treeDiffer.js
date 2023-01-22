/*!
 * treeDiffer.TreeNode
 *
 * Released under the MIT license
 */

/**
 * TreeNode
 *
 * Abstract TreeNode class for Trees to be diffed. It should be extended,
 * then a Tree should be built by passing the root node and the name of
 * the new class into the Tree constructor.
 *
 * @class
 * @constructor
 * @param {Object} node Object representing a node to be wrapped
 */
export abstract class TreeNode<NodeType> {

    node: NodeType;
    children: TreeNode<NodeType>[];
    parent: TreeNode<NodeType> | null = null;
    index: number = 0;
    leftmost: number = 0;

	constructor(node : NodeType) {
		/**
		 * @property {Object} node Object representing the wrapped node
		 */
		this.node = node;

		/**
		 * @property {treeDiffer.TreeNode[]} children Child nodes
		 */
		this.children = [];

		/**
		 * @property {number} index Index in node list ordered by deepest-first then document order
		 */
		this.index = 0;

		/**
		 * @property {number} leftmost Leftmost of this node; see treeDiffer.Tree
		 */
		this.leftmost = 0;
	}

	/**
	 * Add a node to the list of this node's children
	 *
	 * @param {treeDiffer.TreeNode} child
	 */
	addChild(child : TreeNode<NodeType>) {
		this.children.push(child);
		child.parent = this;
	}
	
	/**
	 * @method
	 * Check if another TreeNode is equal to this node. Conditions for equality
	 * will depend on the use case.
	 *
	 * @param {treeDiffer.TreeNode} other The other TreeNode
	 * @return {boolean} True if equal
	 */
	// isEqual(...args : any[]) : boolean {
	// 	return false;
	// }
	abstract isEqual(...args : any[]) : boolean;

	/**
	 * Get the children of the node that this tree node wraps. How to
	 * find and filter children will depend on the use case.
	 *
	 * @method
	 * @return {Object[]} Children of the wrapped node
	 */
	// getOriginalNodeChildren() : TreeNode<NodeType>[] {
	// 	return [];
	// }
	abstract getOriginalNodeChildren() : NodeType[];
}