import fs from "fs";
import { T_AST } from "rlang-grammar";
import { Graph, Pipe } from "rlang-kernel";
import RlangLoader, { cjs } from "rlang-loader";
import path from "path";
import Module from "module";

export default (rlangFileName: string): Graph => {
  // TODO: AST 检测
  const source = fs.readFileSync(rlangFileName, "utf-8");
  const code = cjs(source);
  const m = new Module(rlangFileName);
  m.filename = rlangFileName;
  const paths = (Module as any)._nodeModulePaths(path.dirname(rlangFileName));
  m.paths = paths;
  (m as any)._compile(code, rlangFileName);
  const graph: Graph = m.exports;
  return graph;
};
