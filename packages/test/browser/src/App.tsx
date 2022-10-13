import React from 'react';
import graph from './rlang/index.rl';

graph.start();

console.log('123');

function RlangEditor(props: { defaultAst: any }) {
  const { defaultAst = { nodes: [], pipes: [], links: [], pkgs: [] } } = props;

  return <div></div>;
}

export default RlangEditor;
