import fs from 'fs'
import { T_AST } from 'rlang-grammar'
import { Graph, Pipe } from 'rlang-kernel'

export default (rlangFilePath: string): Graph => {
  // TODO: AST 检测

  const ast: T_AST = JSON.parse(fs.readFileSync(rlangFilePath, 'utf-8'))

  const graph = new Graph(ast)
  ast.pkgs.forEach((item) => {
    item.packageName && graph.injectPackage(item.id, require(item.packageName).default)
  })

  return graph
}
