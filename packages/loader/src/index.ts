import { T_AST } from 'rlang-grammar'

interface T_packageTPL {
  imp: string[]
  inj: string[]
}

module.exports = (source: string) => {
  const ast: T_AST = JSON.parse(source)

  const { imp, inj } = ast.pkgs
    .filter((v) => v.packageName)
    .reduce(
      (acc, item, index) => {
        const pkgStatementId = 'DependPackage_' + index
        acc.inj.push(`graph.injectPackage('${item.id}',${pkgStatementId})`)
        acc.imp.push(`import ${pkgStatementId} from '${item.packageName}'`)
        return acc
      },
      { imp: [], inj: [] } as T_packageTPL
    )
  const importStr = imp.join('\n')
  const injectStr = inj.join('\n')

  return `
  import { Graph } from 'rlang-kernel'

  ${importStr}
  

  const ast = ${JSON.stringify(ast)}


  const graph = new Graph(ast)

  ${injectStr}
  
  export default graph

  `
}