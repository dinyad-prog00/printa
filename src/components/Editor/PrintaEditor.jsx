import { minimalSetup, EditorView } from "codemirror"
import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import { python } from "@codemirror/lang-python";
import { html } from "@codemirror/lang-html";

import {PrintaLanguages} from "./languages"
import { useState } from "react";


const PrintEditor = () => {
    const [text, setText] = useState(undefined);
    const [lang,setLang] = useState(undefined);
    

    const handleFileNameChange = (name) => {
        var i = name.indexOf(".");
        const extension = name.substr(i + 1);

        if (extension in PrintaLanguages) {
            setText(PrintaLanguages[extension])
        }
        else {
            setText(undefined)
        }

    }

    return (
        <div id="printaeditor">
            Nom du fichier <input
                type="text"
                id="message"
                name="message"
                onChange={(e) => { handleFileNameChange(e.target.value) }}
                
            />
            <h2> Langage : {text && text} {!text && "Langage non reconnu"}</h2>
        </div>
    );
}


new EditorView({
    
    extensions: [minimalSetup, javascript()],
    parent: document.body
})

export default PrintEditor;