import { Graph } from "rlang-kernel";
const ast = {
  nodes: [
    {
      id: "195a709d-f8db-4847-bce5-77ae3619a09b",
      packageName: "rlang-node-receiver",
      attribute: {},
      ports: [
        {
          id: "out",
          name: "Rout",
          type: "OUT",
          desc: "Rout",
        },
      ],
      view: {
        position: {
          x: 450,
          y: 120,
        },
        shape: "BaseNode",
        data: {
          pkg: {
            name: "rlang-node-receiver",
            type: "Node",
            nodeType: "R",
            desc: "传递hello world",
            env: ["Node", "Browser"],
            ports: [
              {
                id: "out",
                name: "Rout",
                type: "OUT",
                desc: "any",
              },
            ],
          },
        },
        zIndex: 1,
      },
    },
    {
      id: "a0b922cf-c38b-4fdc-a9b5-fd8b3bd0e0d5",
      packageName: "rlang-node-transfer",
      attribute: {},
      ports: [
        {
          id: "in",
          name: "Tin",
          type: "IN",
          desc: "Tin",
        },
        {
          id: "out",
          name: "Tout",
          type: "OUT",
          desc: "Tout",
        },
      ],
      view: {
        position: {
          x: 860,
          y: 280,
        },
        shape: "BaseNode",
        data: {
          pkg: {
            name: "rlang-node-transfer",
            type: "Node",
            nodeType: "T",
            desc: "透传body",
            env: ["Node", "Browser"],
            ports: [
              {
                id: "in",
                name: "Tin",
                type: "IN",
                desc: "any",
              },
              {
                id: "out",
                name: "Tout",
                type: "OUT",
                desc: "any",
              },
            ],
          },
        },
        zIndex: 2,
      },
    },
    {
      id: "5217ee3a-f4a9-4a75-84f5-ea485eb8bb9c",
      packageName: "rlang-node-write",
      attribute: {},
      ports: [
        {
          id: "in",
          name: "Win",
          type: "IN",
          desc: "Win",
        },
      ],
      view: {
        position: {
          x: 920,
          y: 660,
        },
        shape: "BaseNode",
        data: {
          pkg: {
            name: "rlang-node-write",
            type: "Node",
            nodeType: "W",
            desc: "打印body",
            env: ["Node", "Browser"],
            ports: [
              {
                id: "in",
                name: "Win",
                type: "IN",
                desc: "any",
              },
            ],
          },
        },
        zIndex: 3,
      },
    },
  ],
  pipes: [
    {
      id: "aab80a0c-dc9a-471c-aa9d-ded4b89370e0",
      packageName: "rlang-node-basepipe",
      attribute: {},
      IN: {
        nodeId: "a0b922cf-c38b-4fdc-a9b5-fd8b3bd0e0d5",
        portId: "in",
      },
      OUT: {
        nodeId: "195a709d-f8db-4847-bce5-77ae3619a09b",
        portId: "out",
      },
      view: {
        zIndex: 4,
      },
    },
    {
      id: "bfc7b7a3-d2f7-4ffb-a63e-d4727bfb8126",
      packageName: "rlang-node-basepipe",
      attribute: {},
      IN: {
        nodeId: "5217ee3a-f4a9-4a75-84f5-ea485eb8bb9c",
        portId: "in",
      },
      OUT: {
        nodeId: "a0b922cf-c38b-4fdc-a9b5-fd8b3bd0e0d5",
        portId: "out",
      },
      view: {
        zIndex: 5,
      },
    },
  ],
  pkgs: [
    {
      name: "rlang-node-receiver",
      type: "Node",
      nodeType: "R",
      desc: "传递hello world",
      env: ["Node", "Browser"],
      ports: [
        {
          id: "out",
          name: "Rout",
          type: "OUT",
          desc: "any",
        },
      ],
    },
    {
      name: "rlang-node-transfer",
      type: "Node",
      nodeType: "T",
      desc: "透传body",
      env: ["Node", "Browser"],
      ports: [
        {
          id: "in",
          name: "Tin",
          type: "IN",
          desc: "any",
        },
        {
          id: "out",
          name: "Tout",
          type: "OUT",
          desc: "any",
        },
      ],
    },
    {
      name: "rlang-node-write",
      type: "Node",
      nodeType: "W",
      desc: "打印body",
      env: ["Node", "Browser"],
      ports: [
        {
          id: "in",
          name: "Win",
          type: "IN",
          desc: "any",
        },
      ],
    },
    {
      name: "rlang-node-basepipe",
      type: "Pipe",
      env: ["Node", "Browser"],
    },
  ],
};

import R from "rlang-node-receiver";
import T from "rlang-node-transfer";
import W from "rlang-node-write";
import P from "rlang-node-basepipe";

// const R = require('rlang-node-receiver').default;
// const T = require('rlang-node-transfer').default;
// const W = require('rlang-node-write').default;
// const P = require('rlang-node-basepipe').default;

const graph = new Graph(ast as any);

graph.injectPackage("rlang-node-receiver", R as any);
graph.injectPackage("rlang-node-transfer", T as any);
graph.injectPackage("rlang-node-write", W as any);
graph.injectPackage("rlang-node-basepipe", P);

graph.setApp({});

graph.start();

// describe('sum module', () => {
//   test('adds 1 + 2 to equal 3', () => {});
// });
