import { linter, Diagnostic } from "@codemirror/lint";
import {EditorView} from 'codemirror'

function lintExample() {
  const diagnostics = [];

  syntaxTree(view.state).iterate({
    enter: (type, from, to) => {
      if (type.isError) {
        diagnostics.push({
          from,
          to,
          severity: "error",
          message: "Yep. That's a syntax error.",
        });
      }
    },
  });

  return diagnostics;
}
// Run the example as an extension like this.
export const erreurSynthaxique  = linter(lintExample())
