/*!
 * treeDiffer Namespace for treeDiffer.js
 *
 * Version 1.0.2
 * https://github.com/Tchanders/treeDiffer.js
 *
 * Released under the MIT license
 */

import { Differ } from "./treeDiffer.Differ.js";
import { Tree } from "./treeDiffer.Tree.js";
import { TreeNode } from "./treeDiffer.TreeNode.js";

// eslint-disable-next-line no-undef
export const treeDiffer = {
    "Tree": Tree,
    "TreeNode": TreeNode,
    "Differ": Differ
};
