# treeDiffer

Typescipt version of [Tchanders/treeDiffer.js](https://github.com/Tchanders/treeDiffer.js)

## changes over original

* uses vite
* src is in typescript
* contains js demo and ts demo

---
**Here is the original README content:**

A JavaScript library for diffing trees in the browser, implementing the algorithm outlined in: <http://epubs.siam.org/doi/abs/10.1137/0218082?journalCode=smjcat>

This library forms the basis for visual diffs in Wikimedia's [visual editor](https://github.com/wikimedia/VisualEditor).

treeDiffer finds the minimum transactions to get from the first tree to the second tree. Nodes in each tree are labelled in [post order](https://en.wikipedia.org/wiki/Tree_traversal), starting from 0. Each transaction is of the form [nodeToRemove, nodeToInsert], where nodeToRemove or nodeToInsert (but not both) can be null. E.g:

* `[1, null]` indicates that node 1 was removed from the first tree
* `[null, 2]` indicates that node 2 was inserted into the second tree
* `[3, 4]` indicates that node 3 in the first tree was changed into node 4 in the second tree

The only allowed transactions are insert, remove and change; a move would be captured by a remove and an insert. See the above paper for more details.

## Usage

Trees can be made of any type of node, as long as the nodes are connected in a [tree structure](https://en.wikipedia.org/wiki/Tree_%28data_structure%29).

The abstract treeDiffer.treeNode class should be extended to work with the specific node type.

## Demo

Using treeDiffer to diff HTML: <https://tchanders.github.io/treeDiffer.js/>
