import { keywordsgen } from "./keywordsgen"
import {autocompletion } from "@codemirror/autocomplete"
import {keywordspython} from '../keywords/python'

function pythonCompletionSource(context) {
    let word = context.matchBefore(/\w*/)
    if (word.from == word.to && !context.explicit)
      return null
    const keys = keywordsgen(keywordspython);
    return {
      from: word.from,
      options: [
        ...keys
      ]
    }
  }

  export const pythonAutocompletion = autocompletion({
        override:[pythonCompletionSource]
  })