import { createContext } from "react";
import Model from "../Model/Editor";

const EditorContext = createContext<Model>(null as unknown as Model);

export default EditorContext;
