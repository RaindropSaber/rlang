import React, { createRef, useEffect, useRef, useState, useContext } from 'react';
import EditorContext from '../Store/Context';
import { observer } from 'mobx-react';
import styled from 'styled-components';

const GraphContainer = styled.div`
  flex: 1;
`;

const Graph: React.FC = observer(() => {
  const graphDOM = useRef<HTMLDivElement>(null);
  const model = useContext(EditorContext);
  useEffect(() => {
    model.setGraphDOM(graphDOM.current!);
  }, []);
  return <GraphContainer ref={graphDOM}></GraphContainer>;
});
export default Graph;
