module.exports = (source) => {
  const ast = JSON.parse(source)

  const { imp, inj } = [...ast.nodes, ...ast.pipes]
    .filter((v) => v.meta.package)
    .reduce(
      (acc, item, index) => {
        const packName = 'DependPackage_' + index
        acc.inj.push(`graph.injectPackage('${item.meta.package}',${packName})`)
        acc.imp.push(`import ${packName} from '${item.meta.package}'`)
        return acc
      },
      { imp: [], inj: [] }
    )
  const importStr = imp.join('\n')
  const injectStr = inj.join('\n')

  return `
  import { Graph } from 'rlang-kernel'

  ${importStr}
  

  const ast = ${source}


  const graph = new Graph(ast)

  ${injectStr}

  
  export default graph

  `
}

// const test = () => {
//   const fs = require('fs')
//   const path = require('path')
//   const res = fs.readFileSync(path.resolve(__dirname, '../src/rlang/index.rl'), 'utf-8')
//   let str = module.exports(res)
//   console.log(str)
// }

// test()
