import fs from 'fs';
import { T_AST } from 'rlang-grammar';
import { Graph, Pipe } from 'rlang-kernel';
import RlangLoader from 'rlang-loader';
import path from 'path';
import Module from 'module';

module.exports = (rlangFileName: string): Graph => {
  // TODO: AST 检测
  const source = fs.readFileSync(rlangFileName, 'utf-8');
  const code = (RlangLoader as any).cjs(source);
  const m = new Module(rlangFileName);
  m.filename = rlangFileName;
  var paths = (Module as any)._nodeModulePaths(path.dirname(rlangFileName));
  m.paths = paths;
  (m as any)._compile(code, rlangFileName);
  const graph: Graph = m.exports;
  return graph;
};
