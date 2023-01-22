/*!
 * treeDiffer Namespace for treeDiffer.js
 *
 * Version 1.0.2
 * https://github.com/Tchanders/treeDiffer.js
 *
 * Released under the MIT license
 */

import { Differ } from "./treeDiffer.Differ";
import { Tree } from "./treeDiffer.Tree";
import { TreeNode } from "./treeDiffer.TreeNode";

// eslint-disable-next-line no-undef 
export const treeDiffer = {
    "Tree": Tree,
    "TreeNode": TreeNode,
    "Differ": Differ
};
export namespace treeDiffer {
    export type Tree = typeof Tree;
    export type TreeNode = typeof TreeNode;
    export type Differ = typeof Differ;
}
