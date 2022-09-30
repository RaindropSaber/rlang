import React, { createRef, useEffect, useRef, useState, useContext } from 'react';
// import { Graph, Shape, Addon } from '@antv/x6';
import { observer } from 'mobx-react';
import './App.scss';
import styled from 'styled-components';
import Toolbar from './Compontents/Toolbar';
import Menubar from './Compontents/Menubar';
import Stencil from './Compontents/Stencil';
import Graph from './Compontents/Graph';
import Panel from './Compontents/Panel';
import { EditorContext, Editor } from './Model/Editor';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: aquamarine;
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

@observer
export default class App extends React.Component<{ editor: Editor }> {
  static contextType = EditorContext;
  declare context: React.ContextType<typeof EditorContext>;

  componentDidMount() {
    // console.log(`this.context`, this.context.initGraph());
  }

  render() {
    return (
      <EditorContext.Provider value={this.props.editor}>
        <Container>
          <Menubar></Menubar>
          <Toolbar></Toolbar>
          <Workspace>
            <Graph></Graph>
            <Stencil></Stencil>
            <Panel></Panel>
          </Workspace>
          {/* <div id='footer'></div> */}
        </Container>
      </EditorContext.Provider>
    );
  }
}
