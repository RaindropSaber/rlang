export default {
  nodes: [],
  pipes: [],
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
