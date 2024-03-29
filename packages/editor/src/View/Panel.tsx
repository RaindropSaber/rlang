import { Drawer } from 'antd';
import React, { useContext, useRef } from 'react';

import { observer } from 'mobx-react';
import EditorContext from '../Store/Context';

const Panel: React.FC = observer((props) => {
  const model = useContext(EditorContext);
  const selectedNode = model.state.selectedNode.toJSON();
  const drawerDOM = useRef(null);

  return (
    <>
      <div ref={drawerDOM}></div>
      {drawerDOM.current && (
        <Drawer
          autoFocus={false}
          title='Basic Drawer'
          placement='right'
          onClose={() => model.state.setStencilStatus(false)}
          open={!!selectedNode.length}
          getContainer={drawerDOM.current as any}
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
