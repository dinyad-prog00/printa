import { minimalSetup, basicSetup,EditorView } from "codemirror"
import { EditorState} from "@codemirror/state";
import {PrintaLanguages,languagesSelector, completionSelector} from "./languages"

import { useEffect, useRef, useState } from "react";
import { jsAutocompletion } from "../../completions/js";
import { javaAutocompletion } from "../../completions/java";
import { pythonAutocompletion } from "../../completions/python";

var startState,view;



const PrintEditor = () => {
    const [text, setText] = useState(undefined);
    const editorRef = useRef()
   

    useEffect(()=>{

         startState = EditorState.create({
            doc: "Hello World",
            extensions: [basicSetup]
          })
        
        
           view = new EditorView({
            state : startState,
            parent: editorRef.current
        })

        return ()=>{
            view.destroy()
        }
    },[])
    
    

    const handleFileNameChange = (name) => {
        var i = name.indexOf(".");
        const extension = name.substr(i + 1);

        if (extension in PrintaLanguages) {
            setText(PrintaLanguages[extension]);
            view.setState(EditorState.create({ doc: view.state.doc,extensions: [basicSetup,languagesSelector(extension)(),completionSelector(extension)]}))
              
        }
        else {
            setText(undefined)
            view.setState(EditorState.create({ doc: view.state.doc,extensions: [basicSetup]}))
             
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
       
            <div ref={editorRef}>

            </div>
             </div>
    );
}



export default PrintEditor;