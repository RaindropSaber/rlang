import RlangEditor from '../src';
import React from 'react';
import ast from './rlang';
// import x6json from './x6json';
import { T_AST, PortType, PackageType } from 'rlang-grammar/src';

const editor = RlangEditor(document.getElementById('root')!);

editor.render(ast as T_AST);

window['editor'] = editor;

// editor.graph.fromJSON(x6json);
