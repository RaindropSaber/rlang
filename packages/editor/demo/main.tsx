// import RlangEditor from '../dist/index.d';
import RlangEditor from '../src';

// const editor = new RlangEditor();

// editor.render(document.getElementById('root')!);

const editor = RlangEditor(document.getElementById('root')!);

window['test'] = () => console.log(window['copy'](editor.toJSON()));
