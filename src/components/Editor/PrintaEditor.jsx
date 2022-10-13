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


//Navbar
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

//Tabs bar
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PrintFile from "./PrintaFile";




var startState, view, changeNotifier;


const PrintEditor = () => {




    const [text, setText] = useState(undefined);
    const [error, setError] = useState(false)
    const [key, setKey] = useState('file1');
    const [filename, setFilename] = useState("filename");
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
                changeNotifier,
                myTheme, linter(lintExample)]
        }))

    }


    useEffect(() => {


        const socket = io('http://192.168.186.229:8000', { transports: ["websocket"] });

        socket.on('codeChanged', (code) => {

            updateCode(Text.of(JSON.parse(code)))

        })

        changeNotifier = EditorView.updateListener.of((v) => {
            if (v.docChanged) {

               // console.log(syntaxTree(view.state))

                socket.emit('codeChanged', JSON.stringify(v.state.doc.toJSON()));
            }
        })

        startState = EditorState.create({
            doc: "Bienvenue dans Printa Editor\nCommencez l'édition",
            extensions: [
                basicSetup,
                myTheme,
                changeNotifier,
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

    const runCode = () => {
        let rundiv = document.getElementById("run");
        rundiv.innerHTML = view.state.doc;
    }



    const handleFileNameChange = (name, view) => {
        setFilename(name)
        var i = name.indexOf(".");
        const extension = name.substr(i + 1);

        if (extension in PrintaLanguages) {
            setText(PrintaLanguages[extension]);
            view.setState(EditorState.create({
                doc: view.state.doc, extensions: [basicSetup, myTheme,
                    languagesSelector(extension)(),
                    //completionSelector(extension), 
                    changeNotifier,
                    linter(lintExample)]
            }))

        }
        else {
            setText(undefined)
            view.setState(EditorState.create({ doc: view.state.doc, extensions: [basicSetup, changeNotifier, myTheme, linter(lintExample)] }))

        }

    }

    return (
        <div id="printaeditor" className="">
            {/* Nom du fichier <input
                type="text"
                id="message"
                name="message"
                onChange={(e) => { handleFileNameChange(e.target.value, view) }}

            /> */}

            {/* <div className="row">
                <div className="col">
                    <h2> Langage : {text && text} {!text && "Langage non reconnu"}</h2>
                </div>
                <div className="col">
                    <button onClick={runCode}>Run</button>
                </div>
            </div> */}
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">Printa Editor</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >

                            <NavDropdown title="Fichier" id="navbarScrollingDropdown" >

                                <NavDropdown.Item href="#action4">
                                    Nouveau fichier
                                </NavDropdown.Item>
                                {/* <NavDropdown.Divider /> */}
                                <NavDropdown.Item href="#action5">
                                    Ouvrir fichier
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action5">
                                    Enregistrer
                                </NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="Exécution" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#action4" onClick={runCode}>
                                    Run
                                </NavDropdown.Item>

                            </NavDropdown>

                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="text"
                                placeholder="File name"
                                className="me-2"
                                aria-label="file"
                                onChange={(e) => { handleFileNameChange(e.target.value, view) }}
                            />

                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className="row">
                <div className="col-2 bg-dark">
                    <div className="m-2">
                        <FileTree files={filesMap} />
                    </div>
                </div>
                <div className="col m-0 p-0">


                    <div>
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                            className="mb-3"
                        >
                            <Tab eventKey="file1" title={filename}>

                                <div ref={editorRef}>

                                </div>
                            </Tab>

                        </Tabs>
                    </div>



                    <div className=" p-2" style={{ minHeight: "140px" }} id="run">
                        // La sortie
                    </div>


                </div>

            </div>



            {error && <div className="bg-danger w-100 ps-2 text-white">
                Erreur dans votre code
            </div>}
            <div className="w-100 float-right">
                <span className=" ps-2 d-flex"> Langage : {text && text} {!text && "Langage non reconnu"}</span>
            </div>
        </div>
    );
}



export default PrintEditor;