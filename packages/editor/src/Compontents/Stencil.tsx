import React, { createRef, useEffect, useRef, useState, useContext, ElementRef } from 'react';
import { Drawer } from 'antd';
import { EditorContext, Editor } from '../Model/Editor';
import { observer } from 'mobx-react';
import styled from 'styled-components';

const Stencil = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const RStencil: React.FC = observer(() => {
  const editorContext = useContext<Editor>(EditorContext);
  const drawerDOM = useRef<HTMLDivElement>(null);
  const stencilDOM = useRef<HTMLDivElement>(null);

  editorContext.setStencilDOM(stencilDOM);

  return (
    <>
      <div ref={drawerDOM}></div>
      <Drawer
        title='Basic Drawer'
        placement='left'
        onClose={() => editorContext.setStencilStatus(false)}
        open={editorContext.isStencilEnabled.get()}
        getContainer={() => drawerDOM.current!}
        className={'rlang-drawer-mask'}
        closable={false}
        mask={false}
        maskClosable={false}
        forceRender={true}
        headerStyle={{ display: 'none' }}
        bodyStyle={{ padding: 0 }}
        width={200}
      >
        <Stencil ref={stencilDOM}></Stencil>
      </Drawer>
    </>
  );
});

export default RStencil;
