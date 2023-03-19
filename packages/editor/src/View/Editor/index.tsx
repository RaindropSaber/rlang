import 'antd/dist/reset.css';
import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import Graph from '../Graph';
import Panel from '../Panel';
import Stencil from '../Stencil';
import Toolbar from '../Toolbar';
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
