import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import RlangEditor from 'rlang-editor';

const editor = new RlangEditor();

editor.render(document.getElementById('root')!);
