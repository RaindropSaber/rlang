import { observer } from 'mobx-react';
import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import EditorContext from '../Store/Context';

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
