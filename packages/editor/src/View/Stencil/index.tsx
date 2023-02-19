import React, { createRef, useEffect, useRef, useState, useContext, ElementRef } from 'react';
import { Drawer } from 'antd';
import Model from '../../Model/Editor';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import EditorContext from '../../Store/Context';
import './index.styl';

const StencilContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;
const DrawerContainer = styled.div``;

const Stencil: React.FC = observer(() => {
  const [isDrawerDOMInit, setDrawerDOMInit] = useState(false);
  const editor = useContext(EditorContext);
  const drawerDOM = useRef<HTMLDivElement>(null);
  const stencilDOM = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDrawerDOMInit(true);
    if (stencilDOM.current) editor.setStencilDOM(stencilDOM.current);
  }, [isDrawerDOMInit]);

  return (
    <>
      <DrawerContainer ref={drawerDOM}></DrawerContainer>
      {isDrawerDOMInit && (
        <Drawer
          title='Basic Drawer'
          placement='left'
          onClose={() => editor.state.setStencilStatus(false)}
          open={editor.state.isStencilEnabled.get()}
          getContainer={() => drawerDOM.current!}
          rootClassName={'rlang-drawer-mask'}
          closable={false}
          mask={false}
          maskClosable={false}
          forceRender={true}
          headerStyle={{ display: 'none' }}
          bodyStyle={{ padding: 0 }}
          width={300}
        >
          <StencilContainer ref={stencilDOM}></StencilContainer>
        </Drawer>
      )}
    </>
  );
});

export default Stencil;
