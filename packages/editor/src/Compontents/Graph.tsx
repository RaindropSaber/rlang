import React, { createRef, useEffect, useRef, useState, useContext } from 'react';
import { Graph, Shape, Addon, Model, Cell } from '@antv/x6';
import { EditorContext } from '../Model/Editor';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import '@antv/x6-react-shape';

const GraphCanvas = styled.div`
  flex: 1;
`;

@observer
export default class RGraph extends React.Component<any> {
  graphDOM: React.RefObject<HTMLDivElement>;
  static contextType = EditorContext;
  declare context: React.ContextType<typeof EditorContext>;

  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.graphDOM = createRef();
  }
  componentDidMount() {
    this.context.setGraphDOM(this.graphDOM);
  }

  render() {
    return <GraphCanvas ref={this.graphDOM}></GraphCanvas>;
  }
}
