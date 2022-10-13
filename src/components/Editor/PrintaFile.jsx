import { minimalSetup, basicSetup, EditorView, e } from "codemirror"
import { EditorState } from "@codemirror/state";
import { PrintaLanguages, languagesSelector, completionSelector } from "./languages"
import { Text } from '@codemirror/state'
import React, { useEffect, useRef, useState } from "react";
import { myTheme } from "../../themes/theme";

import { io } from 'socket.io-client'
import { javascript } from "@codemirror/lang-javascript";
//import { erreurSynthaxique } from "../../erreurs/erreurSyntaxique";

import { linter, Diagnostic } from "@codemirror/lint";
import { syntaxTree } from '@codemirror/language'
import { filesMap, FileTree } from "../../filetreetest";



var startState, view, changeNotifier;


const PrintFile = () => {




    const [text, setText] = useState(undefined);
    const [error, setError] = useState(false)
    const editorRef = useRef()

    //erreur syntax
    function lintExample() {
        const diagnostics = [];
        let e = false;

        syntaxTree(view.state).iterate({
            enter: ({ type, from, to }) => {
                //console.log(from,'frommmmmmmmmm')
                if (type.isError) {
                    e = true;
                    diagnostics.push({
                        from,
                        to: to,
                        severity: "error",
                        message: "Erreur de syntaxe",
                    });
                }
            },
        });

        if (e) {
            setError(true)
        } else {
            setError(false)
        }
        // diagnostics.push({
        //     from:1,
        //     to:2,
        //     severity: "error",
        //     message: "Erreur de syntaxe... ",
        //   });

        //   diagnostics.push({
        //     from:8,
        //     to:14,
        //     severity: "error",
        //     message: "Erreur de syntaxe... ",
        //   });

        //   diagnostics.push({
        //     from:20,
        //     to:30,
        //     severity: "error",
        //     message: "Erreur de syntaxe...",
        //   });

        return diagnostics;
    }

    const updateCode = (c) => {

        //alert("azertyui")

        view.setState(EditorState.create({
            doc: c, extensions: [basicSetup,
                //changeNotifier,
                myTheme, languagesSelector('js'), linter(lintExample)]
        }))

    }


    useEffect(() => {


        const socket = io('http://localhost:8000', { transports: ["websocket"] });

        socket.on('codeChanged', (code) => {

            updateCode(Text.of(JSON.parse(code)))

        })

        changeNotifier = EditorView.updateListener.of((v) => {
            if (v.docChanged) {

                console.log(syntaxTree(view.state))

                socket.emit('codeChanged', JSON.stringify(v.state.doc.toJSON()));
            }
        })

        startState = EditorState.create({
            doc: "Hello World jjh jhjh jhgjh je suis pas d'accord avec ca ",
            extensions: [
                basicSetup,
                myTheme,
                //changeNotifier,
                linter(lintExample)
            ]
        })


        view = new EditorView({
            state: startState,
            parent: editorRef.current
        })



        return () => {
            view.destroy()
            socket.close();
        }
    }, [])

    const runCode =()=>{
        let rundiv=document.getElementById("run");
        rundiv.innerHTML = view.state.doc;
    }



    const handleFileNameChange = (name, view) => {
        var i = name.indexOf(".");
        const extension = name.substr(i + 1);

        if (extension in PrintaLanguages) {
            setText(PrintaLanguages[extension]);
            view.setState(EditorState.create({ doc: view.state.doc, extensions: [basicSetup, myTheme, 
                languagesSelector(extension)(), 
                //completionSelector(extension), 
                linter(lintExample)] }))

        }
        else {
            setText(undefined)
            view.setState(EditorState.create({ doc: view.state.doc, extensions: [basicSetup, changeNotifier, myTheme, linter(lintExample)] }))

        }

    }

    return (
        <div id="printaeditor" className="">
            

            

            <div className="row">
                {/*<div className="col-2 bg-dark">
                    <div className="m-2">
                        <FileTree files={filesMap}  />
                    </div>
                </div> */}
                <div className="col m-0 p-2">
                    <div ref={editorRef}>

                    </div>
                    <div className=" p-2"  style={{ minHeight: "140px" }} id="run">
                        // La sortie
                    </div>
                     
                </div>
               
            </div>



            {error && <div className="bg-danger w-100 ps-2 text-white">
                Erreur dans votre code
            </div>}
        </div>
    );
}



export default PrintFile;