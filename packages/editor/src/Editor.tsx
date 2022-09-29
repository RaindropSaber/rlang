import React, { createRef, useEffect, useRef, useState, useContext } from 'react';
// import { Graph, Shape, Addon } from '@antv/x6';
import { Button, Drawer, Radio, Space } from 'antd';
import { GraphModelContext } from './Model/index';
import { observer } from 'mobx-react';
import './Editor.scss';
import styled from 'styled-components';
import Toolbar from './Compontents/Toolbar';
import Menubar from './Compontents/Menubar';
import Stencil from './Compontents/Stencil';
import Graph from './Compontents/Graph';
import Panel from './Compontents/Panel';
import 'antd/dist/antd.css';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: aquamarine;
  width: 100vw;
  height: 100vh;
`;
const Main = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
`;
// const Panel = styled.div`
//   width: 180px;
//   height: 100%;
//   background-color: #452e12;
//   position: absolute;
//   right: 0px;
// `;

@observer
export default class Editor extends React.Component<any> {
  static contextType = GraphModelContext;

  render() {
    return (
      <Container>
        <Menubar></Menubar>
        <Toolbar></Toolbar>
        <Main>
          <Graph></Graph>
          <Stencil></Stencil>
          <Panel></Panel>
        </Main>
        {/* <div id='footer'></div> */}
      </Container>
    );
  }
}
