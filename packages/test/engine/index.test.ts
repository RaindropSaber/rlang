import rlangEngine from "rlang-engine";
import path from "path";
import type { Graph } from "rlang-kernel";

const graph: Graph = rlangEngine("../test-rlang/index.rl");

graph.setApp({});

graph.start();

// describe('sum module', () => {
//   test('adds 1 + 2 to equal 3', () => {});
// });
