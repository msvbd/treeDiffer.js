/**
 * Example of how to diff two trees in 5 steps. NB this example depends
 * on the OOJS library for inheritance, but other implementations don't
 * have to.
 *
 * 1. Extend treeDiffer.TreeNode class to work with the real-world nodes
 * 2. Define isEqual and getOriginalNodeChildren methods for this class
 * 3. Make Trees, passing in the root nodes and the new class name
 * 4. Diff the Trees using the Differ
 * 5. Display the diffs
 */

import { treeDiffer } from "../../dist/treeDiffer.es.js";

// STEP 1

/**
 * Tree node for conducting a tree diff on DOM nodes.
 *
 * @class
 * @extends treeDiffer.TreeNode
 *
 * @constructor
 * @param {Node} node DOM node
 */
class DomTreeNode extends treeDiffer.TreeNode {
	constructor(node) {
		super(node);
	}

	/**
	 * Determine whether two tree nodes are equal. Here nodes are considered
	 * equal if they have the same tagName (if they are not text nodes), or
	 * have the same text content (if they are text nodes).
	 *
	 * @param {treeDiffer.TreeNode} otherNode The node to compare to this node
	 * @return {boolean} Nodes are equal
	 */
	isEqual(otherNode) {
		if (this.node.nodeType === Node.TEXT_NODE) {
			return otherNode.node.nodeType === Node.TEXT_NODE &&
				otherNode.node.textContent === this.node.textContent;
		} else {
			return otherNode.node.tagName === this.node.tagName;
		}
	}

	/**
	 * Gets children of the original node.
	 *
	 * @return {Array} Array of nodes the same type as the original node
	 */
	getOriginalNodeChildren() {
		let i, ilen, childNode,
			children = [],
			childNodes = this.node.childNodes;

		for (i = 0, ilen = childNodes.length; i < ilen; i++) {
			childNode = childNodes[i];
			if (!(childNode.nodeType === Node.TEXT_NODE && childNode.textContent.match(/^\s*$/))) {
				children.push(childNode);
			}
		}

		return children;
	}

	/**
	 * Find and display the diff between two HTML trees.
	 */
	static showExampleDiff() {
		let i, ilen, diff, tree1, tree2,
			treeInput1 = document.getElementsByClassName('treeInput1')[0],
			treeInput2 = document.getElementsByClassName('treeInput2')[0],
			diff1 = document.getElementsByClassName('diff1')[0],
			diff2 = document.getElementsByClassName('diff2')[0],
			root1 = document.createElement('div'),
			root2 = document.createElement('div');

		root1.innerHTML = treeInput1.value;
		root2.innerHTML = treeInput2.value;

		/**
		 * Add class to the DOM element, or wrapper span if it is a text node
		 *
		 * @param {Node} node DOM node that has been removed, inserted or changed
		 * @param {string} className Class to add
		 */
		function addClassToNode(node, className) {
			let span;
			if (node.nodeType === Node.TEXT_NODE) {
				span = document.createElement('span');
				span.className = className;
				span.textContent = node.textContent;
				node.parentNode.replaceChild(span, node);
			} else {
				node.className = className;
			}
		}

		// STEP 3

		tree1 = new treeDiffer.Tree(root1, DomTreeNode);
		tree2 = new treeDiffer.Tree(root2, DomTreeNode);

		// STEP 4

		//diff = new treeDiffer.Differ(tree1, tree2).diff();
		diff = new treeDiffer.Differ( tree1, tree2 ).transactions[ tree1.orderedNodes.length - 1 ][ tree2.orderedNodes.length - 1 ];

		// STEP 5

		for ( i = 0, ilen = diff.length; i < ilen; i++ ) {
			if ( diff[ i ][ 0 ] !== null && diff[ i ][ 1 ] !== null ) {
				addClassToNode( tree1.orderedNodes[ diff[ i ][ 0 ] ].node, 'change' );
				addClassToNode( tree2.orderedNodes[ diff[ i ][ 1 ] ].node, 'change' );
			} else if ( diff[ i ][ 0 ] ) {
				addClassToNode( tree1.orderedNodes[ diff[ i ][ 0 ] ].node, 'remove' );
			} else if ( diff[ i ][ 1 ] ) {
				addClassToNode( tree2.orderedNodes[ diff[ i ][ 1 ] ].node, 'insert' );
			}
		}
		diff1.innerHTML = '';
		diff2.innerHTML = '';
		diff1.appendChild( root1 );
		diff2.appendChild( root2 );
		// for (i = 0, ilen = diff.removed.length; i < ilen; i++) {
		// 	addClassToNode(diff.removed[i].node, 'removed');
		// }

		// for (i = 0, ilen = diff.inserted.length; i < ilen; i++) {
		// 	addClassToNode(diff.inserted[i].node, 'inserted');
		// }

		// for (i = 0, ilen = diff.changed.length; i < ilen; i++) {
		// 	addClassToNode(diff.changed[i].node, 'changed');
		// }

		// diff1.innerHTML = root1.innerHTML;
		// diff2.innerHTML = root2.innerHTML;
	}
}




DomTreeNode.showExampleDiff();

document.getElementsByClassName( 'update' )[ 0 ].addEventListener( 'click', function () {
	DomTreeNode.showExampleDiff();
} );
