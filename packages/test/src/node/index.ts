'use strict';
import requireRlang from '../../../engine/lib';
import path from 'path';

const graph = requireRlang(path.resolve(__dirname, '../../test-rlang/index.rl'));

graph.setApp({});

graph.start();
