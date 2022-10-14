import fs from 'fs';
import { T_AST, T_Package, PackageType } from 'rlang-grammar';
import { Graph, Pipe } from 'rlang-kernel';
import RlangLoader from 'rlang-loader';
import path from 'path';
import Module from 'module';

export default (root: string) => {
  const ffff = require(root);
  const dir = path.dirname(root);
  console.log(`ffff`, ffff);
  const shape = path.resolve(dir, ffff.shape);
  const panel = path.resolve(dir, ffff.panel);
  const runtime = path.resolve(dir, ffff.runtime);
  const portsDTO = path.resolve(dir, ffff.portsDTO);
  console.log(`shape`, shape);
  console.log(`panel`, panel);
  console.log(`runtime`, runtime);
  console.log(`portsDTO`, portsDTO);

  // shape.js;
  // panel.js;
  // runtime.cjs.js;
  // runtime.esm.js;
  //
  // meta.json;
};
