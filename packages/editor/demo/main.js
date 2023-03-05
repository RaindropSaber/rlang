import RlangEditor from "../dist/index.esm.js";
import ast from "./rlang.js";
import x6json from "./x6json.js";

const editor = RlangEditor(document.getElementById("root"));

editor.render(ast);

// window['editor'] = editor;

editor.graph.fromJSON(x6json);
