import React, { createRef, useEffect, useRef, useState, useContext, ElementRef } from 'react';
import { Drawer } from 'antd';
import Editor, { EditorContext } from '../Model/RlangEditor';
import { observer } from 'mobx-react';
import styled from 'styled-components';

const Stencil = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const RStencil: React.FC = observer(() => {
  const editor = useContext<Editor>(EditorContext);
  const drawerDOM = useRef<HTMLDivElement>(null);
  const stencilDOM = useRef<HTMLDivElement>(null);

  editor.setStencilDOM(stencilDOM);

  return (
    <>
      <div ref={drawerDOM}></div>
      <Drawer
        title='Basic Drawer'
        placement='left'
        onClose={() => editor.state.setStencilStatus(false)}
        open={editor.state.isStencilEnabled.get()}
        getContainer={() => drawerDOM.current!}
        className={'rlang-drawer-mask'}
        closable={false}
        mask={false}
        maskClosable={false}
        forceRender={true}
        headerStyle={{ display: 'none' }}
        bodyStyle={{ padding: 0 }}
        width={300}
      >
        <Stencil ref={stencilDOM}></Stencil>
      </Drawer>
    </>
  );
});

export default RStencil;
