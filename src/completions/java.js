import { keywordsgen } from "./keywordsgen"
import {autocompletion } from "@codemirror/autocomplete"
import {keywordsjava} from '../keywords/java'

function javaCompletionSource(context) {
    let word = context.matchBefore(/\w*/)
    if (word.from == word.to && !context.explicit)
      return null
    const keys = keywordsgen(keywordsjava);
    return {
      from: word.from,
      options: [
        ...keys
      ]
    }
  }

  export const javaAutocompletion = autocompletion({
        override:[javaCompletionSource]
  })