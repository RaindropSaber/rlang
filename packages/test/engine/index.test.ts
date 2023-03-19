import { describe, test } from '@jest/globals';
import path from 'node:path';
import rlangEngine from 'rlang-engine';
import type { Graph } from 'rlang-kernel';

const graph: Graph = rlangEngine(path.resolve(__dirname, '../test-rlang/index.rl'));

graph.setApp({});

graph.start();

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {});
});
