import { describe, expect, test } from '@jest/globals';
import rlangEngine from 'rlang-engine';
import path from 'node:path';
import type { Graph } from 'rlang-kernel';

const graph: Graph = rlangEngine(path.resolve(__dirname, '../test-rlang/index.rl'));

graph.setApp({});

graph.start();

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {});
});
