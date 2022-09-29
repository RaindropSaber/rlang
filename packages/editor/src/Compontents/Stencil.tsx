import React, { createRef, useEffect, useRef, useState, useContext, ElementRef } from 'react';
import { Graph, Shape, Addon } from '@antv/x6';
import { Button, Drawer, Radio, Space } from 'antd';
import { GraphModelContext, Model } from '../Model/index';
import { observer } from 'mobx-react';
import styled from 'styled-components';

const Stencil = styled.div`
  width: 100%;
  height: 100%;
  background-color: brown;
  position: absolute;
`;

const RStencil: React.FC = observer((props) => {
  const graphModel = useContext<Model>(GraphModelContext);
  const drawerDOM = useRef(null);
  const stencilDOM = useRef<HTMLDivElement>(null);
  const onClose = () => {
    graphModel.changeStencilActivation(false);
  };

  const init = ({ groups }: any = {}) => {
    if (stencilDOM.current?.firstChild) {
      stencilDOM.current?.removeChild(stencilDOM.current?.firstChild);
    }
    const stencil = new Addon.Stencil({
      target: graphModel.graph!,
      groups: groups,
    });
    stencilDOM.current?.appendChild(stencil.container);

    (stencil as any).init = (opt: any) => init(opt);

    graphModel.initStencil(stencil);

    const r = new Shape.Rect({
      width: 70,
      height: 40,
      attrs: {
        rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 6 },
        text: { text: 'rect', fill: 'white' },
      },
      ports: [
        {
          id: 'port1',
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
        {
          id: 'port2',
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
        {
          id: 'port3',
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
      ],
    });
    stencil.load([r, r.clone(), r.clone()], '123');
    graphModel.graph!.addNode({
      x: 40,
      y: 40,
      width: 100,
      height: 40,
      shape: 'react-shape',
      component(node: { getData: () => any }) {
        const data = node.getData();
        return <div>{'data'}</div>;
      },
    });
    // Graph.registerNode('myNode', {
    //   inherit: 'react-shape',
    //   x: 200,
    //   y: 150,
    //   width: 150,
    //   height: 100,
    //   component: <div style={{ width: 20, height: 20, backgroundColor: '#123332' }}>123321</div>,
    // });
    // graphModel.graph!.addNode({
    //   x: 40,
    //   y: 40,
    //   width: 100,
    //   height: 40,
    //   shape: 'myNode',
    // });
  };

  useEffect(() => {
    init({ groups: [{ name: '123' }] });
  }, [graphModel.stencilActivation, graphModel.graph]);

  return (
    <>
      <div ref={drawerDOM}></div>
      {drawerDOM.current && (
        <Drawer
          title='Basic Drawer'
          placement='left'
          onClose={onClose}
          open={graphModel.stencilActivation}
          getContainer={drawerDOM.current}
          className={'rlang-drawer-mask'}
          closable={false}
          mask={false}
          maskClosable={false}
          headerStyle={{ display: 'none' }}
          bodyStyle={{ padding: 0 }}
          width={200}
        >
          <Stencil ref={stencilDOM}></Stencil>
        </Drawer>
      )}
    </>
  );
});

export default RStencil;
