import { T_AST } from 'rlang-grammar';

interface T_packageTPL {
  imp: string[];
  inj: string[];
}

module.exports = (source: string) => {
  const ast: T_AST = JSON.parse(source);

  const { imp, inj } = ast.pkgs
    .filter((v) => v.name)
    .reduce(
      (acc, item, index) => {
        const pkgStatementId = 'DependPackage_' + index;
        acc.inj.push(`graph.injectPackage('${item.name}',${pkgStatementId})`);
        acc.imp.push(`import ${pkgStatementId} from '${item.name}'`);
        return acc;
      },
      { imp: [], inj: [] } as T_packageTPL
    );
  const importStr = imp.join('\n');
  const injectStr = inj.join('\n');

  return `
  import { Graph } from 'rlang-kernel'

  ${importStr}
  

  const ast = ${JSON.stringify(ast)}


  const graph = new Graph(ast)

  ${injectStr}
  
  export default graph

  `;
};

module.exports.cjs = (source: string) => {
  const ast: T_AST = JSON.parse(source);

  const { imp, inj } = ast.pkgs
    .filter((v) => v.name)
    .reduce(
      (acc, item, index) => {
        const pkgStatementId = 'DependPackage_' + index;
        acc.inj.push(`graph.injectPackage('${item.name}',${pkgStatementId})`);
        acc.imp.push(`const ${pkgStatementId} = require('${item.name}').default;`);
        return acc;
      },
      { imp: [], inj: [] } as T_packageTPL
    );
  const requireStr = imp.join('\n');
  const injectStr = inj.join('\n');
  return `
  const { Graph } = require('rlang-kernel').default

  ${requireStr}
  

  const ast = ${JSON.stringify(ast)}


  const graph = new Graph(ast)

  ${injectStr}
  
  module.exports=graph

  `;
};
