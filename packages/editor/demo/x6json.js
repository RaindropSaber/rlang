export default {
  cells: [
    {
      position: {
        x: 890,
        y: 250,
      },
      size: {
        width: 150,
        height: 100,
      },
      view: 'react-shape-view',
      shape: 'BaseNode',
      component: {
        type: 'div',
        key: null,
        ref: null,
        props: {
          style: {
            height: 100,
            width: 150,
            backgroundColor: '#12e312',
          },
        },
        _owner: null,
        _store: {},
      },
      id: '3243c7ae-5496-467f-8f13-13e0ca08b9cd',
      ports: {
        groups: {
          IN: {
            position: {
              name: 'left',
            },
            zIndex: 2,
            label: {
              position: 'right',
            },
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: '#31d0c6',
                strokeWidth: 2,
                fill: '#fff',
              },
            },
          },
          OUT: {
            position: {
              name: 'right',
            },
            label: {
              position: 'left',
            },
            zIndex: 2,
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: '#31d0c6',
                strokeWidth: 2,
                fill: '#fff',
              },
            },
          },
        },
        items: [
          {
            group: 'IN',
            id: 'in1',
            attrs: {
              text: {
                text: 'in1',
              },
            },
          },
          {
            group: 'IN',
            id: 'in2',
            attrs: {
              text: {
                text: 'in2',
              },
            },
          },
          {
            group: 'OUT',
            id: 'out1',
            attrs: {
              text: {
                text: 'out1',
              },
            },
          },
          {
            group: 'OUT',
            id: 'out2',
            attrs: {
              text: {
                text: 'out2',
              },
            },
          },
        ],
      },
      zIndex: 2,
    },
    {
      position: {
        x: 750,
        y: 640,
      },
      size: {
        width: 150,
        height: 100,
      },
      view: 'react-shape-view',
      shape: 'BaseNode',
      component: {
        type: 'div',
        key: null,
        ref: null,
        props: {
          style: {
            height: 100,
            width: 150,
            backgroundColor: '#12e312',
          },
        },
        _owner: null,
        _store: {},
      },
      id: '3998eec4-0eca-49ac-ada0-7ec6f6a1038e',
      ports: {
        groups: {
          ['IN']: {
            position: {
              name: 'left',
            },
            zIndex: 2,
            label: {
              position: 'right',
            },
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: '#31d0c6',
                strokeWidth: 2,
                fill: '#fff',
              },
            },
          },
          ['OUT']: {
            position: {
              name: 'right',
            },
            label: {
              position: 'left',
            },
            zIndex: 2,
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: '#31d0c6',
                strokeWidth: 2,
                fill: '#fff',
              },
            },
          },
        },
        items: [
          {
            group: 'IN',
            id: 'in1',
            attrs: {
              text: {
                text: 'in1',
              },
            },
          },
          {
            group: 'IN',
            id: 'in2',
            attrs: {
              text: {
                text: 'in2',
              },
            },
          },
          {
            group: 'OUT',
            id: 'out1',
            attrs: {
              text: {
                text: 'out1',
              },
            },
          },
          {
            group: 'OUT',
            id: 'out2',
            attrs: {
              text: {
                text: 'out2',
              },
            },
          },
        ],
      },
      zIndex: 3,
    },
    {
      shape: 'edge',
      id: '8451b93e-59ce-4c2a-bcf9-673081d8baf0',
      source: {
        cell: '3243c7ae-5496-467f-8f13-13e0ca08b9cd',
        port: 'in1',
      },
      target: {
        cell: '3998eec4-0eca-49ac-ada0-7ec6f6a1038e',
        port: 'in1',
      },
      connector: 'rounded',
      zIndex: 4,
    },
    {
      shape: 'edge',
      id: '9d5257a6-c814-4adc-9ddc-c9526f2c8e31',
      source: {
        cell: '3243c7ae-5496-467f-8f13-13e0ca08b9cd',
        port: 'in2',
      },
      target: {
        cell: '3998eec4-0eca-49ac-ada0-7ec6f6a1038e',
        port: 'in2',
      },
      connector: 'rounded',
      zIndex: 5,
    },
  ],
};
