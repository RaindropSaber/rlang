{
  "nodes": [
    {
      "id": "R1",
      "packageId": "RRRRR",
      "ports": [
        {
          "id": "out",
          "meta": {
            "name": "Rout",
            "type": "OUT",
            "desc": "any"
          }
        }
      ],
      "attribute": {
        "ddd": "ddd"
      }
    },
    {
      "id": "T1",
      "packageId": "TTTTT",
      "ports": [
        {
          "id": "in",
          "meta": {
            "name": "Tin",
            "type": "IN",
            "desc": "any"
          }
        },
        {
          "id": "out",
          "meta": {
            "name": "Tout",
            "type": "OUT",
            "desc": "any"
          }
        }
      ],
      "attribute": {
        "ddd": "ddd"
      }
    },
    {
      "id": "W1",
      "packageId": "WWWWW",
      "ports": [
        {
          "id": "in",
          "meta": {
            "name": "Win",
            "type": "IN",
            "desc": "any"
          }
        }
      ],
      "attribute": {
        "ddd": "ddd"
      }
    }
  ],
  "pipes": [
    {
      "id": "P1",
      "packageId": "PPPPP",
      "attribute": {},
      "OUT": {
        "nodeId": "R1",
        "portId": "out"
      },
      "IN": {
        "nodeId": "T1",
        "portId": "in"
      }
    },
    {
      "id": "P1",
      "packageId": "PPPPP",
      "attribute": {},
      "OUT": {
        "nodeId": "T1",
        "portId": "out"
      },
      "IN": {
        "nodeId": "W1",
        "portId": "in"
      }
    }
  ],
  "pkgs": [
    {
      "id": "RRRRR",
      "packageName": "rlang-node-receiver",
      "packageType": "Node",
      "meta": {
        "name": "第一个R节点",
        "type": "R",
        "desc": "传递hello world",
        "env": [
          "Node",
          "Browser"
        ]
      }
    },
    {
      "id": "TTTTT",
      "packageName": "rlang-node-transfer",
      "packageType": "Node",
      "meta": {
        "name": "第一个T节点",
        "type": "T",
        "desc": "透传body",
        "env": [
          "Node",
          "Browser"
        ]
      }
    },
    {
      "id": "WWWWW",
      "packageName": "rlang-node-write",
      "packageType": "Node",
      "meta": {
        "name": "第一个W节点",
        "type": "W",
        "desc": "打印body",
        "env": [
          "Node",
          "Browser"
        ]
      }
    },
    {
      "id": "PPPPP",
      "packageName": "rlang-node-basepipe",
      "packageType": "Pipe",
      "meta": {
        "name": "第一个Pipe",
        "desc": "什么也不做",
        "env": [
          "Node",
          "Browser"
        ]
      }
    }
  ]
}