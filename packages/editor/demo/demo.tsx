import RlangEditor from "../src/index";
import ast from "./rlang.js";
import x6json from "./x6json.js";

const editor = new RlangEditor({
  container: document.getElementById("root")!,
});
// editor.start().then(() => {
//   editor.render(ast as any);
// });

// editor.render()
// editor.toJSON()
// editor.addPackage()
// editor.onChange()

// window['editor'] = editor;
// editor.graph.fromJSON(x6json);

const main = async () => {
  await editor.start();
  editor.render(ast as any);
};
main();
