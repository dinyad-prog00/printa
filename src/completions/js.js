import { constsgen, functionsgen, keywordsgen, variablesgen } from "./keywordsgen"
import {autocompletion } from "@codemirror/autocomplete"
import {keywordjs} from '../keywords/js'

const jsvariable = /\b(?:(?:var\s*|let\s*|)+)(?:\s+\*?\*?\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*[\[;,=\s)]/g;

const jsfunction = /\b(?:(?:function\s*)+)(?:\s+\*?\*?\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*[\[\())]/g;

const jsconst = /\b(?:(?:const\s*)+)(?:\s+\*?\*?\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*[\[;,=)]/g;


export const variablesMatcher = (code)=> {
    let variables = [],r;
    while((r=jsvariable.exec(code))!==null){
        variables.push(RegExp.$1)
    }
    return variables;
}

export const constMatcher = (code)=> {
    let variables = [],r;
    while((r=jsconst.exec(code))!==null){
        variables.push(RegExp.$1)
    }
    
    return variables;
}

export const functionMatcher = (code)=> {
    let variables = [],r;
    while((r=jsfunction.exec(code))!==null){
        variables.push(RegExp.$1)
    }
    return variables;
}



function jsCompletionSource(context) {
    let word = context.matchBefore(/\w*/)
    if (word.from == word.to && !context.explicit)
      return null
      const keys = keywordsgen(keywordjs);

    //recuper les variables, fct ou cont
    let variables = variablesMatcher(context.state.doc);
    let functions = functionMatcher(context.state.doc)
    let consts = constMatcher(context.state.doc)

    ///gen
     variables =  variablesgen(variables) 
     functions = functionsgen(functions)
     consts = constsgen(consts)

    return {
      from: word.from,
      options: [
        ...keys,
        ...variables,
        ...functions,
        ...consts
      
      ]
    }
  }

  export const jsAutocompletion = autocompletion({
        override:[jsCompletionSource]
  })