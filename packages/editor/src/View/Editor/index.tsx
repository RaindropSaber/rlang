import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import Toolbar from '../Toolbar';
import Menubar from '../Menubar';
import Stencil from '../Stencil';
import Graph from '../Graph';
import Panel from '../Panel';
import EditorContext from '../../Store/Context';
import 'antd/dist/reset.css';
import './index.styl';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: aquamarine; */
  width: 100vw;
  height: 100vh;
`;
const Workspace = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
`;
const StatusBar = styled.div``;

const Editor: React.FC = observer(() => {
  const editor = useContext(EditorContext);

  return (
    <Container>
      {/* <Menubar></Menubar> */}
      <Toolbar></Toolbar>
      <Workspace>
        <Graph></Graph>
        <Stencil></Stencil>
        <Panel></Panel>
      </Workspace>
      <StatusBar></StatusBar>
    </Container>
  );
});

export default Editor;
