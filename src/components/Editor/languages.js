import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import { python } from "@codemirror/lang-python";
import { html } from "@codemirror/lang-html";
import { java } from "@codemirror/lang-java";
import { jsAutocompletion } from "../../completions/js";
import { javaAutocompletion } from "../../completions/java";
import { pythonAutocompletion } from "../../completions/python";


export  const PrintaLanguages = {
    "js" : "JavaScript",
    "py" : "Python",
    "css" : "CSS",
    "html" : "HTML",
    "ts" : "TypeScript",
    "xml" : "XML",
    "java" : "Java",
    "c" : "C",
    "cpp" : "C++",
    "dart" : "Dart",
    "php" :"PHP",
    

}

export const languagesSelector = (ext)=>{
    if(ext==='js'){
        return javascript;
    }
    else if(ext==='css'){
        return css;
    }
    else if(ext==='py'){
        return python;
    }
    else if(ext==='html'){
        return html;
    }
    else if(ext==='java'){
        return java;
    }
}

export const completionSelector = (ext)=>{
    if(ext==='js'){
        return jsAutocompletion;
    }
    else if(ext==='css'){
        return null;
    }
    else if(ext==='py'){
        return pythonAutocompletion;
    }
    else if(ext==='html'){
        return null;
    }
    else if(ext==='java'){
        return javaAutocompletion;
    }
}