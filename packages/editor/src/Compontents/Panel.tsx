import React, { createRef, useEffect, useRef, useState, useContext, ElementRef } from 'react';
import { Graph, Shape, Addon } from '@antv/x6';
import { Button, Drawer, Radio, Space } from 'antd';
import { GraphModelContext, Model } from '../Model/index';
import { observer } from 'mobx-react';
import styled from 'styled-components';

const Panel: React.FC = observer((props) => {
  const graphModel = useContext<Model>(GraphModelContext);
  const selectedNode = graphModel.selectedNode.toJSON();
  const drawerDOM = useRef(null);

  return (
    <>
      <div ref={drawerDOM}></div>
      {drawerDOM.current && (
        <Drawer
          autoFocus={false}
          title='Basic Drawer'
          placement='right'
          onClose={() => graphModel.changeStencilActivation(false)}
          open={!!selectedNode.length}
          getContainer={drawerDOM.current}
          className={'rlang-drawer-mask'}
          closable={false}
          mask={false}
          maskClosable={false}
          headerStyle={{ display: 'none' }}
          bodyStyle={{ padding: 0 }}
        >
          {selectedNode[0]?.id}
          <input></input>
        </Drawer>
      )}
    </>
  );
});

export default Panel;
