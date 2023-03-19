import fs from 'fs';
import Module from 'module';
import path from 'path';
import { Graph } from 'rlang-kernel';
import { cjs } from 'rlang-loader';

export default (rlangFileName: string): Graph => {
  // TODO: AST 检测

  const source = fs.readFileSync(path.resolve(process.cwd(), rlangFileName), 'utf-8');
  const code = cjs(source);
  const m = new Module(rlangFileName);
  m.filename = rlangFileName;
  const paths = (Module as any)._nodeModulePaths(path.dirname(rlangFileName));
  m.paths = paths;
  (m as any)._compile(code, rlangFileName);
  const graph: Graph = m.exports;
  return graph;
};
