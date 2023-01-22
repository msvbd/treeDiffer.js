/*!
 * treeDiffer.Tree
 *
 * Released under the MIT license
 */

import { TreeNode } from "./treeDiffer.TreeNode";

interface TreeInterface<NodeType> {
    root: TreeNode<NodeType>;
    nodeClass: any;
    orderedNodes: TreeNode<NodeType>[];
    keyRoots: number[];
}
/**
 * Tree
 *
 * A group of TreeNodes connected by parent-child relationships in a tree
 * structure, along with certain properties that define the exact structure of the
 * tree: the node order, the keyroots, and the leftmost node of each node. (Terms
 * defined in: http://epubs.siam.org/doi/abs/10.1137/0218082?journalCode=smjcat)
 *
 * @class
 * @constructor
 *
 * @param {treeDiffer.TreeNode} node Root node of the tree
 * @param {Function} nodeClass Concrete subclass of treeDiffer.TreeNode
 * @param {Object} config Config options for nodeClass
 */
export class Tree<NodeType> implements TreeInterface<NodeType> {

    root: TreeNode<NodeType>;
    nodeClass: NodeType;
    orderedNodes: TreeNode<NodeType>[];
    keyRoots: number[];

    constructor(node : NodeType, nodeClass: typeof NodeType, config: object) {
        this.root = new nodeClass(node, config);
        this.nodeClass = nodeClass;
        this.orderedNodes = [];
        this.keyRoots = [];

        this.findKeyRootsAndOrderedNodes(node, config);
    }

    /**
     * Find the post-ordering of the tree nodes, the keyroots and the leftmost of each
     * node.
     *
     * @param {Object} node Root node in original tree
     * @param {Object} config Config options for nodeClass
     */
    findKeyRootsAndOrderedNodes(node: NodeType, config: object) {
        let leftmost: number,
            leftmostsToKeyRoots : number[] = [],
            tree = this;

        /**
         * Find the tree nodes in post-order, find the leftmost of each node, and store
         * the order and leftmost as properties of the nodes.
         *
         * @param {treeDiffer.TreeNode} treeNode Node currently being checked
         * @param {Array} orderedNodes Array to be populated with nodes in order
         */
        function postOrderNodes(treeNode : TreeNode<NodeType>, orderedNodes : TreeNode<NodeType>[]) {
            let i,
                ilen,
                childNode,
                children = treeNode.getOriginalNodeChildren();

            for (i = 0, ilen = children.length; i < ilen; i++) {
                // eslint-disable-next-line new-cap
                childNode = new tree.nodeClass(children[i], config);
                treeNode.addChild(childNode);
                postOrderNodes(childNode, orderedNodes);
            }

            // Record node order
            orderedNodes.push(treeNode);
            treeNode.index = orderedNodes.length - 1;

            // Record index of leftmost node
            // If this node is a leaf, it is its own leftmost
            treeNode.leftmost =
                treeNode.children.length === 0
                    ? treeNode.index
                    : treeNode.children[0].leftmost;

            // Update the key root corresponding to this leftmost
            // A keyroot is the higest indexed node with each leftmost
            leftmostsToKeyRoots[treeNode.leftmost] = treeNode.index;
        }

        // Store the nodes in order
        // this.root = new tree.nodeClass(node, config);
        this.orderedNodes = [];
        postOrderNodes(this.root, this.orderedNodes);

        // Store the key roots in order of node index
        for (leftmost in leftmostsToKeyRoots) {
            this.keyRoots.push(leftmostsToKeyRoots[leftmost]);
        }
        this.keyRoots.sort(function (a, b) {
            return a - b;
        });
    }

	/**
	 * Get all the descendants of a node
	 *
	 * @param {treeDiffer.TreeNode} node Node whose descendants to find
	 * @return {Array} Descendants of the node
	 */
	getNodeDescendants(node: TreeNode<NodeType>) {
		let descendants : TreeNode<NodeType>[] = [];

		function addDescendants(parentNode : TreeNode<NodeType>) : void {
			let i, ilen, childNode;
			for (i = 0, ilen = parentNode.children.length; i < ilen; i++) {
				childNode = parentNode.children[i];
				descendants.push(childNode);
				addDescendants(childNode);
			}
		}

		addDescendants(node);

		return descendants;
	}
}