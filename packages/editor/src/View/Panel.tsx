import React, {
  createRef,
  useEffect,
  useRef,
  useState,
  useContext,
  ElementRef,
} from "react";
import { Button, Drawer, Radio, Space } from "antd";
import Model from "../Model/Editor";

import EditorContext from "../Store/Context";
import { observer } from "mobx-react";

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
          title="Basic Drawer"
          placement="right"
          onClose={() => model.state.setStencilStatus(false)}
          open={!!selectedNode.length}
          getContainer={drawerDOM.current as any}
          className={"rlang-drawer-mask"}
          closable={false}
          mask={false}
          maskClosable={false}
          headerStyle={{ display: "none" }}
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
