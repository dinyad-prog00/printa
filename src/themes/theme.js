import { EditorView } from "codemirror"
export let myTheme = EditorView.theme({
    
    
    "&": {
        color: "white",
        backgroundColor: "#034",
        height: Math.ceil(window.screen.height*0.60)+"px",
        fontSize : '13pt'
    },
    ".cm-content": {
        caretColor: "#0e9"
    },
    "&.cm-focused .cm-cursor": {
        borderLeftColor: "#0e9"
    },
    "&.cm-focused .cm-selectionBackground, ::selection": {
        backgroundColor: "#074"
    },
    ".cm-gutters": {
        backgroundColor: "#045",
        color: "#ddd",
        border: "none"
    },
    ".cm-scroller": { overflow: "auto" },

    "cm-activeLine" : {
        backgroundColor : "red"
    }
   
}, { dark: true })