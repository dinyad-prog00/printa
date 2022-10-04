import {minimalSetup, EditorView} from "codemirror"
import { javascript } from "@codemirror/lang-javascript";
const PrintEditor = ()=>{

    return (
        <div id="printaeditor">

        </div>
    );
}

new EditorView({
    
    extensions: [ minimalSetup ,javascript()],
    parent: document.body
})

export default PrintEditor;